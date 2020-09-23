const fs = require('fs');
const AWS = require('aws-sdk');
const childProcess = require('child_process');

const spawn = (command, ...args) =>
  new Promise((resolve, reject) => {
    const childProc = childProcess.spawn(command, args);
    childProc.stdout.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    childProc.stderr.on('data', (chunk) => {
      console.error(chunk.toString());
    });

    childProc.on('exit', (exitCode) => {
      if (exitCode === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });

const init = async () => {
  let options = {
    apiVersion: '2012-08-10',
    region: 'localhost',
    accessKeyId: 'local',
    secretAccessKey: 'local',
    endpoint: 'http://localhost:8000',
  };

  await spawn('docker', 'pull', 'amazon/dynamodb-local:1.13.1');

  if (!fs.existsSync('./dynamodb/data/shared-local-instance.db')) {
    console.log('Creating DynamoDB file');
    fs.writeFileSync('./dynamodb/data/shared-local-instance.db', '');
  }

  await spawn('docker-compose', 'up', '-d', 'dynamodb');
  try {
    const client = new AWS.DynamoDB(options);
    console.log('Creating DynamoDB table');
    const table = JSON.parse(fs.readFileSync(`./dynamodb/db.json`, 'utf8'));
    console.log(await client.createTable(table).promise());
  } catch (err) {
    console.log(err);
  }

  await spawn('docker-compose', 'down');
};

init();
