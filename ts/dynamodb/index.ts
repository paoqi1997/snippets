import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

let options: AWS.DynamoDB.ClientConfiguration = {
    region: 'cn-south-2',
    endpoint: 'http://127.0.0.1:8000',
};

const dynamodb = new DynamoDB(options);

const TableName = 'PlayerName';

const playerID = v4();
const playerName = 'paoqi';

const params: AWS.DynamoDB.CreateTableInput = {
    TableName,
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
    },
};

dynamodb.createTable(params, (err, data) => {
    if (err && err.name && err.name !== 'ResourceInUseException') {
        console.log(`[ERROR] createTable: ${err.message}`);
        return;
    }

    console.log(`[INFO] createTable: ${JSON.stringify(data)}`);
});

const docClient = new DynamoDB.DocumentClient(options);

const putParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName, Item: { playerID, playerName },
};

docClient.put(putParams, (err, data) => {
    if (err) {
        console.log(`[ERROR] put: ${err.message}`);
        return;
    }

    console.log(`[INFO] put: ${JSON.stringify(data)}`);

    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
        TableName,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'playerID'
        },
        ExpressionAttributeValues: {
            ':id': playerID
        },
    };

    docClient.query(queryParams, (err, data) => {
        if (err) {
            console.log(`[ERROR] query: ${err.message}`);
            return;
        }

        console.log(`[INFO] query: ${JSON.stringify(data)}`);
    });
});
