import TemplateCache from "../../../utils/templateCache.js";
import CoinChartComponent from "./coin-chart/coin-chart.js";
import CoinFilterComponent from "./coin-filter/coin-filter.js";

const ChartComposition = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/chart-composition.html';

    /**
     * Renders a Chart Composition component
     * @param {string} containerSelector - The selector of the container that the chart will be appended to.
    */
    async function render(containerSelector) {
        let template = await TemplateCache.getTemplateAsync(htmlPath);
        $(containerSelector).append(template);

        await CoinFilterComponent.render("#coin-filter-container");
        await CoinChartComponent.render("#coin-chart-container");
    }

    return { render };
})();

export default ChartComposition;