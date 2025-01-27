sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("project1.controller.ProductCategory", {
        onNavigateToCategories: function () {
            // Navigate to the Product Categories page
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("category");
        },
        onNavBack: function() {
            var router = this.getOwnerComponent().getRouter();
            router.navTo("product");
        }
    });
});
