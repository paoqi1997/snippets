/**
 * 使用 PartiQL
 */

import { argv } from 'process';

import * as _ from 'lodash';
import AWS from 'aws-sdk';
import { AWSError, DynamoDB } from 'aws-sdk';

/**
 * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html
 */
async function main(port: number) {
    const options: AWS.DynamoDB.ClientConfiguration = {
        region: 'cn-south-2',
        endpoint: `http://127.0.0.1:${port}`,
    };

    AWS.config.update(options);

    const dynamodb = new DynamoDB();

    const TableName = 'Database';

    // 创建表
    const createTableParams: AWS.DynamoDB.CreateTableInput = {
        TableName,
        KeySchema: [{
            AttributeName: 'name', KeyType: 'HASH',
        }, {
            AttributeName: 'version', KeyType: 'RANGE',
        }],
        AttributeDefinitions: [{
            AttributeName: 'name', AttributeType: 'S',
        }, {
            AttributeName: 'version', AttributeType: 'N',
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

    // 批量插入
    const batchExecParams: AWS.DynamoDB.BatchExecuteStatementInput = {
        Statements: [{
            Statement: `INSERT INTO ${TableName} VALUE { 'name': 'mysql', 'version': 5.7 }`,
        }, {
            Statement: `INSERT INTO ${TableName} VALUE { 'name': 'mysql', 'version': 8.0 }`,
        }],
    };

    const batchExecResult = await dynamodb.batchExecuteStatement(batchExecParams).promise();
    const responses = batchExecResult['Responses'];

    if (responses) {
        for (const response of responses) {
            if (response['Error']) {
                console.log(`[ERROR] batchExecuteStatement: ${JSON.stringify(response)}`);
            } else {
                console.log(`[INFO] batchExecuteStatement: ${JSON.stringify(response)}`);
            }
        }
    }

    // 查
    const execParams: AWS.DynamoDB.ExecuteStatementInput = {
        Statement: `SELECT * FROM ${TableName} WHERE name = 'mysql'`,
    };

    try {
        const execResult = await dynamodb.executeStatement(execParams).promise();
        console.log(`[INFO] executeStatement: ${JSON.stringify(execResult)}`);
    } catch (e: any) {
        const err: AWSError = e;
        console.log(`[ERROR] executeStatement: ${err.message}`);
        return;
    }
}

const args = _.drop(argv, 2);
const port = args.length === 0 ? 8000 : Number(args[0]);

main(port);
