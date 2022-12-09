
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
        this.web3ws = new Web3(new Web3WsProvider('ws://localhost:7545'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
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
//let txChecker = new TransactionChecker(1337, '0x36F7f3A315310042368251D606c019F566a5A387');
let txChecker = new TransactionChecker(1337, '0xC88D90d02595c22592AE8A8e18b268183a1C0DE5');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();
