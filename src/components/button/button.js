import { injectCSS } from "../../utils/injectCSS.js";
import TemplateCache from "../../utils/templateCache.js";

/**
 * @author Sezer Tetik
 */
const ButtonComponent = (function () {
    /**
     * Renders a Button component
     * @param {string} containerSelector - The selector of the container that the button will be appended to.
     * @param {icon} icon - The icon that will be displayed on the button.
     * @param {iconGroup} iconGroup - The icon group that the icon belongs to. Default is "fa-solid".
     * @param {string} text - The text that will be displayed on the button.
     * @param {string} type - The type of the button. Default is "primary". Other options are "secondary".
     */
    function render({
        containerSelector,
        icon,
        iconGroup = 'fa-solid',
        text,
        type = 'primary',
    }) {
        injectCSS('src/components/button/button.css');

        TemplateCache.getTemplate('src/components/button/button.html', function (template) {
            const html = template
                .replace('{{iconGroup}}', iconGroup)
                .replace('{{iconName}}', icon)
                .replace('{{text}}', text)
                .replace('{{type}}', type);
            $(containerSelector).append(html);
        });
    }

    // /**
    //  * Destroys the Card component.
    //  * @param {string} containerSelector - The container where the card is rendered.
    //  */
    // function destroy(containerSelector) {
    //     $(containerSelector).empty(); // Remove component from DOM
    //     removeCSS(cssPath); // Remove the injected CSS
    // }

    return { render/*, destroy*/ };
})();

export default ButtonComponent;