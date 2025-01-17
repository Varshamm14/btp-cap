sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, JSONModel) {
    "use strict";
 
    return Controller.extend("project1.controller.Login", {
        onInit: function() {
            var data = new JSONModel({
                username: "",
                password: ""
            });
            this.getView().setModel(data, "loginModel");
            //  console.log("Login Controller initialized");
    
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
        // setInitialModel: function () {
        //     // var obj = {
        //     //  userName:"",
        //     //  password:"",
        //     // };
        //     // this.getView().setModel(new JSONModel(obj), "loginMdl");
          
        //         let oModel = new JSONModel({userName: "Varsh", password: 123456});
        //         this.getView().setModel(oModel, "loginModel");

        // },
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
        
                if (data.success) {
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
        // onPressSaveUser: async function () {
           
        //             let path = "http://localhost:8082/api/validateLogin";
        //             var username = this.getView().byId("usernameInput").getValue();
        //             var password = this.getView().byId("passwordInput").getValue();
        //             let obj={
        //                 username:username,
        //                 password:password
        //             }
        //             let response = await this.restMethodPost(path, obj);
        //             this.getView().setModel(new JSONModel(response), "companyMdl");
        //             that.showLoading(false);
        //             var msg = "Created successfully!";
        //             MessageBox.information(msg, {
        //                 actions: [MessageBox.Action.OK],
        //                 onClose: function (sAction) {
        //                     that.showLoading(false);
        //                     that.getRouter().navTo("userDetail", { id: response.id });
        //                 },
        //             });
        //         }
    });
});
