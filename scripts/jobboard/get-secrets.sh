#!/bin/sh
aws s3 cp s3://$1/jobboard/scrapper/.env $2packages/jobboard/scrapper/.env
aws s3 cp s3://$1/jobboard/api/.env $2packages/jobboard/api/.env
aws s3 cp s3://$1/jobboard/website/.env $2/packages/jobboard/website/.env