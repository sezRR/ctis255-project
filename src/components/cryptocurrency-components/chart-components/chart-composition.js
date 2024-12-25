import TemplateCache from "../../../utils/templateCache.js";
import CoinFilterComponent from "./coin-filter/coin-filter.js";

const ChartComposition = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/chart-composition.html';

    /**
     * Renders a Chart Composition component
     * @param {string} containerSelector - The selector of the container that the chart will be appended to.
    */
    function render(containerSelector) {
        TemplateCache.getTemplate(htmlPath, function (template) {
            $(containerSelector).append(template);
            CoinFilterComponent.render("#coin-filter-container");
        });
    }

    return { render };
})();

export default ChartComposition;