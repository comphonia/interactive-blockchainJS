# Alchemy - Blockchain Implementation

You can find the high-level overview and some resources I used on [the wiki](https://github.com/comphonia/interactive-blockchainJS/wiki/Notes)

Just the block chain implementation - [https://repl.it/@comphonia/jsblockchain](https://repl.it/@comphonia/jsblockchain)

> note: This is just an interactive experience, the implementaiton here is on the client side and elements of the implementation have been adapted to fit the user experience. This is should not be adopted for a production blockchain application as-is.

 ### Dev-notes:
Nonces are usually fixed by the application and a change in setup/hardware does not change the nonce value as it is implemented in this application, a better hardware just means better processing power to solve the hash.
   
Charging a fee for proof of work is not implemented, this can lead to spamming and DDOS

### Known Issues
- [ ] Genesis & Airdrop blocks UI not spawning onStart
- [ ] User balance is not reduced per transaction, this leads to a negative balance when multiple transactions are queued.
- [ ] No visual mining feedback.
  
  ## Documentation
  ![](https://memegenerator.net/img/instances/63344723.jpg)
