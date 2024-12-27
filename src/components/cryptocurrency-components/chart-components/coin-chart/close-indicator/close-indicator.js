import { injectCSS } from "../../../../../utils/injectCSS.js";
import TemplateCache from "../../../../../utils/templateCache.js";
import globalState from "../../../../../stores/globalState.js";

const CloseIndicatorComponent = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/close-indicator/close-indicator.html';
    const cssPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/close-indicator/close-indicator.css';

    /**
     * Renders a Close Indicator component
     * @param {string} containerSelector - The selector of the container that the close indicator will be appended to.
     */
    function render({ containerSelector }) {
        injectCSS(cssPath);
        TemplateCache.getTemplate(htmlPath, function (template) {
            const chartDetails = globalState.chartDetails;
            const bottom = (chartDetails.lastClose - chartDetails.lowerLimit) * chartDetails.scale;

            if ($('#close-price-indicator').length) {
                $('#close-price-indicator').css('bottom', `${bottom}px`);
                $('#close-price-indicator #close-price').text(`$${chartDetails.lastClose}`);
            } else {
                const $template = $(template);
                $template.css('bottom', `${bottom}px`);
                $template.find('#close-price').text(`$${chartDetails.lastClose}`);
                $(containerSelector).append($template);
            }
        });
    }

    function destroy() {
        $('#indicators-container').remove();
    }

    return { render, destroy };
})();

export default CloseIndicatorComponent;