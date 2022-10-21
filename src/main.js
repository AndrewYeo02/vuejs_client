import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

const AllTrainees = require('./assets/js/components/all-trainees.vue');
const CreateTrainee = require('./assets/js/components/create-trainee.vue');
const editTrainee = require('./assets/js/components/edit-trainee.vue');
const DeleteTrainee = require('./assets/js/components/delete-trainee.vue');

const routes = [
    {
        name: 'all_trainees',
        path: '/',
        component: AllTrainees
    },
    {
        name: 'create_trainee',
        path: '/trainees/create',
        component: CreateTrainee
    },
    {
        name: 'edit_trainee',
        path: '/trainees/edit/:id',
        component: editTrainee
    },
    {
        name: 'delete_trainee',
        path: '/trainees/delete/:id',
        component: DeleteTrainee
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');