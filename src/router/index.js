import Vue from 'vue'
import VueRouter from 'vue-router'
import PortalSearch from '@/components/PortalSearch.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import AppointmentsEdit from '@/components/AppointmentsEdit.vue'
import PortalView from '@/components/PortalView.vue'
import PortalContactDoctor from '@/components/PortalContactDoctor.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'portal-search',
        component: PortalSearch
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
        path: '/editappointment',
        name: 'appointments-edit',
        component: AppointmentsEdit
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
