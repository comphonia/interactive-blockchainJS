const SHA256 = require("crypto-js/sha256");

export class Transaction {
    constructor(timestamp, senderDrive, receiverDrive, fileCount) {
        this.timestamp = timestamp
        this.senderDrive = senderDrive
        this.receiverDrive = receiverDrive
        this.fileCount = fileCount
    }
}

class Block {
    constructor(timestamp, txns, previousHash) {
        this.timestamp = timestamp
        this.txns = txns
        this.previousHash = previousHash
        this.nonce = 0
        this.hash = this.calculateHash()
        this.message = ""
    }
    //hash block contents to create a block header used in block linking
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }
    // proof of work
    mineBlock(difficulty) {
        let count = 0
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            count++
            this.hash = this.calculateHash()
        }
      this.message = "Block successfully hashed: (" + count + " iterations). Hash:" + this.hash
    }
}

//uses the Block class to create a linked blockchain
export class Blockchain {
    constructor() {
        this.chain = []
        this.difficulty = 1
        this.unminedTxns = []
        this.miningReward = 10
        this.registeredAddresses = [
            'drive-Alice', 'drive-Bob', 'drive-Charlie', 'drive-Miner49r'
        ]
        this.newBlock = null
       this.createGenesisBlock()
      //  this.airDropCoins(100)
    }

    airDropCoins(coins) {
        for (const addr of this.registeredAddresses) {
            let txn = new Transaction(Date.now(), "mint", addr, coins)
            this.unminedTxns.push(txn)
        }
       this.mineCurrentBlock('drive-Miner49r')
       // consoleLog("Airdrop BTC100 to all users")
    }

    // initial block
    createGenesisBlock() {
        let txn = new Transaction(Date.now(), "mint", "genesis", 0)
        let block = new Block(Date.now(), [txn], "0")
        this.chain.push(block)
       // consoleLog("Genesis block created")
    }

    //return the last block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    mineCurrentBlock(minerAddr,diff) {
        let validatedTxns = []
        for (const txn of this.unminedTxns) {
            if (txn.senderDrive === "mint") {
                validatedTxns.push(txn)
            } else if (this.validateTransaction(txn)) {
                validatedTxns.push(txn)
              //  consoleLog("Current Transaction from: " + txn.senderDrive + " to: " + txn.receiverDrive + " for: BTC" + txn.amount + " has been validated")
            } 
        }
       // console.log("transactions validated: " + validatedTxns.length)



        this.newBlock= new Block(Date.now(), validatedTxns, this.getLatestBlock().hash)
        this.newBlock.mineBlock(diff || this.difficulty )


        this.chain.push(this.newBlock)

        this.unminedTxns = [
            new Transaction(Date.now(), "mint", minerAddr, this.miningReward)
        ]
    }

    validateTransaction(txn) {
        //change to validate if user is in the system instead of balance, return true for simulation
        return true;
       /* let senderDrive = txn.senderDrive
        let balance = this.getAddressBalance(senderDrive)
        if (balance >= txn.amount) {
            return true
        } else {
            return false
        } */
    }

    createTransaction(txn) {
        this.unminedTxns.push(txn)
    }

    //loops through blocks > transactions to find its balance
    getAddressBalance(addr) {
        let balance = 0
        for (const block of this.chain) {
            for (const txn of block.txns) {
                if (txn.senderDrive === addr) {
                    balance -= txn.amount
                }
                if (txn.receiverDrive === addr) {
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

