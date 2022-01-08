import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

let options: AWS.DynamoDB.ClientConfiguration = {
    region: 'cn-south-2',
    endpoint: 'http://127.0.0.1:8000'
};

const dynamodb = new DynamoDB(options);

const params: AWS.DynamoDB.CreateTableInput = {
    TableName: 'PlayerName',
    KeySchema: [{
        AttributeName: 'playerID', KeyType: 'HASH',
    }, {
        AttributeName: 'playerName', KeyType: 'RANGE',
    }],
    AttributeDefinitions: [{
        AttributeName: 'playerID', AttributeType: 'S',
    }, {
        AttributeName: 'playerName', AttributeType: 'S',
    }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5, WriteCapacityUnits: 5,
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.log(`create error: ${err.message}`);
    } else {
        console.log(`create output: ${JSON.stringify(data)}`);
    }
});

const docClient = new DynamoDB.DocumentClient(options);

const playerID = v4();

const putParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'PlayerName',
    Item: { playerID, playerName: 'paoqi' },
};

docClient.put(putParams, (err, data) => {
    if (err) {
        console.log(`put error: ${err.message}`);
    } else {
        console.log(`put output: ${JSON.stringify(data)}`);

        const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
            TableName: 'PlayerName',
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeNames: {
                '#id': 'playerID'
            },
            ExpressionAttributeValues: {
                ':id': playerID
            }
        };

        docClient.query(queryParams, (err, data) => {
            if (err) {
                console.log(`query error: ${err.message}`);
            } else {
                console.log(`query output: ${JSON.stringify(data)}`);
            }
        });
    }
});
