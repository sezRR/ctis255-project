import { injectCSS } from "../../../../utils/injectCSS.js";
import TemplateCache from "../../../../utils/templateCache.js";
import globalState from "../../../../stores/globalState.js";
import { market } from "../../../../assets/data/db.js";
import { convertToDefaultFormat } from "../../../../utils/dateUtil.js";

const HeadingComponent = (function () {
    const htmlPath = "src/components/cryptocurrency-components/days-components/heading/heading.html";
    const cssPath = "src/components/cryptocurrency-components/days-components/heading/heading.css";

    /**
     * Render the heading component
     * @param {string} containerSelector - The selector of the container where the component will be rendered
     */
    async function render(containerSelector) {
        injectCSS(cssPath);

        let template = await TemplateCache.getTemplateAsync(htmlPath);
        template = template.replace("{{day}}", globalState.currentUser.day);
        const date = new Date(convertToDefaultFormat(market[globalState.currentUser.day - 1].date, "-"));

        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        template = template.replace("{{date}}", formattedDate);
        $(containerSelector).append(template);
    }

    function destroy() {
        $("#heading-container").empty();
    }

    return { render, destroy };
})();

export default HeadingComponent;