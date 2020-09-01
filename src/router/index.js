import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import AppointmentsEdit from '@/components/AppointmentsEdit.vue'
import PortalSearch from '@/components/PortalSearch.vue'
import PortalView from '@/components/PortalView.vue'
import PortalDocContactDoc from '@/components/PortalDocContactDoc.vue'
import PortalEditPersonal from '@/components/PortalEditPersonal.vue'
import StatsView from '@/components/StatsView.vue'
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
        path: '/editdata',
        name: 'portal-edit-personal',
        component: PortalEditPersonal
    },
    {
        path: '/contactdoctor',
        name: 'portal-doc-contact-doc',
        component: PortalDocContactDoc
    },
    {
        path: '/stats',
        name: 'stats-view',
        component: StatsView
    }
];

const router = new VueRouter({
    routes
})

export default router
