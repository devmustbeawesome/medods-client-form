import Vue from "vue";
import App from "./App.vue";
import "./assets/base.css";
import ui from "@/components/ui";
import directives from "@/directives";
ui.forEach((component) => {
  Vue.component(component.name, component);
});
directives.forEach((directive) => {
  Vue.directive(directive.name, directive);
});
Vue.use((Vue) => {
  // Assign a unique id to each component
  let uidCounter = 0;
  Vue.mixin({
    beforeCreate: function () {
      this.uidCounter = uidCounter.toString();
      uidCounter += 1;
    },
  });

  // Generate a component-scoped id
  Vue.prototype.$id = function (id) {
    return "uid-" + this.uidCounter + "-" + id;
  };
});
new Vue({
  render: (h) => h(App),
}).$mount("#app");
