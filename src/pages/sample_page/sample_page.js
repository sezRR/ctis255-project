import TemplateCache from '../../utils/templateCache.js';

const SamplePage = (function () {
    function render() {
        TemplateCache.getTemplate('src/pages/sample_page/sample_page.html', function (template) {
            $('#app').html(template);
            // initializeComponents();
        });
    }

    return { render };
})();

const SamplePage2 = (function () {
    function render() {
        TemplateCache.getTemplate('src/pages/sample_page/sample_page.html', function (template) {
            $('#app').html(template);
            // initializeComponents();
        });
    }

    return { render };
})();

export default SamplePage;
