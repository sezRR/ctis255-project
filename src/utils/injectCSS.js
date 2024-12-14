function injectCSS(path) {
    if (!$(`link[href="${path}"]`).length) {
        $('<link>')
            .attr('rel', 'stylesheet')
            .attr('href', path)
            .attr('data-dynamic', true)
            .appendTo('head');
    }
}

function removeCSS(path) {
    $(`link[href="${path}"][data-dynamic="true"]`).remove();
}

export { injectCSS, removeCSS };