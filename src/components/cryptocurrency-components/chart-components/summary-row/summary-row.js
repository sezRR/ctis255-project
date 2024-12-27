import { injectCSS } from "../../../../utils/injectCSS.js";
import TemplateCache from "../../../../utils/templateCache.js";
import CoinBadgeComponent from "./coin-badge/coin-badge.js";

const SummaryRowComponent = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/summary-row/summary-row.html';
    const cssPath = 'src/components/cryptocurrency-components/chart-components/summary-row/summary-row.css';

    /**
     * Renders a Summary Row component
     * @param {string} containerSelector - The selector of the container that the summary row will be appended to.
     */
    function render(containerSelector) {
        injectCSS(cssPath);

        TemplateCache.getTemplate(htmlPath, function (template) {
            $(containerSelector).html(template);

            CoinBadgeComponent.render("#coin-badge-content-container");
        });
    }

    return { render };
})();

export default SummaryRowComponent;