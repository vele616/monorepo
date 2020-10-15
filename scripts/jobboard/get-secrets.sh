#!/bin/sh
aws s3 cp s3://$1/jobboard/scrapper/.env ../../packages/jobboard/scrapper/.env
aws s3 cp s3://$1/jobboard/api/.env ../../packages/jobboard/api/.env
aws s3 cp s3://$1/jobboard/website/.env ../../packages/jobboard/website/.env