import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
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
];

const router = new VueRouter({
    routes
})

export default router
