#!/bin/sh
aws s3 cp ../../packages/company/website/.env s3://$1/company/website/.env
aws s3 cp ../../packages/company/website/.env.staging s3://$1/company/website/.env.staging
aws s3 cp ../../packages/company/api/.env s3://$1/company/api/.env
aws s3 cp ../../packages/company/api/.env.staging s3://$1/company/api/.env.staging