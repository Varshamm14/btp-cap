sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("project1.controller.Home", {
        onNavBack: function() {
            var router = this.getOwnerComponent().getRouter();
            router.navTo("login");
        },
        
        onProductPress: function() {
            var router = this.getOwnerComponent().getRouter();
            router.navTo("product");
        },
        
    });
});