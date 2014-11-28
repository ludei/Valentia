/**
 * @fileOverview
 *
 */
(function () {

    /**
     *
     */
    Valentia = window.Valentia ? window.Valentia : {};

    /**
     * This function is used to create extensions in the global namespace of the "Valentia" object.
     * @memberOf Valentia
     * @private
     * @static
     * @example
     */
    Valentia.define = function(extName, ext){

        var namespace = (extName.substring(0,9) == "Valentia.") ? extName.substr(9) : extName;

        var base    = window.Valentia;
        var parts  = namespace.split(".");
        var object = base;

        for(var i = 0; i < parts.length; i++) {
            var part = parts[i];
            object = object[part] = (i == (parts.length - 1)) ? ext( (object[part] || {}) ) : {};
            if(!object) {
                throw "Unable to create class " + extName;
            }
        }

        return true;
    }
})();

Valentia.define("Valentia.Signal" , function(extension){
    "use strict";

    extension.createSignal = function(){

        this.handle = null;
        this.signals = {};

        this.register = function(namespace, handle){

            if( (!namespace) && (!handle)) throw new Error("Can't create signal " + (namespace || ""));

            if(handle.addEventListener){
                this.signals[namespace] = handle;
                return true;
            }

            if(!handle.addEventListener){
                this.signals[namespace] = {};
                for (var prop in handle) {
                    if(handle.hasOwnProperty(prop)){
                        this.signals[namespace][prop] = handle[prop];
                    }
                };
                return true;
            }

            throw new Error("Can't create handler for " + namespace + " signal.");
            return false;
        },


            this.expose = function(){
                return function(signal, callback, params){
                    var once = false;

                    if(arguments.length === 1){
                        var that = this;
                        var fnc = function(signal){
                            this.signal = signal;
                        }

                        fnc.prototype.remove = function(functionListener){
                            var handle = that.signals[this.signal];
                            if(handle && handle.removeEventListener) {
                                handle.removeEventListener.apply(that,[functionListener]);
                                that.signals[this.signal] = undefined;
                            }
                        }
                        return new fnc(signal);
                    }

                    if((params) && (params.once)){
                        once = true;
                    }

                    if(!this.signals[signal]) throw new Error("The signal " + signal + " does not exists.");
                    var handle = this.signals[signal];
                    if(handle.addEventListener){
                        if(once){
                            handle.addEventListenerOnce(function(){
                                callback.apply( this || window , arguments);
                            });
                        }else{
                            handle.addEventListener(function(){
                                callback.apply( this || window , arguments);
                            });
                        }
                    }

                    if(!this.signals[signal].addEventListener){
                        for (var prop in this.signals[signal]) {

                            if(!this.signals[signal].hasOwnProperty(prop)) continue;

                            var handle = this.signals[signal][prop];

                            if(once){
                                handle.addEventListenerOnce(function(){
                                    this.clbk[this.name].apply( this || window , arguments);
                                }.bind({ name : prop , clbk : callback }));
                            }else{
                                handle.addEventListener(function(){
                                    this.clbk[this.name].apply( this || window , arguments);
                                }.bind({ name : prop , clbk : callback }));
                            }

                        }
                    }

                }.bind(this);
            }
    }

    return extension;

});