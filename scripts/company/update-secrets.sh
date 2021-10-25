#!/bin/sh
aws s3 cp ../../packages/company/website/.env s3://$1/company/website/.env
aws s3 cp ../../packages/company/api/.env s3://$1/company/api/.env