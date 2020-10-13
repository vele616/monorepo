#!/bin/sh
aws s3 cp ../../packages/jobboard/scrapper/.env s3://$1/jobboard/scrapper/.env
aws s3 cp ../../packages/jobboard/api/.env s3://$1/jobboard/api/.env
aws s3 cp ../../packages/jobboard/website/.env s3://$1/jobboard/website/.env