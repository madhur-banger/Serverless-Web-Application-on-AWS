import json
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('serverless-aws-web-app')

def lambda_handler(event, context):
    # Fetch the item with ID = 0
    response = table.get_item(Key={
        'ID': 0
    })
    
    # Increment the Views directly, assuming 'Views' exists
    Views = response['Item']['Views'] + 1
    
    print(Views)
    
    # Update the item with incremented Views
    table.put_item(Item={
        'ID': 0,
        'Views': Views
    })
    
    return Views

