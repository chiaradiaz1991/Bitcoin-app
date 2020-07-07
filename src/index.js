const electron = require('electron');
const path = require('path');
const axios = require('axios');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer;


const notifyButton = document.getElementById('notify-button');
let price = document.querySelector('h1');
let targetPrice = document.getElementById('target-price')

function getBitCoin() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
      const cryptos = res.data.BTC.USD
      price.innerHTML = '$' + cryptos.toLocaleString('en')
    })
}

getBitCoin()
setInterval(getBitCoin, 30000)

notifyButton.addEventListener('click', function(event) {
  const modalPath = path.join('file://', __dirname, 'add.html')
  let win = new BrowserWindow({ alwaysOnTop: true, width: 400, height: 200 })
  win.on('close', function() {
    win = null
  })
  win.loadURL(modalPath)
  win.show()
})


ipc.on('targetPriceVal', function(event, arg) {
  targetPriceVal = Number(arg)
  targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})