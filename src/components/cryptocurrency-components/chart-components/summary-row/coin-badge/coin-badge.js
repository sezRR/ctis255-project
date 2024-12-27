import { injectCSS } from "../../../../../utils/injectCSS.js";
import TemplateCache from "../../../../../utils/templateCache.js";
import globalState from "../../../../../stores/globalState.js";
import ImageComponent from "../../../../image/image.js";

const CoinBadgeComponent = (function () {
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/summary-row/coin-badge/coin-badge.html';
    const cssPath = 'src/components/cryptocurrency-components/chart-components/summary-row/coin-badge/coin-badge.css';

    function render() {
        injectCSS(cssPath);

        TemplateCache.getTemplate(htmlPath, function (template) {
            template = template.replace(
                '{{coinName}}',
                globalState.coins.find(c => c.id === globalState.currentUser.lastSelectedAssetId).name
            );
            $('#coin-badge-container').html(template);

            ImageComponent.render({
                containerSelector: "#coin-badge-content-container",
                source: globalState.coins.find(c => c.id === globalState.currentUser.lastSelectedAssetId).image,
                alt: globalState.coins.find(c => c.id === globalState.currentUser.lastSelectedAssetId).name,
                size: "24",
                addMethod: "prepend"
            })
        });
    }

    return { render };
})();

export default CoinBadgeComponent;