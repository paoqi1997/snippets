import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

async function main(port: number) {
    const options: AWS.DynamoDB.ClientConfiguration = {
        region: 'cn-south-2',
        endpoint: `http://127.0.0.1:${port}`,
    };

    const dynamodb = new DynamoDB(options);

    const TableName = 'Player';
    const IndexName = 'playerIDIndex';

    const serverID = v4();
    const playerID = '002918';
    const createTime = Date.now();

    const params: AWS.DynamoDB.CreateTableInput = {
        TableName,
        KeySchema: [{
            AttributeName: 'serverID', KeyType: 'HASH',
        }, {
            AttributeName: 'playerID', KeyType: 'RANGE',
        }],
        AttributeDefinitions: [{
            AttributeName: 'serverID', AttributeType: 'S',
        }, {
            AttributeName: 'playerID', AttributeType: 'S',
        }],
        GlobalSecondaryIndexes: [{
            IndexName,
            KeySchema: [{
                AttributeName: 'playerID',
                KeyType: 'HASH',
            }],
            Projection: {
                ProjectionType: 'KEYS_ONLY',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5, WriteCapacityUnits: 5,
            },
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5, WriteCapacityUnits: 5,
        },
        BillingMode: 'PAY_PER_REQUEST',
    };

    try {
        const createTableResult = await dynamodb.createTable(params).promise();
        console.log(`[INFO] createTable: ${JSON.stringify(createTableResult)}`);
    } catch (err: any) {
        if (err && err.code && err.code !== 'ResourceInUseException') {
            console.log(`[ERROR] createTable: ${err.message}`);
            return;
        }
    }

    const docClient = new DynamoDB.DocumentClient(options);

    const batchWriteParams: AWS.DynamoDB.DocumentClient.BatchWriteItemInput = {
        RequestItems: {
            Player: [{
                PutRequest: { Item: { serverID, playerID, createTime } },
            }, {
                PutRequest: { Item: { serverID, playerID: '003574', createTime: Date.now() } },
            }]
        },
        ReturnConsumedCapacity: 'TOTAL',
    };

    try {
        const batchWriteResult = await docClient.batchWrite(batchWriteParams).promise();
        console.log(`[INFO] batchWrite: ${JSON.stringify(batchWriteResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] batchWrite: ${err.message}`);
        return;
    }

    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
        TableName, IndexName,
        ProjectionExpression: 'serverID, playerID, createTime',
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'playerID',
        },
        ExpressionAttributeValues: {
            ':id': playerID,
        },
    };

    try {
        const queryResult = await docClient.query(queryParams).promise();
        console.log(`[INFO] query: ${JSON.stringify(queryResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] query: ${err.message}`);
        return;
    }

    const scanParams: AWS.DynamoDB.DocumentClient.ScanInput = {
        TableName, IndexName,
        ProjectionExpression: 'serverID, playerID, createTime',
        FilterExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'playerID',
        },
        ExpressionAttributeValues: {
            ':id': playerID,
        },
    };

    try {
        const scanResult = await docClient.scan(scanParams).promise();
        console.log(`[INFO] scan: ${JSON.stringify(scanResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] scan: ${err.message}`);
        return;
    }
}

main(8000);
