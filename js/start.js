//variables
var aConsole = document.getElementById('console')
var userAlice = document.querySelector('#alice')
var userBob = document.querySelector('#bob')
var alicePayInput = document.getElementById("alicePay")
var bobPayInput = document.getElementById("bobPay")

var isMining = false


//force integer validation
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

setInputFilter(alicePayInput, function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(bobPayInput, function (value) {
    return /^\d*$/.test(value);
});

//output messages to console

function consoleLog(msg) {
    let p = document.createElement('p')
    p.textContent = moment().format('h:mm:ss a') + " -> " + msg
    aConsole.appendChild(p)

    var elem = document.querySelector('.log');
    elem.scrollTop = elem.scrollHeight;
}

// Transactions

//update user balance
function updateBalance() {
    document.querySelector('#alice .balance').textContent = demoCoin.getAddressBalance('wallet-Alice')
    console.log(demoCoin.getAddressBalance('wallet-Bob'))
    document.querySelector('#bob .balance').textContent = demoCoin.getAddressBalance('wallet-Bob')
    document.querySelector('#miner .balance').textContent = demoCoin.getAddressBalance('wallet-Miner49r')
}


// Handle payments
document.querySelector('#alice .btn').addEventListener('click', function () {
    consoleLog("wallet-Alice initiated a transaction: Pay BTC" + alicePayInput.value + " to wallet-Bob")
    demoCoin.createTransaction(new Transaction(Date.now(), 'wallet-Alice', 'wallet-Bob', parseInt(alicePayInput.value)))
    alicePayInput.value = '';
})
document.querySelector('#miner .btn').addEventListener('click', function () {
    let setup = document.getElementById('hardware').value
    startMining(setup);
})

function startMining(setup) {
    console.log(demoCoin.unminedTxns)
    if (demoCoin.unminedTxns.length > 1) {
        let val = setup || 2
        val = parseInt(val)
        demoCoin.mineCurrentBlock('wallet-Miner49r', val)
        updateBalance();
        updateChainUI()
    } else {
        consoleLog("no transaction queued")
    }
}

//Update Chain UI
var chain;
var blockarea = document.getElementById('blockarea');

function updateChainUI() {
    chain = demoCoin.chain
    console.log(chain)
    for (let i = 0; i < chain.length; i++) {
        blockarea.innerHTML += `<div class="block" id="block-${i}">
                                <i class="fas fa-cube"></i>
                                </div>`;
    }
    var blocks = document.getElementsByClassName('block')
    for(let i =0; i< blocks.length; i++){
        blocks[i].addEventListener('mouseover',function(){
            showBlockProps(this.id);
        })
    }
}

function showBlockProps(id){
    id = id.replace(/block-/gi,"");
    document.getElementById('blockinfo').innerHTML =JSON.stringify( chain[id],null,2)
}
