/**
 * 启用 TTL
 */

import { argv } from 'process';

import * as _ from 'lodash';
import AWS from 'aws-sdk';
import { AWSError, DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

async function main(port: number) {
    const options: AWS.DynamoDB.ClientConfiguration = {
        region: 'cn-south-2',
        endpoint: `http://127.0.0.1:${port}`,
    };

    AWS.config.update(options);

    const dynamodb = new DynamoDB();

    const TableName = 'Timer';

    // 创建表
    const createTableParams: AWS.DynamoDB.CreateTableInput = {
        TableName,
        KeySchema: [{
            AttributeName: 'timerID', KeyType: 'HASH',
        }],
        AttributeDefinitions: [{
            AttributeName: 'timerID', AttributeType: 'S',
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5, WriteCapacityUnits: 5,
        },
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

    // Using TTL
    const updateTTLParams: AWS.DynamoDB.UpdateTimeToLiveInput = {
        TableName,
        TimeToLiveSpecification: {
            Enabled: true,
            AttributeName: 'expireAt',
        },
    };

    try {
        const updateTTLResult = await dynamodb.updateTimeToLive(updateTTLParams).promise();
        console.log(`[INFO] updateTimeToLive: ${JSON.stringify(updateTTLResult)}`);
    } catch (e: any) {
        const err: AWSError = e;
        if (err && err.code) {
            if (err.code === 'ValidationException') {
                console.log(`[WARN] updateTimeToLive: ${err.message}`);
            } else {
                console.log(`[ERROR] updateTimeToLive: ${err.message}`);
                return;
            }
        }
    }

    const docClient = new DynamoDB.DocumentClient();

    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/time-to-live-ttl-how-to.html
    const now = Math.floor(Date.now() / 1000);

    // 批量写入
    const RequestItems: AWS.DynamoDB.DocumentClient.BatchWriteItemRequestMap = {};
    RequestItems[TableName] = [];

    for (let i = 1; i <= 10; ++i) {
        RequestItems[TableName].push({
            PutRequest: { Item: { timerID: v4(), expireAt: now + i } },
        });
    }

    const batchWriteParams: AWS.DynamoDB.DocumentClient.BatchWriteItemInput = {
        RequestItems, ReturnConsumedCapacity: 'TOTAL',
    };

    try {
        const batchWriteResult = await docClient.batchWrite(batchWriteParams).promise();
        console.log(`[INFO] batchWrite: ${JSON.stringify(batchWriteResult)}`);
    } catch (e: any) {
        const err: AWSError = e;
        console.log(`[ERROR] batchWrite: ${err.message}`);
        return;
    }
}

const args = _.drop(argv, 2);
const port = args.length === 0 ? 8000 : Number(args[0]);

main(port);
