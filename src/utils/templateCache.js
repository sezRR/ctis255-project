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

    /**
     * Retrieves a template from the cache or loads it via AJAX.
     * @param {string} path - Path to the template.
     * @returns {Promise<string>} A promise that resolves to the loaded template.
     */
    function getTemplateAsync(path) {
        return new Promise((resolve, reject) => {
            if (cache[path]) {
                resolve(cache[path]);
            } else {
                $.get(path)
                    .done(function (data) {
                        cache[path] = data;
                        resolve(data);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        reject(new Error(`Failed to load template: ${textStatus}, ${errorThrown}`));
                    });
            }
        });
    }

    return { getTemplate, getTemplateAsync };
})();

export default TemplateCache;
