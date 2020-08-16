import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/signup',
        name: 'sign-up',
        component: SignUp
    },
    {
        path: '/login',
        name: 'log-in',
        component: LogIn
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    }
];

const router = new VueRouter({
    routes
})

export default router
