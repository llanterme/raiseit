var app;

require.config({
	paths: {
	    jQuery: "../kendo/js/jquery.min",
		kendo: "../kendo/js/kendo.mobile.min",
        jlinq: "libs/jlinq"
        
     
	},
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        kendo: {
            exports: "kendo"
        },
        jlinq: {
            exports: "jlinq"
        }
              
    }
});

require(["jQuery", "app"], function($, application) {
    
        console.log('hello')
        app = application
        application.init();
    
});