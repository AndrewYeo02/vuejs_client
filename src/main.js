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
const ViewLogbooks = require('./assets/js/components/view-logbooks.vue');
const ViewTasks = require('./assets/js/components/view-tasks.vue');
const EditLogbooks = require('./assets/js/components/edit-logbooks.vue');
const ViewLogbook = require('./assets/js/components/view-logbook.vue');




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
    },
    {
        name: 'view_logbooks',
        path:'/trainees/logbooks',
        component: ViewLogbooks
    },
    {
        name: 'edit_logbooks',
        path:'/logbooks/edit/:id',
        component: EditLogbooks
    },
    {
        name: 'view_logbook',
        path:'/trainees/logbook',
        component: ViewLogbook
    },
    {
        name: 'view_tasks',
        path:'/trainees/tasks',
        component: ViewTasks
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');