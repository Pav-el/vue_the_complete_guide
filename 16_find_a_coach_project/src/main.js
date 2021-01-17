import { createApp } from "vue";
import store from "./store/index.js";
import App from "./App.vue";
import router from "./router.js";
import BaseCard from "./ui/BaseCard.vue";
import BaseBadge from "./ui/BaseBadge.vue";
import BaseButton from "./ui/BaseButton.vue";

const app = createApp(App);
app.component("BaseCard", BaseCard);
app.component("BaseBadge", BaseBadge);
app.component("BaseButton", BaseButton);
app.use(router);
app.use(store);
app.mount("#app");
