/**
 * 增删改查
 */

import { argv } from 'process';

import * as _ from 'lodash';

import { main } from './bootstrap';

const args = _.drop(argv, 2);
const port = args.length === 0 ? 8000 : Number(args[0]);

main(port);
