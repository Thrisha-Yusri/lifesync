// src/plugins/toastPlugin.js
import { createApp } from "vue";
import GlobalToast from "@/components/templates/Toast.vue";

export default {
  install(app) {
    // Create a new Toast component instance
    const toastInstance = createApp(GlobalToast);
    const component = toastInstance.mount(document.createElement("div"));

    // Append the toast to the body
    document.body.appendChild(component.$el);

    // Add a global `$toast` method to call from any component
    app.config.globalProperties.$toast = (message, duration = 3000, color) => {
      component.showToast(message, duration, color);
    };
  },
};
