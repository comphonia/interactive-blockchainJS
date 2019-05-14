class Transaction {
    constructor(timestamp, payerAddr, payeeAddr, amount) {
        this.timestamp = timestamp
        this.payerAddr = payerAddr
        this.payeeAddr = payeeAddr
        this.amount = amount
    }
}

class Block {
    constructor(timestamp, txns, previousHash) {
        this.timestamp = timestamp
        this.txns = txns
        this.previousHash = previousHash
        this.nonce = 0
        this.hash = this.calculateHash()
    }
    //hash block contents to create a block header used in block linking
    calculateHash() {
        return CryptoJS.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }
    // proof of work
    mineBlock(difficulty) {
        let count = 0
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            count++
            this.hash = this.calculateHash()
        }
        consoleLog("Block successfully hashed: (" + count + " iterations). Hash:" + this.hash)
    }
}

//uses the Block class to create a linked blockchain
class Blockchain {
    constructor() {
        this.chain = []
        this.difficulty = 1
        this.unminedTxns = []
        this.miningReward = 10
        this.registeredAddresses = [
            'wallet-Alice', 'wallet-Bob', 'wallet-Charlie', 'wallet-Miner49r'
        ]
        this.createGenesisBlock()
        this.airDropCoins(100)
    }

    airDropCoins(coins) {
        for (const addr of this.registeredAddresses) {
            let txn = new Transaction(Date.now(), "mint", addr, coins)
            this.unminedTxns.push(txn)
        }
       this.mineCurrentBlock('wallet-Miner49r')
        consoleLog("Airdrop BTC100 to all users")
    }

    // initial block
    createGenesisBlock() {
        let txn = new Transaction(Date.now(), "mint", "genesis", 0)
        let block = new Block(Date.now(), [txn], "0")
        this.chain.push(block)
        consoleLog("Genesis block created")
    }

    //return the last block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    mineCurrentBlock(minerAddr,diff) {
        let validatedTxns = []
        for (const txn of this.unminedTxns) {
            if (txn.payerAddr === "mint") {
                validatedTxns.push(txn)
            } else if (this.validateTransaction(txn)) {
                validatedTxns.push(txn)
                consoleLog("Current Transaction from: " + txn.payerAddr + " to: " + txn.payeeAddr + " for: BTC" + txn.amount + " has been validated")
            } else consoleLog("transaction from: " + txn.payerAddr + " is invalid, balance is less than BTC" + txn.amount)
        }
        console.log("transactions validated: " + validatedTxns.length)



        let block = new Block(Date.now(), validatedTxns, this.getLatestBlock().hash)
        block.mineBlock(diff || this.difficulty )


        this.chain.push(block)

        this.unminedTxns = [
            new Transaction(Date.now(), "mint", minerAddr, this.miningReward)
        ]
    }

    validateTransaction(txn) {
        let payerAddr = txn.payerAddr
        let balance = this.getAddressBalance(payerAddr)
        if (balance >= txn.amount) {
            return true
        } else {
            return false
        }
    }

    createTransaction(txn) {
        this.unminedTxns.push(txn)
    }

    //loops through blocks > transactions to find its balance
    getAddressBalance(addr) {
        let balance = 0
        for (const block of this.chain) {
            for (const txn of block.txns) {
                if (txn.payerAddr === addr) {
                    balance -= txn.amount
                }
                if (txn.payeeAddr === addr) {
                    balance += txn.amount
                }
            }
        }
        return balance
    }

    //iterate the blocks in the chain and validate the hash === previousHash
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            //validate data integrity
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;

            //validate hash chain link
            if (currentBlock.previousHash !== previousBlock.hash)
                return false;

            return true;
        }
    }

}

let demoCoin = new Blockchain()
updateBalance()

/*

let demoCoin = new Blockchain()

//1st block
demoCoin.createTransaction(new Transaction(Date.now(), 'wallet-Alice', 'wallet-Bob', 500))
demoCoin.createTransaction(new Transaction(Date.now(), 'wallet-Bob', 'wallet-Alice', 25))

//console.log(demoCoin.unminedTxns)

console.log("\n Mining a block")
demoCoin.mineCurrentBlock('wallet-Miner49r')

console.log("\nBalance: Alice: ", +demoCoin.getAddressBalance('wallet-Alice'))
console.log("\nBalance: Bob: ", +demoCoin.getAddressBalance('wallet-Bob'))
console.log("\nBalance: Miner49r: ", +demoCoin.getAddressBalance('wallet-Miner49r'))

//2nd block
demoCoin.createTransaction(new Transaction(Date.now(), 'wallet-Alice', 'wallet-Bob', 50))
demoCoin.createTransaction(new Transaction(Date.now(), 'wallet-Bob', 'wallet-Alice', 25))

//console.log(demoCoin.unminedTxns)

console.log("\n Mining a block")
demoCoin.mineCurrentBlock('wallet-Miner49r')
updateBalance()
console.log("\nBalance: Alice: ", +demoCoin.getAddressBalance('wallet-Alice'))
console.log("\nBalance: Bob: ", +demoCoin.getAddressBalance('wallet-Bob'))
console.log("\nBalance: Miner49r: ", +demoCoin.getAddressBalance('wallet-Miner49r'))
*/
