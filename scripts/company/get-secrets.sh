#!/bin/sh
aws s3 cp s3://$1/company/website/.env $2/packages/company/website/.env
aws s3 cp s3://$1/company/website/.env.staging $2/packages/company/website/.env.staging
aws s3 cp s3://$1/company/api/.env $2/packages/company/api/.env
aws s3 cp s3://$1/company/api/.env.staging $2/packages/company/api/.env.staging