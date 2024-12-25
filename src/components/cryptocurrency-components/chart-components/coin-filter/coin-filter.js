import { injectCSS } from "../../../../utils/injectCSS.js";
import TemplateCache from "../../../../utils/templateCache.js";
import ImageComponent from "../../../image/image.js";
import globalState from "../../../../stores/globalState.js";

const CoinFilterComponent = (function () {
    const cssPath = 'src/components/cryptocurrency-components/chart-components/coin-filter/coin-filter.css';
    const htmlPath = 'src/components/cryptocurrency-components/chart-components/coin-filter/coin-filter.html';

    function render(containerSelector) {
        injectCSS(cssPath);

        TemplateCache.getTemplate(htmlPath, function (template) {
            $(containerSelector).append(template);
            fetch("src/assets/data/coins.json")
                .then(response => response.json())
                .then(coins => {
                    for (const coin of coins) {
                        ImageComponent.render({
                            containerSelector: "#coin-filter-content-container",
                            id: coin.id,
                            source: coin.img,
                            alt: coin.name,
                            size: "36",
                            callback: ({ id }) => {
                                if (coin.id === globalState.currentUser.lastSelectedAssetId)
                                    $(`#${id}`).toggleClass("selected-coin");

                                $(`#${id}`).click(function () {
                                    // Smooth transition
                                    $(`#${globalState.currentUser.lastSelectedAssetId}`).removeClass("selected-coin");
                                    $(this).toggleClass("selected-coin");
                                    globalState.currentUser.lastSelectedAssetId = id;
                                });
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching coins:", error);
                });

        });
    }

    return { render };
})();

export default CoinFilterComponent;