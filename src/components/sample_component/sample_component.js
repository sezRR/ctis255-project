const CardComponent = (function () {
    /**
     * Renders a Card component.
     * @param {string} containerSelector - The container where the card will be rendered.
     * @param {Object} data - Data to populate the card.
     */
    function render(containerSelector, data) {
        TemplateCache.getTemplate('components/sample_component/sample_component.html', function (template) {
            const html = template
                .replace('{imageUrl}', data.imageUrl)
                .replace('{title}', data.title)
                .replace('{description}', data.description);
            $(containerSelector).append(html);
        });
    }

    return { render };
})();
