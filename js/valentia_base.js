Valentia.define("Valentia.Base" , function(extension){

    function ValentiaInitComponents(){
        /**
         * Initialize CocoonJS Components
         */
        $(".tabbed").tabber();
        $.shifter();
    }

    ValentiaInitComponents();

    window.addEventListener("push", function(){
        ValentiaInitComponents();
    });

    return extension;

});