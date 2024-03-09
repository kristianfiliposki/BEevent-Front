import { createRouter, createWebHistory } from 'vue-router';
import AppHomepage from './pages/AppHomepage.vue';
import AppDashboard from './pages/AppDashboard.vue';
import AppRicerca from './pages/AppRicerca.vue';
import AppDetail from './pages/App.Detail.vue';
import AppWelcome from './pages/AppWelcome.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: AppHomepage

    },
    {
        path: '/welcome',
        name: 'welcome',
        component: AppWelcome
    },
    {
        path: '/ricerca',
        name: 'ricerca',
        component: AppRicerca,
        props: (route) => ({ specialization: route.query.specialization }),
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: AppDetail,
        props: true
    }
    ]


});
export { router };