/**
 * Project: Information Management Suite (Information_Management_Suite)
 * File: dynamicFormUtiliies.js
 * @description Uses a template to create dynamic form elements
 * @copyright (c) 2013, Ian Ashcroft
 * @author Ian Ashcroft (ianashcroft11@gmail.com)
 * @created 23-Dec-2013 - 13:06:46
 * @version 0.0.1
 */


(function ($) {

    var register = [],
        e = 0,
        a = 0;

    $.fn.dynamicForm = function (action, key, value, options) {

        var messages = $.extend({
                notImplemented: "Error: not yet implemented",
                targetNotExist: "Error: the provided target ID does not exist",
                templateNotExist: "Error: the provided template ID does not exist",
                unknownAction: "Error: unknown action",
                emptyRegister: "Error: the register is empty",
                minimumElements: "Error: already at minimum number of elements"
            }, options),
            settings = $.extend({
                placeholderAttr: ['onclick'],
                placeholder: '_anchor_',
                debug: false,
                silent: true,
                domElements: 'input, select, label',
                domElementAttr: ['for', 'id', 'name'],
                withDataAndEvents: false, /* See jQuery API documentation for description - http://api.jquery.com/clone/ */
                deepWithDataAndEvents: false /* See jQuery API documentation for description - http://api.jquery.com/clone/ */
            }, options);

        /**
         * Manages messages to the console
         * @param {string} message The message to be outpt
         * @return {null}
         */
        function log(message) {
            if (!settings.silent) {
                window.console.log(message);
            }
        }

        /***********************************  Set the register data  ***********************************/
        if (action === "set") {
            if ($(key).length == 0) {
                log(messages.targetNotExist);
            }
            if ($(value).length == 0) {
                log(messages.templateNotExist);
            }
            register[key] = {'id': key, 'template': value, 'counter': 0, 'uid': 0};
            if (settings.debug) {
                log('Assigned template "' + value + '" to "' + key + '" in the register:');
                log(register);
            }
            return this;

        /**********************************  Unset the register data  **********************************/
        } else if (action === "unset") {
            if (!register.hasOwnProperty(key)) {
                log(messages.targetNotExist);
                return this;
            }
            delete register[key];
            if (settings.debug) {
                log('Removed the record for "' + key + '" from the register:');
                log(register);
            }
            return this;

        /*********************************  Initialise the templates  **********************************/
        } else if (action === "init") {
            if (Object.getOwnPropertyNames(register).length > 0) {
                for (e in register) {
                    $(document).dynamicForm('add', register[e].id);
                }
                e = 0;
                if (settings.debug) {
                    log('Added all registered templates');
                    log(register);
                }
            } else {
                log(messages.emptyRegister);
            }
            return this;

        /********************************  Add elements from template  *********************************/
        } else if (action === "add") {
            register[key].counter++;
            register[key].uid++;

            if (register[key].counter == 1) {
                $(register[key].template).clone(settings.withDataAndEvents, settings.deepWithDataAndEvents).find(settings.domElements).each(
                    function () {
                        for (a in settings.domElementAttr) {
                            if ($(this).attr(settings.domElementAttr[a])) {
                                $(this).attr(settings.domElementAttr[a], $(this).attr(settings.domElementAttr[a]).replace(/\d+/, register[key].uid));
                            }
                        }
                        a = 0;
                        for (a in settings.placeholderAttr) {
                            if ($(this).attr(settings.placeholderAttr[a])) {
                                $(this).attr(settings.placeholderAttr[a], $(this).attr(settings.placeholderAttr[a]).replace(settings.placeholder, register[key].id));
                            }
                        }
                        a = 0;
                    }
                ).parents(register[key].template).appendTo(key);
            } else if ($(value).length > 0) {
                $(register[key].template).clone(settings.withDataAndEvents, settings.deepWithDataAndEvents).find(settings.domElements).each(
                    function () {
                        for (a in settings.domElementAttr) {
                            if ($(this).attr(settings.domElementAttr[a])) {
                                $(this).attr(settings.domElementAttr[a], $(this).attr(settings.domElementAttr[a]).replace(/\d+/, register[key].uid));
                            }
                        }
                        a = 0;
                        for (a in settings.placeholderAttr) {
                            if ($(this).attr(settings.placeholderAttr[a])) {
                                $(this).attr(settings.placeholderAttr[a], $(this).attr(settings.placeholderAttr[a]).replace(settings.placeholder, register[key].id));
                            }
                        }
                        a = 0;
                    }
                ).parents(register[key].template).insertAfter($(value).parents(register[key].template));
            }

            if (settings.debug) {
                log('Counter: ' + register[key].counter + ' - uid: ' + register[key].uid);
            }
            return this;

        /***********************************  Remove these elements  ***********************************/
        } else if (action === "remove") {
            if (register[key].counter > 1) {
                register[key].counter--;
                $(value).parents(register[key].template).remove();
                if (settings.debug) {
                    log('Removed instance');
                }
            } else {
                log(messages.minimumElements);
            }
            return this;

        /*************************************  Unknown function  **************************************/
        } else {
            log(messages.unknownAction);
            return this;
        }

    };
}(jQuery));
