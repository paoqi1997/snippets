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

    const TableName = 'Role';

    const playerID = v4();
    const roleID = '002918';
    const roleName = 'paoqi';
    const roleLevel = 24;

    const params: AWS.DynamoDB.CreateTableInput = {
        TableName,
        KeySchema: [{
            AttributeName: 'playerID', KeyType: 'HASH',
        }, {
            AttributeName: 'roleID', KeyType: 'RANGE',
        }],
        AttributeDefinitions: [{
            AttributeName: 'playerID', AttributeType: 'S',
        }, {
            AttributeName: 'roleID', AttributeType: 'S',
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
        TableName, Item: { playerID, roleID, roleName },
    };

    try {
        const putResult = await docClient.put(putParams).promise();
        console.log(`[INFO] put: ${JSON.stringify(putResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] put: ${err.message}`);
        return;
    }

    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
        TableName,
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

    const updateParams: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName,
        Key: { playerID, roleID },
        UpdateExpression: 'SET #level = :level',
        ConditionExpression: 'attribute_exists(#id) AND #id = :id',
        ExpressionAttributeNames: {
            '#id': 'roleID',
            '#level': 'roleLevel',
        },
        ExpressionAttributeValues: {
            ':id': roleID,
            ':level': roleLevel,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    try {
        const updateResult = await docClient.update(updateParams).promise();
        console.log(`[INFO] update: ${JSON.stringify(updateResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] update: ${err.message}`);
        return;
    }

    const getParams: AWS.DynamoDB.DocumentClient.GetItemInput = {
        TableName, Key: { playerID, roleID },
    };

    try {
        const getResult = await docClient.get(getParams).promise();
        console.log(`[INFO] get: ${JSON.stringify(getResult)}`);
    } catch (err: any) {
        console.log(`[ERROR] get: ${err.message}`);
        return;
    }
}
