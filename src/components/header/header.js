import { injectCSS } from "../../utils/injectCSS.js";
import TemplateCache from "../../utils/templateCache.js";
import UserProfileComponent from "./user-profile/user-profile.js";
import globalState from "../../stores/globalState.js";

/**
 * @author Sezer Tetik
 */
const HeaderComponent = (function () {
    const cssPath = 'src/components/header/header.css';
    const htmlPath = 'src/components/header/header.html';

    /**
     * Renders a Header component
     * @param {string} containerSelector - The selector of the container that the header will be appended to.
     * @param {string} title - The title that will be displayed on the header.
     * @param {string} description - The description that will be displayed on the header.
     */
    function render(containerSelector, title, description) {
        injectCSS(cssPath, true);

        TemplateCache.getTemplate(htmlPath, function (template) {
            const html = template
                .replace('{{title}}', title)
                .replace("{{description}}", description);
            $(containerSelector).html(html);

            if (globalState.currentUser)
                UserProfileComponent.render("#user-profile-container");
        });
    }

    return { render };
})();

export default HeaderComponent