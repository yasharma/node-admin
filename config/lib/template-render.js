'use strict';

/**
 * Renders a template string using provided context. Values are marked as {{key}} in the template.
 *
 * @param {String} str Template string
 * @param {Object} options Render options. options.escapeHtml=true escapes html specific characters
 * @param {Object} context Key-value pairs for the template, eg {name: 'User Name'}
 * @return {String} Rendered template
 */
function render(str, options, context) {
    str = (str || '').toString();
    context = context || {};
    options = options || {};

    var re = /\{\{[ ]*([^{}\s]+)[ ]*\}\}/g;

    return str.replace(re, function (match, key) {
        var value;
        if (context.hasOwnProperty(key)) {
            value = context[key].toString();
            if (options.escapeHtml) {
                value = value.replace(/["'&<>]/g, function (char) {
                    switch (char) {
                        case '&':
                            return '&amp;';
                        case '<':
                            return '&lt;';
                        case '>':
                            return '&gt;';
                        case '"':
                            return '&quot;';
                        case '\'':
                            return '&#039;';
                        default:
                            return char;
                    }
                });
            }
            return value;
        }
        return match;
    });
}

module.exports.render = render;