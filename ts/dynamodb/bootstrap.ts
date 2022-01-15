import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

/**
 * https://stackoverflow.com/questions/55993448/async-await-is-not-working-javascript-dynamodb
 */
export async function main(port: number) {
    let options: AWS.DynamoDB.ClientConfiguration = {
        region: 'cn-south-2',
        endpoint: `http://127.0.0.1:${port}`,
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

    const putParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName, Item: { playerID, playerName },
    };

    try {
        const putResult = await docClient.put(putParams).promise();
        console.log(`[INFO] put: ${JSON.stringify(putResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] put: ${err.message}`);
        return;
    }

    try {
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

        const queryResult = await docClient.query(queryParams).promise();
        console.log(`[INFO] query: ${JSON.stringify(queryResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] query: ${err.message}`);
        return;
    }
}
