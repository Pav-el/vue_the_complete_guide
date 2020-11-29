import { createApp } from 'vue';

import App from './App.vue';


const app = createApp(App);

import BaseBadge from "./components/BaseBadge.vue";
import BaseCard from "./components/BaseCard.vue";

app.component('base-badge', BaseBadge);
app.component('base-card', BaseCard);

app.mount('#app');
