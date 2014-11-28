Cocoon.define("Cocoon.Base" , function(extension){

    function CocoonInitComponents(){
        /**
         * Initialize CocoonJS Components
         */
        $(".tabbed").tabber();
    }

    CocoonInitComponents();

    window.addEventListener("push", function(){
        CocoonInitComponents();
    });

    return extension;

});