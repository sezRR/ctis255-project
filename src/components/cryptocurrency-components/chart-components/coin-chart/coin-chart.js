import { injectCSS } from "../../../../utils/injectCSS.js";
import TemplateCache from "../../../../utils/templateCache.js";
import CandleComponent from "./candle/candle.js";
import CoinDetails from "../../../../models/coins/coinDetails.js";
import { market } from "../../../../assets/data/db.js";
import globalState from "../../../../stores/globalState.js";
import CloseIndicatorComponent from "./close-indicator/close-indicator.js";
import BoundaryComponent from "./boundary/boundary.js";

const CoinChartComponent = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/coin-chart.html';
    const cssPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/coin-chart.css';

    /**
     * Calculates the overall lowerLimit and upperLimit for the currently selected coin
     * based on all days up to globalState.currentUser.day.
     * @returns {{ lowerLimit: number, upperLimit: number }}
     */
    function calculateBoundariesForSelectedCoin() {
        const dayCount = globalState.currentUser.day;

        let minLow = Infinity;
        let maxHigh = -Infinity;

        for (let i = 0; i < dayCount - 1; i++) {
            const coinData = market[i].coins.find(
                coin => coin.code === globalState.currentUser.lastSelectedAssetId
            );
            if (coinData) {
                if (coinData.low < minLow) {
                    minLow = coinData.low;
                }
                if (coinData.high > maxHigh) {
                    maxHigh = coinData.high;
                }
            }
        }

        // Apply multipliers to get final boundaries
        const lowerLimit = minLow * 0.9;
        const upperLimit = maxHigh * 1.1;

        return { lowerLimit, upperLimit };
    }

    /**
     * Renders a Coin Chart component for the current user selection.
     * @param {string} containerSelector - The selector of the container that the coin chart will be appended to.
     */
    async function render(containerSelector) {
        injectCSS(cssPath);

        const { lowerLimit, upperLimit } = calculateBoundariesForSelectedCoin();

        globalState.chartDetails = {
            lowerLimit,
            upperLimit,
            lastClose: 0,
            scale: 1
        };

        const template = await TemplateCache.getTemplateAsync(htmlPath);
        $(containerSelector).html(template);

        const lastDay = globalState.currentUser.day;
        const maxCandles = 120;
        const startDay = Math.max(1, lastDay - (maxCandles - 1));

        for (let i = startDay - 1; i < lastDay - 1; i++) {
            const selectedCoinInfo = market[i].coins.find(
                (coin) => coin.code === globalState.currentUser.lastSelectedAssetId
            );

            const offsetIndex = i - startDay + 1;
            const leftOffset = offsetIndex * 14.5;

            CandleComponent.render({
                containerSelector: "#candles-container",
                day: i + 2,
                id: i,
                coinDetails: new CoinDetails({
                    open: selectedCoinInfo.open,
                    close: selectedCoinInfo.close,
                    high: selectedCoinInfo.high,
                    low: selectedCoinInfo.low
                }),
                lowerLimit: globalState.chartDetails.lowerLimit,
                upperLimit: globalState.chartDetails.upperLimit,
                leftOffset: leftOffset
            });
        }

        BoundaryComponent.render("#indicators-container", "upper", globalState.chartDetails.upperLimit);
        BoundaryComponent.render("#indicators-container", "lower", globalState.chartDetails.lowerLimit);
    }

    return { render };
})();

export default CoinChartComponent;