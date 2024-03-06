import { createRouter, createWebHistory } from 'vue-router';
import AppHomepage from './pages/AppHomepage.vue';
import AppDashboard from './pages/AppDashboard.vue';
import AppRicerca from './pages/AppRicerca.vue';
import AppDetail from './pages/App.Detail.vue';

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
        component: AppRicerca
    },
    {
        path:'/detail/:id',
        name: 'detail',
        component: AppDetail,
        props: true
        }
    ]


});
export { router };