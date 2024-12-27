import TemplateCache from "../../utils/templateCache.js"
import ChartComposition from "../../components/cryptocurrency-components/chart-components/chart-composition.js"
import HeaderComponent from "../../components/header/header.js";
import TradingComponent from "../../pages/cryptocurrency-page/arda-port/arda-port.js";
import DaysComponent from "../../components/cryptocurrency-components/days-components/days.js";

const CryptocurrencyPage = (function () {
    async function render() {
        $(document).ready(async () => {
            $("#app").css("height", "max-content");

            let template = await TemplateCache.getTemplateAsync("src/pages/cryptocurrency-page/cryptocurrency-page.html")
            $("#content").html(template);

            // Re-render the header component to update the user profile card,
            // since we do not have state management in this project, we need 
            // to re-render the header component to update the user profile card.
            HeaderComponent.render('#header', 'CTIS', "Crypto Trading Information System"); // TODO: Get the title and description from the config file
            $(document).ready(async () => {
                await ChartComposition.render("#chart-container");
                await DaysComponent.render("#days-container");
                await TradingComponent.render("#trading-container");
            })
        });
    }

    return { render }
})();

export default CryptocurrencyPage