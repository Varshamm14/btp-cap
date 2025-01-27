sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("project1.controller.Categories", {

        onCategorySelect: function(oEvent) {
            // Get the selected category text
            var sCategory = oEvent.getSource().getText();
            console.log("Selected category: " + sCategory);

            // Navigate to the ProductList page, passing the category as a parameter
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("productlist", {
                category: sCategory
            });
        }
    });
});
