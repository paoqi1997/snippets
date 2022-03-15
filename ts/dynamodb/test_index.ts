/**
 * 使用索引
 */

import { argv } from 'process';

import * as _ from 'lodash';
import { AWSError, DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

async function main(port: number) {
    const options: AWS.DynamoDB.ClientConfiguration = {
        region: 'cn-south-2',
        endpoint: `http://127.0.0.1:${port}`,
    };

    const dynamodb = new DynamoDB(options);

    const TableName = 'Player';
    const gsiName = 'playerIDIndex';
    const lsiName = 'createTimeIndex';

    // 创建表
    const createTableParams: AWS.DynamoDB.CreateTableInput = {
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
        }, {
            AttributeName: 'createTime', AttributeType: 'N',
        }],
        GlobalSecondaryIndexes: [{
            IndexName: gsiName,
            KeySchema: [{
                AttributeName: 'playerID', KeyType: 'HASH',
            }],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5, WriteCapacityUnits: 5,
            },
        }],
        LocalSecondaryIndexes: [{
            IndexName: lsiName,
            KeySchema: [{
                AttributeName: 'serverID', KeyType: 'HASH',
            }, {
                AttributeName: 'createTime', KeyType: 'RANGE',
            }],
            Projection: {
                ProjectionType: 'ALL',
            }
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5, WriteCapacityUnits: 5,
        },
        BillingMode: 'PAY_PER_REQUEST',
    };

    try {
        const createTableResult = await dynamodb.createTable(createTableParams).promise();
        console.log(`[INFO] createTable: ${JSON.stringify(createTableResult)}`);
    } catch (e: any) {
        const err: AWSError = e;
        if (err && err.code) {
            if (err.code === 'ResourceInUseException') {
                console.log(`[WARN] createTable: ${err.message}`);
            } else {
                console.log(`[ERROR] createTable: ${err.message}`);
                return;
            }
        }
    }

    const docClient = new DynamoDB.DocumentClient(options);

    const now = Math.floor(Date.now() / 1000);

    const serverID = v4();
    const playerID = '002918';
    const createTime = now;

    // 批量写入
    const batchWriteParams: AWS.DynamoDB.DocumentClient.BatchWriteItemInput = {
        RequestItems: {
            Player: [{
                PutRequest: { Item: { serverID, playerID, createTime } },
            }, {
                PutRequest: { Item: { serverID, playerID: '003574', createTime: now + 1 } },
            }]
        },
        ReturnConsumedCapacity: 'TOTAL',
    };

    try {
        const batchWriteResult = await docClient.batchWrite(batchWriteParams).promise();
        console.log(`[INFO] batchWrite: ${JSON.stringify(batchWriteResult)}`);
    } catch (e: any) {
        const err: AWSError = e;
        console.log(`[ERROR] batchWrite: ${err.message}`);
        return;
    }

    // 查
    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
        TableName, IndexName: gsiName,
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
    } catch (e: any) {
        const err: AWSError = e;
        console.log(`[ERROR] query: ${JSON.stringify(err)} ${err.message}`);
    }

    // 扫描
    const scanParams: AWS.DynamoDB.DocumentClient.ScanInput = {
        TableName, IndexName: lsiName,
        ProjectionExpression: 'serverID, playerID, createTime',
        FilterExpression: '#ct = :ct',
        ExpressionAttributeNames: {
            '#ct': 'createTime',
        },
        ExpressionAttributeValues: {
            ':ct': createTime,
        },
    };

    try {
        const scanResult = await docClient.scan(scanParams).promise();
        console.log(`[INFO] scan: ${JSON.stringify(scanResult)}`);
    } catch (e: any) {
        const err: AWSError = e;
        console.log(`[ERROR] scan: ${err.message}`);
    }

    // 删除表
    const deleteTableParams: AWS.DynamoDB.DeleteTableInput = { TableName };

    try {
        const deleteTableResult = await dynamodb.deleteTable(deleteTableParams).promise();
        console.log(`[INFO] deleteTable: ${JSON.stringify(deleteTableResult)}`);
    } catch (e: any) {
        const err: AWSError = e;
        console.log(`[ERROR] deleteTable: ${err.message}`);
        return;
    }
}

const args = _.drop(argv, 2);
const port = args.length === 0 ? 8000 : Number(args[0]);

main(port);
