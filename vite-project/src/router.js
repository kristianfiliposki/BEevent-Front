import { createRouter, createWebHistory } from 'vue-router';
import AppHomepage from './pages/AppHomepage.vue';
import AppDashboard from './pages/AppDashboard.vue';

const router = createRouter({
history:createWebHistory(),
routes:[{
    path:'/',
    name:'home',
    component:AppHomepage

},
{
        path:'/',
        name:'Dashboard',
        component:AppDashboard
}
]


});
export {router};