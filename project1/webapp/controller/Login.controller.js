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
            var username = this.getView().byId("usernameInput").getValue();
            var password = this.getView().byId("passwordInput").getValue();
            sap.ui.core.BusyIndicator.show(0);

            try {
                var response = await fetch('http://localhost:8082/api/validateLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    mode: 'no-cors',
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
        
                if (data.success) {
                    var userModel = new JSONModel({
                        username: data.user.username,  // user object returned by the server in the response.
                        status: data.user.status      // accesses the username property of the user object from the response.
                    });
                    this.getOwnerComponent().setModel(userModel, "userModel");
        
                    MessageBox.success("Login successful!! - User is active", {
                        onClose: function() {
                            var router = this.getOwnerComponent().getRouter();
                            router.navTo("home");  // Ensure "home" is a defined route.
                        }.bind(this)
                    });
                    // || "Login failed"
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
        }
    });
});
