import Vue from 'vue'
import VueRouter from 'vue-router'
import Portal from '@/components/Portal.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import AppointmentsCreate from '@/components/AppointmentsCreate.vue'
import PortalCreate from '@/components/PortalCreate.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'portal',
        component: Portal
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
    },
    {
        path: '/createdata',
        name: 'portal-create',
        component: PortalCreate
    }
];

const router = new VueRouter({
    routes
})

export default router
