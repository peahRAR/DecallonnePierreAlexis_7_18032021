//Import
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// Routes

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]