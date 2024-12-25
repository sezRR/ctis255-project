import { injectCSS, removeInjectedCSS } from "../../../utils/injectCSS.js";
import TemplateCache from "../../../utils/templateCache.js";
import ButtonComponent from "../../button/button.js";
import ProfilesPage from "../../../pages/profiles-page/profiles-page.js";
import globalState from "../../../stores/globalState.js";

/**
 * @author Sezer Tetik
 */
const UserProfileComponent = (function () {
    const cssPath = 'src/components/header/user-profile/user-profile.css';
    const htmlPath = 'src/components/header/user-profile/user-profile.html';

    /**
     * Renders a User Profile component
     * @param {string} containerSelector - The selector of the container that the user profile will be appended to.
     */
    function render(containerSelector) {
        injectCSS(cssPath);

        TemplateCache.getTemplate(htmlPath, function (template) {
            const user = { name: globalState.currentUser.name };
            if (user === undefined)
                throw new Error("User is required to render the User Profile component");

            $(containerSelector).html(template);

            ButtonComponent.render({
                containerSelector: '#user-profile-content-container',
                icon: "fa-user",
                text: user.name,
                type: "secondary",
            });

            ButtonComponent.render({
                containerSelector: '#user-profile-content-container',
                icon: 'fa-door-open',
                text: 'Logout',
                onClick: function () {
                    ProfilesPage.render()

                    // Destroy the User Profile component
                    destroy(containerSelector);
                }
            });
        });
    }

    function destroy(containerSelector) {
        $(containerSelector).empty(); // Remove component from DOM
        removeInjectedCSS() // Remove the injected CSS files
    }

    return { render };
})();

export default UserProfileComponent;