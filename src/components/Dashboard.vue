<template>
  <div class="flex h-screen font-roboto">
    <div
      :class="sidebarOpen ? 'block' : 'hidden'"
      @click="sidebarOpen = false"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
    ></div>

    <div
      :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-green-700 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="text-center mt-4">
        <router-link class="text-white text-xl uppercase fo" to="/">One Health</router-link>
      </div>
      <nav>
        <div class="flex items-center mt-4 py-2 px-6 text-white">
          <span class="mx-4" @click="toggleView(1)" v-if="! isEnvironmentalHealth">Appointments</span>
          <span class="mx-4" @click="toggleView(1)" v-if="isEnvironmentalHealth">Inspections</span>
        </div>
        <div v-if="isDoctor">
          <div class="flex items-center mt-4 py-2 px-6 text-white">
            <span
              class="mx-4"
              @click="toggleView(2)"
              v-if="! isEnvironmentalHealth"
            >Create Appointment</span>
            <span class="mx-4" @click="toggleView(2)" v-if="isEnvironmentalHealth">Create Inspection</span>
          </div>
          <div class="flex items-center mt-4 py-2 px-6 text-white">
            <span class="mx-4" @click="toggleView(3)">Personal Portal Data</span>
          </div>
          <div class="flex items-center mt-4 py-2 px-6 text-white">
            <span class="mx-4" @click="toggleView(4)">Create Portal Data</span>
          </div>
        </div>
        <div class="flex items-center mt-4 py-2 px-6 text-white">
          <router-link class="mx-4" to="/portal">Portal</router-link>
        </div>
        <div class="flex items-center mt-4 py-2 px-6 text-white">
          <router-link class="mx-4" to="/stats">Stats</router-link>
        </div>
        <div class="flex items-center mt-4 py-2 px-6 text-white">
          <span class="mx-4" @click="toggleView(5)">Edit Profile</span>
        </div>
        <div class="flex items-center mt-4 py-2 px-6 text-white">
          <span class="mx-4" @click="logOut()">Logout</span>
        </div>
      </nav>
    </div>
    <div class="flex-1 flex flex-col">
      <header
        class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-green-600"
      >
        <div class="flex items-center">
          <button @click="sidebarOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
            <svg
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div class="relative mx-4 lg:mx-0">{{ email }}</div>
        </div>
        <div>
          <span class="text-gray-600 text-sm uppercase">Contact Hospital</span>
          <a href="tel:0711188890" class="mx-4">Phone</a>
          <a href="mailto:contact@hospital.com" class="mx-4">Email</a>
        </div>
      </header>
      <AppointmentsView @toggle-sidebar-view="toggleSidebarView" v-if="showView == 1"></AppointmentsView>
      <AppointmentsCreate @toggle-default-view="toggleDefaultView" v-if="showView == 2"></AppointmentsCreate>
      <PortalViewPersonal v-if="showView == 3"></PortalViewPersonal>
      <PortalCreate @toggle-default-view="toggleDefaultView" v-if="showView == 4"></PortalCreate>
      <ProfileEdit @toggle-default-view="toggleDefaultView" v-if="showView == 5"></ProfileEdit>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import AppointmentsView from "./AppointmentsView";
import AppointmentsCreate from "./AppointmentsCreate";
import PortalViewPersonal from "./PortalViewPersonal";
import PortalCreate from "./PortalCreate";
import ProfileEdit from "./ProfileEdit";

export default {
  name: "dashboard",
  components: {
    AppointmentsView,
    AppointmentsCreate,
    PortalViewPersonal,
    PortalCreate,
    ProfileEdit,
  },
  data() {
    return {
      email: null,
      sidebarOpen: false,
      isDoctor: false,
      isEnvironmentalHealth: false,
      showView: 1,
    };
  },
  mounted() {
    var userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      this.email = JSON.parse(userEmail).userEmail;
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    toggleSidebarView(isDoctor, healthType) {
      this.isDoctor = isDoctor;
      this.isEnvironmentalHealth = healthType == "E";
    },
    toggleView(toggleViewNum) {
      this.showView = toggleViewNum;
      this.sidebarOpen = false;
    },
    toggleDefaultView() {
      this.showView = 1;
      this.sidebarOpen = false;
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then((placeHolder) => {
            placeHolder;
            localStorage.removeItem("userEmail");
            this.$router.push("/");
          },
          function (error) {
            console.error(error);
          }
        );
    },
  },
};
</script>

<style scoped>
</style>
