sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.Login", {
        onInit: function() {
            // Initialize the model for binding
            var oModel = new JSONModel({
                username: "",
                password: ""
            });
            this.getView().setModel(oModel, "loginModel");
            
            // Add console log to verify initialization
            console.log("Login Controller initialized");
        },

        // Toggle password visibility
        onShowPassword: function(oEvent) {
            var oSource = oEvent.getSource(); // Button clicked to toggle password visibility
            var oPasswordField = this.getView().byId("passwordInput"); // The password input field
            
            // Toggle between showing password (Text type) and hiding it (Password type)
            if (oPasswordField.getType() === "Password") {
                oPasswordField.setType("Text"); // Show the password
                oSource.setIcon("sap-icon://hide"); // Change icon to 'hide'
            } else {
                oPasswordField.setType("Password"); // Hide the password
                oSource.setIcon("sap-icon://show"); // Change icon to 'show'
            }
        },
        onLoginPress: function() {
            var username = this.getView().byId("userInput").getValue();
            var password = this.getView().byId("passwordInput").getValue();
         
            sap.ui.core.BusyIndicator.show(0);
        
            fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => {
                console.log("Response status:", response.status);
                return response.json();
            })
            .then(data => {
                console.log("Login response:", data);
                sap.ui.core.BusyIndicator.hide();
        
                if (data.success) {
                    // Store user data in model
                    var userModel = new JSONModel({
                        username: data.user.username,  
                        //typically an object containing the response data from a backend API or server request. 
                        // refers to a property of the data object, which is expected to contain an object representing user-related information.
                        // This is accessing the username property of the user object inside data. It is likely a string that represents the username of the user
                        status: data.user.status
                    });
                    this.getOwnerComponent().setModel(userModel, "userModel");
        
                    MessageBox.success("Login successful!! - User is active", {
                        onClose: function() {
                            var router = this.getOwnerComponent().getRouter();
                            router.navTo("home");
                        }.bind(this)
                    });
                } else {
                    MessageBox.error(data.message, {
                        title: "Login Failed"
                    });
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                sap.ui.core.BusyIndicator.hide();
        
                MessageBox.error("An error occurred during login. Please try again.", {
                    title: "Login Failed"
                });
            });
        },

        onUsernameChange: function(oEvent) {
            var input = oEvent.getSource();
            if (input.getValue()) {
                input.setValueState("None");
            }
        },

        onPasswordChange: function(oEvent) {
            var input = oEvent.getSource();
            if (input.getValue()) {
                input.setValueState("None");
            }
        }
    });
});