$(document).ready(function () {
  let balance = 1000.0;
  let wallet = {};
  let currentDay = 1;
  let isBuying = true;

  const coinPhotos = {
    ada: "images/ada.png",
    avax: "images/avax.png",
    btc: "images/btc.png",
    doge: "images/doge.png",
    eth: "images/eth.png",
    pol: "images/pol.png",
    snx: "images/snx.png",
    trx: "images/trx.png",
    xrp: "images/xrp.png",
  };

  function updateWalletTable() {
    let walletTable = `
          <tr id="cash-balance-row">
              <td>Dolar</td>
              <td id="cash-balance">$${balance.toFixed(2)}</td>
              <td></td>
              <td></td>
          </tr>`;
    for (let coin in wallet) {
      const subtotal = (wallet[coin].amount * wallet[coin].lastClose).toFixed(
        2
      );
      walletTable += `
              <tr>
                  <td>
                      <img src="${
                        coinPhotos[coin]
                      }" alt="${coin.toUpperCase()}" width="25" height="25">
                      ${coin.toUpperCase()}
                  </td>
                  <td>${wallet[coin].amount.toFixed(6)}</td>
                  <td>$${subtotal}</td>
                  <td>$${wallet[coin].lastClose}</td>
              </tr>`;
    }
    $("#wallet-table").html(walletTable);
  }

  function updateTotalValue() {
    let total = balance;
    for (let coin in wallet) {
      total += wallet[coin].amount * wallet[coin].lastClose;
    }
    $("#total-money").text(`$${total.toFixed(2)}`);
  }

  function updateCoinPrices() {
    const marketDay = market[currentDay - 1];
    marketDay.coins.forEach((coin) => {
      if (wallet[coin.code]) {
        wallet[coin.code].lastClose = coin.close;
      }
    });
    updateWalletTable();
  }

  $("#next-day-btn").click(function () {
    currentDay++;
    $("#current-day").text(`Day: ${currentDay}`);
    updateCoinPrices();
    updateTotalValue();
  });

  $("#coin-select").change(function () {
    const selectedCoin = $("#coin-select").val();
    const actionText = isBuying ? "Buy" : "Sell";
    $("#action-btn").text(`${actionText} ${selectedCoin.toUpperCase()}`);
  });

  $("#buy-toggle").click(() => {
    isBuying = true;
    $("#buy-toggle").addClass("active").removeClass("inactive");
    $("#sell-toggle").addClass("inactive").removeClass("active");
    const selectedCoin = $("#coin-select").val();
    $("#action-btn").text(`Buy ${selectedCoin.toUpperCase()}`);
  });

  $("#sell-toggle").click(() => {
    isBuying = false;
    $("#sell-toggle").addClass("active").removeClass("inactive");
    $("#buy-toggle").addClass("inactive").removeClass("active");
    const selectedCoin = $("#coin-select").val();
    $("#action-btn").text(`Sell ${selectedCoin.toUpperCase()}`);
  });

  $("#action-btn").click(function () {
    const amount = parseFloat($("#amount").val());
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const selectedCoin = $("#coin-select").val();
    const marketDay = market[currentDay - 1];
    const coinData = marketDay.coins.find((c) => c.code === selectedCoin);

    if (isBuying) {
      const cost = amount * coinData.close;
      if (balance < cost) {
        alert("Insufficient balance.");
        return;
      }
      balance -= cost;
      if (!wallet[selectedCoin]) {
        wallet[selectedCoin] = { amount: 0, lastClose: coinData.close };
      }
      wallet[selectedCoin].amount += amount;
    } else {
      if (!wallet[selectedCoin] || wallet[selectedCoin].amount < amount) {
        alert("Insufficient coins to sell.");
        return;
      }
      const revenue = amount * coinData.close;
      balance += revenue;
      wallet[selectedCoin].amount -= amount;
      if (wallet[selectedCoin].amount === 0) {
        delete wallet[selectedCoin];
      }
    }

    updateWalletTable();
    updateTotalValue();
  });

  updateWalletTable();
  updateTotalValue();
});
