import Vue from "vue";
import App from "./App.vue";
import "./assets/base.css";
import ui from "@/components/ui";

ui.forEach((component) => {
  Vue.component(component.name, component);
});
new Vue({
  render: (h) => h(App),
}).$mount("#app");
