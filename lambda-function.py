import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('serverless-aws-web-app')

# Helper function to convert Decimal to int or float
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError

def lambda_handler(event, context):
    # Fetch the item with ID = 0
    response = table.get_item(Key={'ID': 0})
    
    # Increment the Views directly, assuming 'Views' exists
    if 'Item' in response and 'Views' in response['Item']:
        Views = response['Item']['Views'] + 1
    else:
        Views = 1  # Initialize if 'Views' does not exist
    
    # Update the item with incremented Views
    table.put_item(Item={'ID': 0, 'Views': Views})
    
    # Return the Views in a proper JSON response, using the decimal_default helper to convert Decimal types
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'Views': Views}, default=decimal_default)
    }
