sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.ProductList", {
        /**
         * Called when the controller is instantiated.
         */
        onInit: function () {
            // Initialize the model with default data
            const oInitialData = {
                name: "",
                description: "",
                status: "" // "Available" or "OutOfStock"
            };

            const oModel = new JSONModel(oInitialData);
            this.getView().setModel(oModel, "itemmdl");
        },

        /**
         * Handles the Save button press.
         */
        onPressSave: function () {
            // Get the bound model data
            const oModel = this.getView().getModel("itemmdl");
            const oData = oModel.getData();

            // Validate required fields
            if (!oData.name || !oData.status) {
                MessageToast.show("Please fill in all required fields (Name and Status).");
                return;
            }

            // Perform save operation
            this._saveToDatabase(oData);
        },

        /**
         * Handles the Cancel button press.
         */
        onPressCancel: function () {
            // Reset the form data
            const oModel = this.getView().getModel("itemmdl");
            oModel.setData({
                name: "",
                description: "",
                status: ""
            });

            MessageToast.show("Changes discarded.");
        },

        /**
         * Simulates saving data to the database via an AJAX call.
         */
        _saveToDatabase: function (oData) {
            // Simulated AJAX call to backend
            $.ajax({
                url: "/api/mafiTrailers", // Replace with your actual backend endpoint
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(oData),
                success: function () {
                    MessageToast.show("Item  saved successfully!");
                },
                error: function () {
                    MessageToast.show("Failed to save item . Please try again.");
                }
            });
        }
    });
});
