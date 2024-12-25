import { injectCSS } from "../../utils/injectCSS.js";
import TemplateCache from "../../utils/templateCache.js";

const ImageComponent = (function () {
    const cssPath = "src/components/image/image.css";
    const htmlPath = "src/components/image/image.html";

    /**
    * Renders the image component.
    * @param {string} containerSelector - The selector of the container that the image will be appended to.
    * @param {string} id - The id of the image.
    * @param {string} customClasses - The custom classes of the image.
    * @param {string} source - The source of the image.
    * @param {string} alt - The alt text of the image.
    * @param {string} size - The size of the image. (for 1:1 aspect ratio, size = width = height in terms of px)
    * @param {function} callback - The callback function that will be called after the image is rendered.
    */
    function render({ containerSelector, customClasses, source, size, alt = "Image", id = undefined, callback = undefined }) {
        injectCSS(cssPath);
        TemplateCache.getTemplate(htmlPath, function (template) {
            const image = $(template);

            id && image.attr("id", id);

            image.attr("src", source);
            image.attr("alt", alt);

            customClasses && image.addClass(customClasses);

            size && (
                image.css("width", `${size}px`),
                image.css("height", `${size}px`)
            )

            $(containerSelector).append(image);

            callback && callback({ id, source, alt, size });
        });
    }

    return { render };
})();

export default ImageComponent;