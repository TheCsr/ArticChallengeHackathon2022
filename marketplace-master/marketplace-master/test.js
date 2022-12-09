import { Scanner } from '@0xcert/ethereum-scanner';
import * as Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3000'));

const blockNumber = 31130819;
const scanner = new Scanner(web3);

await scanner.parse(blockNumber); // => { transactions: [...], contracts: [...]}