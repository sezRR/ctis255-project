import { injectCSS } from "../../../../../utils/injectCSS.js";
import TemplateCache from "../../../../../utils/templateCache.js";
import globalState from "../../../../../stores/globalState.js";
import ChartDetails from "../../../../../models/chartDetails.js";
import { market } from "../../../../../assets/data/db.js";
import CloseIndicatorComponent from "../close-indicator/close-indicator.js";

const CandleComponent = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/candle/candle.html';
    const cssPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/candle/candle.css';

    /**
     * Renders a Candle component
     * @param {string} containerSelector - The selector of the container that the candle will be appended to.
     * @param {string} id - The id of the candle.
     * @param {CoinDetails} coinDetails - The details of the coin that the candle will represent.
     * @param {number} lowerLimit - The lower limit of the candle.
     * @param {number} upperLimit - The upper limit of the candle.
     * @param {number} leftOffset - The left offset of the candle.
     * @param {number} day - The day of the candle.
     */
    function render({ containerSelector, id, coinDetails, lowerLimit, upperLimit, leftOffset, day }) {
        if (id === undefined) throw new Error('id is required for candle component');
        if (day === undefined) throw new Error('day is required for candle component');

        // Check if the css is already injected
        if (!$(`link[href="${cssPath}"]`).length)
            injectCSS(cssPath);

        TemplateCache.getTemplate(htmlPath, function (template) {
            template = template.replaceAll('{{id}}', id);
            $(containerSelector).append(template);

            // const containerHeight = $(containerSelector).height();
            const containerHeight = 285;
            const priceRange = upperLimit - lowerLimit;
            const scale = containerHeight / priceRange;

            // Calculate bottom position and height
            const bottom = (Math.min(coinDetails.close, coinDetails.open) - lowerLimit) * scale;
            const height = (Math.abs(coinDetails.open - coinDetails.close)) * scale;

            $(`#candle-container-${id}`).css({
                "left": leftOffset,
                'bottom': `${bottom}px`,
                'height': `${height}px`,
                'background-color': coinDetails.open > coinDetails.close ? 'red' : 'green'
            });

            // const localLeftOffset = $(`#candle-container-${id}`).width() / 2 - 0.5
            $(`#candle-indicator-${id}`).css({
                "left": leftOffset + 5 + "px",
                'height': (coinDetails.high - coinDetails.low) * scale,
                'bottom': (coinDetails.low - lowerLimit) * scale
            })

            // Update global state lastClose with the last close price
            globalState.chartDetails = new ChartDetails(scale, lowerLimit, upperLimit, coinDetails.close);

            // with mouse enter event for #candle-container-${id} or #candle-indicator-${id}
            $(`#candle-container-${id}`).on('mouseenter', function () {
                $(".coin-performance").css("display", "block");
                $(".coin-performance").text(`Date: ${market[day - 2].date} Open: $${coinDetails.open} Close: $${coinDetails.close} High: $${coinDetails.high} Low: $${coinDetails.low}`)
            }).on('mouseleave', function () {
                $(".coin-performance").css("display", "none");
            });

            CloseIndicatorComponent.render({
                containerSelector: "#indicators-container",
            });
        });
    }

    return { render };
})();

export default CandleComponent;