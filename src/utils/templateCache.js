const TemplateCache = (function () {
    const cache = {};

    /**
     * Retrieves a template from the cache or loads it via AJAX.
     * @param {string} path - Path to the template.
     * @param {function} callback - Callback to handle the loaded template.
     */
    function getTemplate(path, callback) {
        if (cache[path]) {
            callback(cache[path]);
        } else {
            $.get(path, function (data) {
                cache[path] = data;
                callback(data);
            });
        }
    }

    return { getTemplate };
})();

export default TemplateCache;
