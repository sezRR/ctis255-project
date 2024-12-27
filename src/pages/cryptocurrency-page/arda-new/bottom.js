$(document).ready(function () {
  let balance = 1000.0; // Initial balance
  let wallet = {}; // Tracks coin holdings
  let currentDay = 1; // Tracks the current market day
  let isBuying = true; // Tracks whether the user is buying or selling
  let currentPrices = {}; // Current coin prices

  if (typeof market === "undefined" || market.length === 0) {
    alert("Market data is not available.");
    return;
  }

  function initializePrices() {
    const marketDay = market[currentDay - 1];
    currentPrices = marketDay.coins.reduce((acc, coin) => {
      acc[coin.code] = coin.close;
      return acc;
    }, {});
  }

  function updateWalletTable() {
    let walletTable = `
      <tr id="cash-balance-row">
        <td>Dolar</td>
        <td id="cash-balance">$${balance.toFixed(2)}</td>
        <td></td>
        <td></td>
      </tr>`;
    for (let coin in wallet) {
      const subtotal = (wallet[coin] * currentPrices[coin]).toFixed(2);
      walletTable += `
        <tr>
          <td>${coin.toUpperCase()}</td>
          <td>${wallet[coin].toFixed(6)}</td>
          <td>$${subtotal}</td>
          <td>$${currentPrices[coin]}</td>
        </tr>`;
    }
    $("#wallet-table").html(walletTable);
  }

  function updateTotalValue() {
    let total = balance;
    for (let coin in wallet) {
      total += wallet[coin] * currentPrices[coin];
    }
    $("#total-money").text(`$${total.toFixed(2)}`);
  }

  $("#next-day-btn").click(function () {
    if (currentDay < market.length) {
      currentDay++;
      const nextDay = market[currentDay - 1];
      currentPrices = nextDay.coins.reduce((acc, coin) => {
        acc[coin.code] = coin.close;
        return acc;
      }, {});
      $("#current-day").text(`Day: ${currentDay}`);
      updateWalletTable();
      updateTotalValue();

      if (currentDay === 365) {
        $(".trading-section").hide();
        $(".wallet-section").css("flex-grow", "10");
        $("#total-money").addClass("animate-total-money");
      }
    } else {
      alert("No more market data available.");
    }
  });

  $("#buy-toggle").click(function () {
    isBuying = true;
    $("#buy-toggle").removeClass("inactive");
    $("#sell-toggle").addClass("inactive");
    $("#action-btn").removeClass("sell-button").addClass("buy-button"); // Change to green
    updateActionButton();
  });

  $("#sell-toggle").click(function () {
    isBuying = false;
    $("#sell-toggle").removeClass("inactive");
    $("#buy-toggle").addClass("inactive");
    $("#action-btn").removeClass("buy-button").addClass("sell-button"); // Change to red
    updateActionButton();
  });

  function updateActionButton() {
    const action = isBuying ? "Buy" : "Sell";
    const coin = $("#coin-select").val();
    $("#action-btn").text(`${action} ${coin.toUpperCase()}`);
  }

  $("#action-btn").click(function () {
    const amount = parseFloat($("#amount").val());
    const coin = $("#coin-select").val();

    if (!amount || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    if (isBuying) {
      const cost = amount * currentPrices[coin];
      if (cost > balance) {
        alert("Insufficient balance.");
        return;
      }
      balance -= cost;
      wallet[coin] = (wallet[coin] || 0) + amount;
    } else {
      if (!wallet[coin] || wallet[coin] < amount) {
        alert("Insufficient coins to sell.");
        return;
      }
      const revenue = amount * currentPrices[coin];
      balance += revenue;
      wallet[coin] -= amount;
      if (wallet[coin] === 0) {
        delete wallet[coin];
      }
    }

    updateWalletTable();
    updateTotalValue();
  });

  $("#amount").on("input", function () {
    const amount = parseFloat($(this).val()) || 0;
    const coin = $("#coin-select").val();
    const equivalent = (amount * currentPrices[coin]).toFixed(2);
    $("#dollar-equivalent").text(`=$${equivalent}`);
  });

  initializePrices();
  updateWalletTable();
  updateTotalValue();
});
