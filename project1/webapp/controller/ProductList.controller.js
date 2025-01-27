sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.ProductList", {

        onInit: function () {
            // Get router and attach route matched event
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("productlist").attachPatternMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            var sCategory = oEvent.getParameter("arguments").category;
            console.log("Category selected: " + sCategory);

            // Assume you have the products data in a model
            var oModel = this.getView().getModel(); // Assuming you have a global model
            var aAllProducts = oModel.getData().products; // All products in the model

            // Filter the products based on the selected category
            var aFilteredProducts = aAllProducts.filter(function (product) {
                return product.category === sCategory;
            });

            // Set filtered products to the view's model
            this.getView().setModel(new sap.ui.model.json.JSONModel({ products: aFilteredProducts }));

            // Optionally, you can store the selected category in the model so you can reference it later
            this.getView().getModel().setProperty("/category", sCategory);
        }
    });
});
