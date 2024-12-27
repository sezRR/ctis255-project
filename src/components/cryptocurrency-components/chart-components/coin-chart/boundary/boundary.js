import { injectCSS } from "../../../../../utils/injectCSS.js";
import TemplateCache from "../../../../../utils/templateCache.js";

const BoundaryComponent = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/boundary/boundary.html';
    const cssPath = 'src/components/cryptocurrency-components/chart-components/coin-chart/boundary/boundary.css';

    function validateType(type) {
        if (!type) throw new Error('type is required for boundary component');
        if (type !== 'upper' && type !== 'lower') throw new Error('type must be either upper or lower');
    }

    /**
     * Renders a Boundary component
     * 
     * @param {string} containerSelector - The selector of the container that the boundary will be appended to.
     * @param {string} type - The type of the boundary. It can be either 'upper' or 'lower'.
     * @param {number} price - The price of the boundary.
     */
    function render(containerSelector, type, price) {
        injectCSS(cssPath);
        TemplateCache.getTemplate(htmlPath, function (template) {
            validateType(type);

            template = template.replace('{{type}}', type);

            price = price < 1 ? price.toFixed(6) : price.toFixed(1);
            template = template.replace('{{price}}', price);

            const $template = $(template);
            switch (type) {
                case 'upper':
                    $template.css("top", "-12px");
                    break;
                case 'lower':
                    $template.css("bottom", "-12px");
                    break;
            }

            $(containerSelector).append($template);
        });
    }

    return { render };
})();

export default BoundaryComponent;