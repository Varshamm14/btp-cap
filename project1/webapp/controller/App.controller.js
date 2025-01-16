sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
  "use strict";

  return Controller.extend("project1.controller.App", {
      onInit: function () {
          // Application initialization logic
      },

      getRouter: function () {
          return UIComponent.getRouterFor(this);
      },

      onNavBack: function () {
          window.history.go(-1);
      }
  });
});