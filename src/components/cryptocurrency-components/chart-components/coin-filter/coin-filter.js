import { injectCSS } from "../../../../utils/injectCSS.js";
import TemplateCache from "../../../../utils/templateCache.js";
import ImageComponent from "../../../image/image.js";
import globalState from "../../../../stores/globalState.js";
import Coin from "../../../../models/coins/coin.js";
import CoinDetails from "../../../../models/coins/coinDetails.js";
import { market } from "../../../../assets/data/db.js";
import SummaryRowComponent from "../summary-row/summary-row.js";
import CoinChartComponent from "../coin-chart/coin-chart.js";
import TradingComponent from "../../../../pages/cryptocurrency-page/arda-port/arda-port.js";

const CoinFilterComponent = (function () {
    const cssPath = 'src/components/cryptocurrency-components/chart-components/coin-filter/coin-filter.css';
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/coin-filter/coin-filter.html';

    async function fetchCoins() {
        return await fetch("src/assets/data/coins.json")
            .then(response => response.json())
            .catch(error => {
                console.error("Error fetching coins:", error);
                throw error;
            });
    }

    function renderImage(coin) {
        return new Promise((resolve) => {
            ImageComponent.render({
                containerSelector: "#coin-filter-content-container",
                id: coin.id,
                source: coin.img,
                alt: coin.name,
                size: "36",
                callback: ({ id }) => {
                    resolve({ coin, id });
                }
            });
        });
    }

    function updateStateAndRenderSummary(newState) {
        globalState.coins = newState;
        SummaryRowComponent.render("#summary-row-container");
    }

    async function handleCoinClick(id) {
        $(`#${globalState.currentUser.lastSelectedAssetId}`).removeClass("selected-coin");
        $(`#${id}`).toggleClass("selected-coin");

        globalState.currentUser.lastSelectedAssetId = id;
        SummaryRowComponent.render("#summary-row-container");

        // Clear & re-render chart
        $("#coin-chart-container").empty();
        await CoinChartComponent.render("#coin-chart-container");

        // Clear & re-render trading component
        $("#trading-container").empty();
        await TradingComponent.render("#trading-container");
    }

    async function updateCoinPerformances() {
        let newState = [];
        let promises = globalState.coins.map(coin => {
            const coinPerformance = market[globalState.currentUser.day - 2].coins.find(c => c.code === coin.id);
            coin.coinDetails = new CoinDetails({
                open: coinPerformance.open,
                high: coinPerformance.high,
                low: coinPerformance.low,
                close: coinPerformance.close,
            });

            newState.push(coin);
        });

        await Promise.all(promises);
        updateStateAndRenderSummary(newState);
    }

    async function render(containerSelector) {
        injectCSS(cssPath);

        let template = await TemplateCache.getTemplateAsync(htmlPath);
        $(containerSelector).append(template);

        let coins = await fetchCoins()
        let newState = [];
        let promises = coins.map(coin => renderImage(coin));

        Promise.all(promises).then(results => {
            results.forEach(({ coin, id }) => {
                const coinPerformance = market[globalState.currentUser.day - 2].coins.find(c => c.code === coin.id);
                newState.push(new Coin({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    image: coin.img,
                    coinDetails: new CoinDetails({
                        open: coinPerformance.open,
                        high: coinPerformance.high,
                        low: coinPerformance.low,
                        close: coinPerformance.close,
                    })
                }));

                if (coin.id === globalState.currentUser.lastSelectedAssetId) {
                    $(`#${id}`).toggleClass("selected-coin");
                }

                $(`#${id}`).click(async () => await handleCoinClick(id));
            });

            updateStateAndRenderSummary(newState);
        });
    }

    return { render, updateCoinPerformances };
})();

export default CoinFilterComponent;