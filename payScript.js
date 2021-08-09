const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const payment_addr = urlParams.get('addr')
const payment_amt  = urlParams.get('amnt')
const payment_curr = urlParams.get('curr')
console.log(payment_curr)
if ((payment_curr.startsWith("ETH*")) || (payment_curr.startsWith("BSC*")) || (payment_curr.startsWith("MATIC*")) || (payment_curr.startsWith("HT*")) || (payment_curr.startsWith("FTM*"))) {
  var contract_addr = payment_curr.split("*")[1]
  var blockchain = payment_curr.split("*")[0]
}
function toFullName(x) {
  if (x=="ETH") {
    return "Ether"
  } else if (x=="BSC") {
    return "BNB"
  } else if (x=="BNB") {
    return "BNB"
  } else if (x=="MATIC") {
    return "MATIC"
  } else if (x=="HT") {
    return "Huobi ECO"
  } else if (x=="FTM") {
    return "Fantom"
  }
}
var finAcct1 = "Paying: " + payment_addr[0] + payment_addr[1] + payment_addr[2] + payment_addr[3] + payment_addr[4] + payment_addr[5] + payment_addr[6] + "..."
document.getElementById("PAYMENT_ADDR").innerHTML = finAcct1
try {
  var finCurr = "Token: " + contract_addr[0] + contract_addr[1] + contract_addr[2] + contract_addr[4] + contract_addr[5] + contract_addr[6] + "..."
  document.getElementById("PAYMENT_CURR").innerHTML = finCurr
} catch {
  document.getElementById("PAYMENT_CURR").innerHTML = "Paying: " + toFullName(payment_curr)
}
document.getElementById("PAYMENT_AMNT").innerHTML = "Amount: " + payment_amt

document.getElementById("payingto").innerHTML = payment_addr

if (payment_amt == "1") {
  document.getElementById("payingcu").innerHTML = payment_amt + " " + payment_curr
} else {
  document.getElementById("payingcu").innerHTML = payment_amt + " of " + payment_curr
}

function toBlockchain() {
  if (payment_curr.startsWith("ETH")) {
    return ["0x1",{ /* should be in mm by def. */ }]
  } else if (payment_curr.startsWith("BSC") || payment_curr.startsWith("BNB")){
    return ["0x38",{
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency:
        {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],}]
  } else if (payment_curr.startsWith("MATIC")){
    return ["0x89",{
      chainId: "0x89",
      chainName: "Polygon Network",
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
      },
      rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    }]
  } else if (payment_curr.startsWith("HT")){
    return ["0x80",{
      chainId: '0x80',
      chainName: 'Huobi ECO',
      nativeCurrency: {
        name: 'HT',
        symbol: 'HT',
        decimals: 18
      },
      rpcUrls: ["https://http-mainnet.hecochain.com/"],
      blockExplorerUrls: ['https://hecoinfo.com/']
    }]
  } else if (payment_curr.startsWith("FTM")){
    return ["0xFA",{
      chainId: '0xFA',
      chainName: 'Fantom Opera',
      nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18
      },
      rpcUrls: ["https://rpcapi.fantom.network/"],
      blockExplorerUrls: ["https://ftmscan.com/"]
    }]
  }
}
var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  console.log("In: " + rgb)
  hex = "0x" + hex
  console.log("Out: " + hex)
  return hex;
};

async function pay() {
  x = toBlockchain()
  //x = parseInt(x[0],16)
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: x[0] }], // chainId must be in hexadecimal numbers
    }); 
  } catch {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [x[1]]
    })
  }
  const next_amt = (parseFloat(payment_amt)*1000000000000000000).toString()
  console.log(next_amt)
  //const supr = (parseFloat)toRadixString(16)
  var data = {
    from: ethereum.selectedAddress,
    to: payment_addr,
    value: web3.utils.numberToHex(next_amt),
    gasPrice: '0x09184e72a000',
    gas: '0x2710'
  }
  await ethereum.request({
    method: 'eth_sendTransaction',
    params: [data],
  });
  Swal.fire({
    title: 'Custom width, padding, background.',
    width: 600,
    padding: '3em',
    backdrop: `rgba(0,0,123,0.4)`
  })
}
function donate() {
  Swal.fire({
    title: 'Thanks!',
    theme: 'wordpress-admin',
    text: 'You can use this address for any donations on supported blockchains!',
    footer: '<strong>0x3e522051A9B1958Aa1e828AC24Afba4a551DF37d</strong>'
  })
}
async function test_blockchainswitch() {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
  });
}