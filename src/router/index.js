import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '@/components/LandingPage.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import AppointmentsCreate from '@/components/AppointmentsCreate.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'landig-page',
        component: LandingPage
    },
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
    },
    {
        path: '/createappointment',
        name: 'appointments-create',
        component: AppointmentsCreate
    }
];

const router = new VueRouter({
    routes
})

export default router
