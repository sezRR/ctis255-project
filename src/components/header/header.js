import { injectCSS } from "../../utils/injectCSS.js";
import TemplateCache from "../../utils/templateCache.js";
import ButtonComponent from "../button/button.js";

const HeaderComponent = (function () {
    /**
     * Renders a Header component
     * @param {string} containerSelector - The selector of the container that the header will be appended to.
     * @param {string} title - The title that will be displayed on the header.
     * @param {string} description - The description that will be displayed on the header.
     */
    function render(containerSelector, title, description) {
        injectCSS('src/components/header/header.css');

        TemplateCache.getTemplate('src/components/header/header.html', function (template) {
            const html = template
                .replace('{{title}}', title)
                .replace("{{description}}", description);
            $(containerSelector).append(html);

            ButtonComponent.render({
                containerSelector: '#user-container',
                icon: "fa-user",
                text: "Gül", // TODO: Get the user name from the local storage
                type: "secondary",
            });

            ButtonComponent.render({
                containerSelector: '#user-container',
                icon: 'fa-door-open',
                text: 'Logout',
            });
        });
    }

    return { render };
})();

export default HeaderComponent