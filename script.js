const ethereumButton = document.querySelector('.right');
const addrInput = document.getElementById("addr")

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  try {ethereum} catch {
     console.log("No eth browser detected")
    Swal.fire({
      title: 'No ethereum provider detected',
      text: 'Try MetaMask!',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Retry`,
      denyButtonText: `Don't Retry`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        getAccount()
      } else if (result.isDenied) {
        Swal.fire('Not connected...', '', 'info')
      }
    })
  }
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  var account2 = account.split("")
  var finAcct = account2[0] + account2[1] + account2[2] + account2[3] + account2[4] + account2[5] + account2[6] + account2[6] + account2[7] + account2[8] + account2[9] + account2[10] + account2[11] + account2[12] + account2[13] + account2[14] + account2[15] + account2[16] + "..."
  ethereumButton.innerHTML = finAcct;
  try {
    document.getElementById("addr").value = account
  } catch {}
  //ethereumButton.style = "font-size: 13px;"
}

function genLink() {
  const address  = document.getElementById("addr").value
  const amount   = document.getElementById("amnt").value
  const currency = document.getElementById("curr").value
  // ------------------------------------------------ \\
  var   lnk = String(window.location).split("#")[0] + "pay.html" + "?addr=" + address + "&amnt=" + amount + "&curr=" + currency;
  document.getElementById("lnk").innerHTML = lnk;
  const short = "46cb3cdd7ab53a3287f49b8f2fec5f33a83b9c1b"
  Swal.fire({
    icon: 'success',
    title: 'Done!',
    text: 'Share your link!',
    width: '60%',
    footer: "<center>" + lnk.split("://")[1] + "</center>"
  })
}
