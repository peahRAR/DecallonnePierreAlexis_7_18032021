import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
}).$mount('#app');