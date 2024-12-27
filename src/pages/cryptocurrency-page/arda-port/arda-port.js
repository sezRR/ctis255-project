import { injectCSS } from "../../../utils/injectCSS.js";
import TemplateCache from "../../../utils/templateCache.js";
import globalState from "../../../stores/globalState.js";
import { market } from "../../../assets/data/db.js";
import Asset from "../../../models/asset.js";
import { setNewUsers } from "../../../utils/localStorageUtil.js";

const TradingComponent = (function () {
    const htmlPath = "src/pages/cryptocurrency-page/arda-port/arda-port.html";
    const cssPath = "src/pages/cryptocurrency-page/arda-port/arda-port.css";

    /**
     * Initializes and renders the Trading component.
     * @param {string} containerSelector - The selector of the container to render the component into.
     */
    async function render(containerSelector) {
        injectCSS(cssPath);

        let template = await TemplateCache.getTemplateAsync(htmlPath);
        template = template.replace("{{balance}}", globalState.currentUser.balance.toFixed(2));
        $(containerSelector).html(template);

        // DAY 365 LOGIC
        if (globalState.currentUser.day === 365) {
            $(".trading-section").remove();
            $("#total-money").addClass("animate-total-money");
            $(".wallet-section").css("max-width", "none")
        }

        const { balance, assets, lastSelectedAssetId } = globalState.currentUser;

        let wallet = assets || {};
        const currentCoin = globalState.coins.find(c => c.id === globalState.currentUser.lastSelectedAssetId)
        const coinName = currentCoin.name.toUpperCase()

        if (!currentCoin) {
            console.error("Selected coin data not found.");
            return;
        }

        function updateWalletTable() {
            var walletTable = `
                    <tr id="cash-balance-row">
                      <td>Dollar</td>
                      <td id="cash-balance">$${globalState.currentUser.assets[0].amount.toFixed(2)}</td>
                      <td></td>
                      <td></td>
                    </tr>`;

            let newBalance = globalState.currentUser.assets[0].amount;
            Object.entries(wallet).forEach(([id, coin]) => {
                if (coin.id === "dollar") return;

                const currCoinDto = globalState.coins.find(c => c.id === coin.id);
                const currCoin = market[globalState.currentUser.day - 2].coins.find(c => c.code === coin.id);

                if (!currCoin) {
                    console.error("Coin data not found for:", coin.id, wallet);
                    return;
                }

                // const price = parseFloat(currCoin.coinDetails.close);
                const price = parseFloat(currCoin.close);

                const newSubtotal = coin.amount * price;
                coin.subtotal = newSubtotal;

                walletTable += `
                    <tr>
                        <td class="coin-data"><img src="${currCoinDto.image}"></img> ${currCoinDto.name}</td>
                        <td>${coin.amount}</td>
                        <td>$${coin.subtotal.toFixed(3)}</td>
                        <td>$${price.toFixed(6)}</td>
                    </tr>`;

                newBalance += newSubtotal;
            });
            globalState.currentUser.balance = newBalance;
            setNewUsers();
            updateBalance();

            $("#wallet-table").html(walletTable);
        }

        function updateTotalValue() {
            let total = balance;
            for (let coin in wallet) {
                const coinPrice = market[market.length - 1].coins.find(c => c.code === coin)?.close || 0;
                total += wallet[coin] * coinPrice;
            }
            $("#total-value").text(`$${total.toFixed(2)}`);
        }

        function updateActionButton() {
            const action = isBuying ? "Buy" : "Sell";
            $("#action-btn").text(`${action} ${coinName}`);
        }

        // Initialize state
        let isBuying = true;

        // Initial setup
        updateWalletTable();
        updateTotalValue();
        updateActionButton();

        /**
         * Handles the buy/sell action when the action button is clicked.
         */
        function handleActionButtonClick() {
            const amount = parseFloat($("#amount").val());

            if (!amount || amount <= 0) {
                alert("Enter a valid amount.");
                return;
            }

            const coinPrice = currentCoin.coinDetails.close;

            if (isBuying) {
                const cost = amount * coinPrice;
                if (cost > globalState.currentUser.assets[0].amount) {
                    alert("Insufficient balance.");
                    return;
                }
                // Update global state
                globalState.currentUser.assets[0].amount -= cost;

                // Check if the asset already exists in the wallet, if not create a new one
                const getIndex = globalState.currentUser.assets.findIndex(asset => asset.id === lastSelectedAssetId);
                if (!globalState.currentUser.assets[getIndex]) {
                    globalState.currentUser.assets.push(new Asset(lastSelectedAssetId, amount, coinPrice));
                }
                else {
                    globalState.currentUser.assets[getIndex].amount += amount;
                    globalState.currentUser.assets[getIndex].subtotal = globalState.currentUser.assets[getIndex].amount * coinPrice;
                }

                // globalState.currentUser.assets[lastSelectedAssetId] = new Asset(lastSelectedAssetId, amount + 1, coinPrice);
            } else {
                const revenue = amount * coinPrice;
                const getIndex = globalState.currentUser.assets.findIndex(asset => asset.id === lastSelectedAssetId);
                if ((globalState.currentUser.assets[getIndex] || 0) < amount) {
                    alert("Insufficient coin balance.");
                    return;
                } else if (globalState.currentUser.assets[getIndex].amount - amount <= 0) {
                    if (globalState.currentUser.assets[getIndex].amount - amount < 0) {
                        alert("You don't have enough coins to sell.");
                        return;
                    }

                    globalState.currentUser.assets[0].amount += revenue;

                    globalState.currentUser.assets[getIndex].amount -= amount;
                    globalState.currentUser.assets[getIndex].subtotal = globalState.currentUser.assets[getIndex].amount * coinPrice;
                    globalState.currentUser.assets.splice(getIndex, 1);
                } else {
                    // Update global state
                    globalState.currentUser.assets[0].amount += revenue;

                    globalState.currentUser.assets[getIndex].amount -= amount;
                    globalState.currentUser.assets[getIndex].subtotal = globalState.currentUser.assets[getIndex].amount * coinPrice;
                }
            }

            wallet = globalState.currentUser.assets

            // Update the UI
            updateWalletTable();
            updateTotalValue();
            updateBalance();

            $("#amount").val("");
            $("#transaction-value").text("");
        }

        function updateBalance() {
            $("#total-money").text(`$${globalState.currentUser.balance.toFixed(2)}`);
        }

        /**
         * Attaches event handlers for the component.
         */
        function attachEventHandlers() {
            // Remove existing handlers to prevent duplication
            $(containerSelector).off("click", "#buy-toggle");
            $(containerSelector).off("click", "#sell-toggle");
            $(containerSelector).off("click", "#action-btn");

            // Handle Buy Toggle
            $(containerSelector).on("click", "#buy-toggle", function () {
                isBuying = true;
                $("#buy-toggle").removeClass("inactive");
                $("#sell-toggle").addClass("inactive");
                $("#action-btn").removeClass("sell-button").addClass("buy-button"); // Change to green
                updateActionButton();
            });

            // Handle Sell Toggle
            $(containerSelector).on("click", "#sell-toggle", function () {
                isBuying = false;
                $("#sell-toggle").removeClass("inactive");
                $("#buy-toggle").addClass("inactive");
                $("#action-btn").removeClass("buy-button").addClass("sell-button"); // Change to red
                updateActionButton();
            });

            // Handle Action Button
            $(containerSelector).on("click", "#action-btn", function (e) {
                e.stopPropagation();
                handleActionButtonClick();
            });

            $("#amount").on("input", function (e) {
                // Get the updated input value
                const value = parseFloat(e.target.value) || 0;

                // Calculate the transaction value and update the UI
                const transactionValue = (value * currentCoin.coinDetails.close).toFixed(2);
                $("#transaction-value").text(`${transactionValue}`);
            });
        }

        // Attach event handlers
        attachEventHandlers();
    }

    return { render };
})();

export default TradingComponent;