#!/bin/sh
aws s3 cp ../../packages/company/website/.env s3://$1/company/website/.env