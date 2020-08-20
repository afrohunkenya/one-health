import Vue from 'vue'
import VueRouter from 'vue-router'
import Portal from '@/components/Portal.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import AppointmentsCreate from '@/components/AppointmentsCreate.vue'
import AppointmentsEdit from '@/components/AppointmentsEdit.vue'
import PortalCreate from '@/components/PortalCreate.vue'
import PortalView from '@/components/PortalView.vue'
import PortalContactDoctor from '@/components/PortalContactDoctor.vue'
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
        path: '/editappointment',
        name: 'appointments-edit',
        component: AppointmentsEdit
    },
    {
        path: '/createdata',
        name: 'portal-create',
        component: PortalCreate
    },
    {
        path: '/viewdata',
        name: 'portal-view',
        component: PortalView
    },
    {
        path: '/contactdoctor',
        name: 'portal-contact-doctor',
        component: PortalContactDoctor
    }
];

const router = new VueRouter({
    routes
})

export default router
