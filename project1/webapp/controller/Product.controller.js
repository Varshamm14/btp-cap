sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.Product", {
        onInit: function() {
            // Create sample data
            var oData = {
                
                    products: [
                        { name: "Notebook Basic 15", id: "HT-001", quantity: 10, status:  "Available", price: "20.00" },
                        { name: "ITelO Vault",       id: "HT-002", quantity: 20, status:  "Available", price: "30.00" },
                        { name: "Multi Print",       id: "HT-003", quantity: 0, status:   "Available", price: "25.00" },
                        { name: "Media Keyboard",    id: "HT-004", quantity: 8, status:   "Available", price: "1,570.0" },
                        { name: "Pocket Mouse",      id: "HT-005", quantity: 5, status:   "Available", price: "299.00" },
                        { name: "Smart Office",      id: "HT-006", quantity: 10, status:  "Available", price: "2,299.00" },
                        { name: "USB Stick",         id: "HT-007", quantity: 15, status: "Out of Stock", price: "1,499.00" }
                    ]
                };
            // Create JSON model
            var oModel = new JSONModel(oData);
            
            // Set model to view
            this.getView().setModel(oModel);
        },

        onNavBack: function() {
            var router = this.getOwnerComponent().getRouter();
            router.navTo("home");
        },
        onProductCategoryPress: function() {
            var router = this.getOwnerComponent().getRouter();
            router.navTo("productcategory");
        }
    });
});