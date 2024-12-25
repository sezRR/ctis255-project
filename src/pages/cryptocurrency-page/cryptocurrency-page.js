import TemplateCache from "../../utils/templateCache.js"
import ChartComposition from "../../components/cryptocurrency-components/chart-components/chart-composition.js"
import HeaderComponent from "../../components/header/header.js";

const CryptocurrencyPage = (function () {
    function render() {
        TemplateCache.getTemplate("src/pages/cryptocurrency-page/cryptocurrency-page.html", function (template) {
            $("#content").html(template);

            // Re-render the header component to update the user profile card,
            // since we do not have state management in this project, we need 
            // to re-render the header component to update the user profile card.
            HeaderComponent.render('#header', 'CTIS', "Crypto Trading Information System"); // TODO: Get the title and description from the config file

            ChartComposition.render("#chart-container");
        })
    }

    return { render }
})();

export default CryptocurrencyPage