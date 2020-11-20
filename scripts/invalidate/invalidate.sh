DISTRIBUTION_ID=$DISTRIBUTION
DATESTRING=$(date +"%Y-%m-%d_%H-%M-%S")
 
JSON_STRING='
{
  "Paths": {
    "Quantity": 1,
    "Items": ["/*"]
  },
  "CallerReference": "'$DATESTRING'"
}
'

echo $JSON_STRING > /tmp/invalidate_cloudfront.json
 
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --invalidation-batch file:///tmp/invalidate_cloudfront.json
 
rm /tmp/invalidate_cloudfront.json