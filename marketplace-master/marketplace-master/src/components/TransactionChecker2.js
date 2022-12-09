
const Web3 = require('web3');
const Web3WsProvider = require('web3-providers-ws');
var emitter = require('events').EventEmitter;
const web3 = new Web3('wss://wss.api.moonbase.moonbeam.network');


class TransactionChecker {
    web3;
    web3ws;
    account;
    subscription;

    constructor(projectId, account) {
        this.web3ws = new Web3(new Web3WsProvider('wss://kovan.infura.io/ws/v3/2ce42e0df5cd4c0fb199353360fed02c'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/2ce42e0df5cd4c0fb199353360fed02c'));
        this.account = account.toLowerCase();
    }


    subscribe(topic) {
        this.subscription =  this.web3ws.eth.subscribe(topic, (error, result) => {
                if (error)
                    console.error(error);
            });
    }
 

    watchTransactions() {
       // console.log(this.subscription);
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    console.log(tx);
                    if (tx != null) {
                        if (this.account == tx.to.toLowerCase()) {
                            console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }, 6000)
        });
        
}
}
let txChecker = new TransactionChecker('2ce42e0df5cd4c0fb199353360fed02c', '0x635a657285c3bff16ae84a24fbb087cb81d24832');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();
