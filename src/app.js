import HeaderComponent from "./components/header/header.js";
import TemplateCache from "./utils/templateCache.js";

$(document).ready(function () {
    // Initialize the Dashboard View
    // SamplePage.render();
    TemplateCache.getTemplate("src/layouts/desktop-layout.html", function (template) {
        $("#root").html(template)

        // Initialize the Header Component
        HeaderComponent.render('#header', 'CTIS', "Crypto Trading Information System"); // TODO: Get the title and description from the config file
    })
});