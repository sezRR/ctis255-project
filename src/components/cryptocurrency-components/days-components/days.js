import { injectCSS } from "../../../utils/injectCSS.js";
import TemplateCache from "../../../utils/templateCache.js";
import globalState from "../../../stores/globalState.js";
import ButtonComponent from "../../button/button.js";
import HeadingComponent from "./heading/heading.js";
import CoinChartComponent from "../chart-components/coin-chart/coin-chart.js";
import { setNewUsers } from "../../../utils/localStorageUtil.js";
import TradingComponent from "../../../pages/cryptocurrency-page/arda-port/arda-port.js";
import CoinFilterComponent from "../chart-components/coin-filter/coin-filter.js";

const DaysComponent = (function () {
    const htmlPath = "src/components/cryptocurrency-components/days-components/days.html";
    const cssPath = "src/components/cryptocurrency-components/days-components/days.css";

    /**
     * Render the days component
     * @param {string} containerSelector - The selector of the container where the component will be rendered
     */
    async function render(containerSelector) {
        injectCSS(cssPath);

        let template = await TemplateCache.getTemplateAsync(htmlPath);
        $(containerSelector).append(template);

        await HeadingComponent.render("#heading-container");

        ButtonComponent.render({
            containerSelector: "#forward-buttons-container",
            icon: "fa-forward",
            iconGroup: "fa-solid",
            text: "Next Day",
            customCSS: { "width": "16rem" },
            onClick: async () => {
                if (globalState.currentUser.day === 365) return;

                globalState.currentUser.day++
                HeadingComponent.destroy();
                await CoinFilterComponent.updateCoinPerformances();
                await HeadingComponent.render("#heading-container");
                await CoinChartComponent.render("#coin-chart-container");
                await TradingComponent.render("#trading-container")
            }
        })

        ButtonComponent.render({
            containerSelector: "#forward-buttons-container",
            id: "play-button",
            icon: "fa-play",
            iconGroup: "fa-solid",
            text: "Play",
            customCSS: { "width": "16rem" },
            onClick: async () => {
                let isPlaying = false;
                let intervalId;

                const updateButton = () => {
                    if (isPlaying && globalState.currentUser.day < 365) {
                        $("#play-button span").text("Pause");
                        $("#play-button i").removeClass("fa-play").addClass("fa-pause");
                    } else {
                        $("#play-button span").text("Play");
                        $("#play-button i").removeClass("fa-pause").addClass("fa-play");
                    }
                };

                const togglePlayPause = async () => {
                    isPlaying = !isPlaying;
                    updateButton();

                    if (isPlaying && globalState.currentUser.day < 365) {
                        intervalId = setInterval(async () => {
                            globalState.currentUser.day++;
                            if (globalState.currentUser.day === 365) {
                                clearInterval(intervalId);
                                updateButton();
                            }
                            // Update in the local storage
                            setNewUsers()
                            HeadingComponent.destroy();
                            await CoinFilterComponent.updateCoinPerformances();
                            await HeadingComponent.render("#heading-container");
                            await CoinChartComponent.render("#coin-chart-container");

                            // TODO: TEST
                            await TradingComponent.render("#trading-container")
                        }, 100);
                    } else {
                        clearInterval(intervalId);
                    }
                };

                // Initial click to start playing
                togglePlayPause();

                // Update the click handler to toggle play/pause
                $("#play-button").off("click").click(async () => {
                    togglePlayPause();
                });
            }
        });
    }

    return { render };
})();

export default DaysComponent;