/**
* Injects a CSS file into the head of the document
* @param {string} path - The path of the CSS file to be injected
* @param {boolean} inLayout - Indicates if the CSS file is a layout CSS file
*/
function injectCSS(path, inLayout = false) {
    if (!$(`link[href="${path}"]`).length) {
        $('<link>')
            .attr('rel', 'stylesheet')
            .attr('href', path)
            .attr('data-dynamic', true)
            .attr('data-layout', inLayout)
            .appendTo('head');
    }
}

function removeCSS(path) {
    $(`link[href="${path}"][data-dynamic="true"]`).remove();
}

/**
 * Removes all injected CSS files
 * @param {string} exceptAttr - The attribute to exclude from removal
 */
function removeInjectedCSS(exceptAttr = 'data-layout') {
    $(`link[data-dynamic="true"]:not([${exceptAttr}])`).remove();
}

export { injectCSS, removeCSS, removeInjectedCSS };