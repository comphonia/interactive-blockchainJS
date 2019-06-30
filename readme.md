# Bioshare - Blockchain Implementation

Version 1 - [Alchemy](https://comphonia.com/playground/apps/alchemy/)
Version 2 - [Bioshare](https://comphonia.com/playground/apps/alchemy/)

> All updates below are for version 2.

You can find the high-level overview and some resources I used on [the wiki](https://github.com/comphonia/interactive-blockchainJS/wiki/Notes)

Just the block chain implementation - [https://repl.it/@comphonia/jsblockchain](https://repl.it/@comphonia/jsblockchain)

> note: This is just an interactive experience, the implementaiton here is on the client side and elements of the implementation have been adapted to fit the user experience. This should not be adopted for a production blockchain application as-is.

 ### Dev-notes:
Nonces are usually fixed by the application and a change in setup/hardware does not change the nonce value as it is implemented in this application, a better hardware just means better processing power to solve the hash.
   
Charging a fee for proof of work is not implemented, this can lead to spamming and DDOS

### To-do / Fix
- [ ] Add an manual/on-boarding for new users.
- [x] Genesis & Airdrop blocks UI not added to the chain onStart.
- [x] User balance is not reduced per transaction, this leads to a negative balance when multiple transactions <= available balance are queued but their total in the transaction is more than the balance. (not needed for v2)
- [x] No visual mining feedback. (not needed for v2)
  
### Documentation
  ![](https://memegenerator.net/img/instances/63344723.jpg)
