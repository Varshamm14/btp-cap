sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, JSONModel) {
    "use strict";  

    return Controller.extend("project1.controller.Login", {
        onInit: function() {
            var oModel = new JSONModel({
                username: "",
                password: ""
            });
            this.getView().setModel(oModel, "loginModel");
        },

        onShowPassword: function(oEvent) {
            var oSource = oEvent.getSource();
            var oPasswordField = this.getView().byId("passwordInput");

            if (oPasswordField.getType() === "Password") {
                oPasswordField.setType("Text");
                oSource.setIcon("sap-icon://hide");
            } else {
                oPasswordField.setType("Password");
                oSource.setIcon("sap-icon://show");
            }
        },

        onLoginPress: async function() {
            console.log("Login button pressed");
            var oModel = this.getView().getModel("loginModel");
            let oData = oModel.getData();
            var username = oData.username;
            var password = oData.password;
            
                
            // Show busy indicator
            // sap.ui.core.BusyIndicator.show(0);

            try {
                var response = await fetch('http://localhost:8082/api/validateLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                console.log("Response status:", response.status);

                if (!response.ok) {
                    throw new Error("Failed with status: " + response.status);
                }

                // Log the raw response to inspect it
                var data = await response.json();
                console.log("Login response:", data);

                // Check if the 'data' has the expected structure
                if (data && data.success) {
                    // Hide busy indicator
                    // sap.ui.core.BusyIndicator.hide();

                    // Create the user model with user data
                    // const userModel = new JSONModel({
                    //     username:username,
                    //     status:status
                    // });

                    // Set the user model at the component level
                    // this.getOwnerComponent().setModel(userModel, 'userModel');

                    // Show success message
                    MessageBox.success("Login successful!! - User is active", {
                        onClose: function() {
                            const router = this.getOwnerComponent().getRouter();
                            router.navTo("home"); // Ensure "home" is a valid route
                        }.bind(this)
                    });

                } else {
                    // Handle login failure
                    MessageBox.error(data.message || "Unknown error", {
                        title: "Login Failed"
                    });
                    // sap.ui.core.BusyIndicator.hide(); Hide busy indicator on failure
                }
            } catch (error) {
                console.error("Login error:", error);
                // sap.ui.core.BusyIndicator.hide(); Ensure busy indicator is hidden on error
                MessageBox.error("An error occurred during login. Please try again.", {
                    title: "Login Failed"
                });
            }
        }
    });
});
