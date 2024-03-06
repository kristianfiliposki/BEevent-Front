import { createRouter, createWebHistory } from 'vue-router';
import AppHomepage from './pages/AppHomepage.vue';
import AppDashboard from './pages/AppDashboard.vue';
import AppRicerca from './pages/AppRicerca.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/home',
        name: 'home',
        component: AppHomepage

    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: AppDashboard
    },
    {
        path: '/ricerca',
        name: 'ricerca',
        component: AppRicerca,
        props: true
    }
    ]


});
export { router };