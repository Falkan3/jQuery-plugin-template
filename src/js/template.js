/*
 *  Plugin template - v0.0.1
 *  A plugin template
 *
 *  Made by Adam Kocić (Falkan3)
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    const pluginName = "Template",
        pluginNameLower = pluginName.toLowerCase(),
        objPrefix = 'template--',

        defaults = {
            elements: {

            },
            callbacks: {
                onInit () {}
            }
        };
    let objThis = null;

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        objThis = this;

        //dynamic vars
        this.html = $('html');

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        //if(jQuery.fn.pluginName) {...} - check for functions from other plugins (dependencies)

        init () {

            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example bellow
            this.initElement();

            // On Init callback
            if(this.settings.callbacks.onInit && $.isFunction(this.settings.callbacks.onInit)) {
                this.settings.callbacks.onInit.call(this);
            }
        },

        /*
         * Main function for initializing
         */
        initElement () {
            this.initElement_GenerateDefaults();

            //find references
        },

        /*
         * Set default values of settings if not specified
         */
        initElement_GenerateDefaults () {

        },

        /* ------------------------------ HELPERS ------------------------------- */

        Log (message) {
            console.log('*** ' + pluginName + ' ***');

            if(message instanceof Array) {
                for (let value of message) {
                    console.log(value);
                }
            } else {
                console.log(message);
            }
        },

        /*
         * Sort an array containing DOM elements by their position in the document (top to bottom)
         */
        objSortByPositionInDOM (input, attr, attr2) {
            //sort by position in DOM
            let _input = input;
            let output;
            if(attr && attr2) {
                output = _input.sort(function (a, b) {
                    if (a[attr][attr2][0] === b[attr][attr2][0]) return 0;
                    if (!a[attr][attr2][0].compareDocumentPosition) {
                        // support for IE8 and below
                        return a[attr][attr2][0].sourceIndex - b[attr][attr2][0].sourceIndex;
                    }
                    if (a[attr][attr2][0].compareDocumentPosition(b[attr][attr2][0]) & 2) {
                        // b comes before a
                        return 1;
                    }
                    return -1;
                });
            }
            else if (attr) {
                output = _input.sort(function (a, b) {
                    if (a[attr][0] === b[attr][0]) return 0;
                    if (!a[attr][0].compareDocumentPosition) {
                        // support for IE8 and below
                        return a[attr][0].sourceIndex - b[attr][0].sourceIndex;
                    }
                    if (a[attr][0].compareDocumentPosition(b[attr][0]) & 2) {
                        // b comes before a
                        return 1;
                    }
                    return -1;
                });
            } else {
                output = _input.sort(function (a, b) {
                    if (a[0] === b[0]) return 0;
                    if (!a[0].compareDocumentPosition) {
                        // support for IE8 and below
                        return a[0].sourceIndex - b[0].sourceIndex;
                    }
                    if (a[0].compareDocumentPosition(b[0]) & 2) {
                        // b comes before a
                        return 1;
                    }
                    return -1;
                });
            }

            return output;
        },
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        let instances = [];

        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                const instance = new Plugin(this, options);
                $.data(this, "plugin_" +
                    pluginName, instance);
                instances.push(instance);
            }

            // Make it possible to access methods from public.
            // e.g `$element.plugin('method');`
            if (typeof options === 'string') {
                const args = Array.prototype.slice.call(arguments, 1);
                data[options].apply(data, args);
            }
        });

        if (instances.length === 1) {
            return instances[0];
        }

        return null
    };

})(jQuery, window, document);