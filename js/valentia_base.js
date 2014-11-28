Valentia.define("Valentia.Base" , function(extension){

    function ValentiaInitComponents(){
        /**
         * Initialize CocoonJS Components
         */

        // TABS
        $(".tabbed").tabber();

        // Aside menu
        $.shifter();

        // Profile widget
        $(".profile").each(function(){
            var el = $(arguments[1]);
            el.wallpaper( { source: el.attr("data-background") } );
        });
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        ValentiaInitComponents();
    });

    window.addEventListener("push", function(){
        ValentiaInitComponents();
    });

    return extension;

});