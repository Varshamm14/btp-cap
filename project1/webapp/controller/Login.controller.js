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
           
           
            console.log("Login Controller initialized");
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
            var username = this.getView().byId("userInput").getValue();
            var password = this.getView().byId("passwordInput").getValue();
            
            sap.ui.core.BusyIndicator.show(0);
        
            try {
                var response = await fetch('http://localhost:8080/api/validateLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });
        
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error("Failed with status: " + response.status);
                }
        
                var data = await response.json();
                console.log("Login response:", data);
                sap.ui.core.BusyIndicator.hide();
        
                if (datad.success) {
                    var userModel = new JSONModel({
                        username: data.user.username,
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
            } catch (error) {
                console.error("Login error:", error);
                sap.ui.core.BusyIndicator.hide();
        
                MessageBox.error("An error occurred during login. Please try again.", {
                    title: "Login Failed"
                });
            }
        },
        
    });
});
