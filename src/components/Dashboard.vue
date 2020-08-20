<template>
  <div>
    <div>
      <div x-data="{ sidebarOpen: false }" class="flex h-screen font-roboto">
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
              <span class="mx-4" @click="toggleView(1)">Appointments</span>
            </div>
            <div class="flex items-center mt-4 py-2 px-6 text-white">
              <span class="mx-4" @click="toggleView(2)">Create Appointment</span>
            </div>
            <div class="flex items-center mt-4 py-2 px-6 text-white">
              <div class="mx-4" @click="toggleView(3)">Create Portal Data</div>
            </div>
          </nav>
        </div>
        <div class="flex-1 flex flex-col">
          <header
            class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-green-600"
          >
            <div class="flex items-center">
              <button
                @click="sidebarOpen = true"
                class="text-gray-500 focus:outline-none lg:hidden"
              >
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

            <div class="flex items-center">
              <div class="relative">
                <button
                  @click="dropdownOpen = !dropdownOpen"
                  class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
                >
                  <img class="h-full w-full object-cover" alt="Avatar" />
                </button>

                <div
                  v-show="dropdownOpen"
                  class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
                >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-600 hover:text-white"
                  >Profile</a>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-600 hover:text-white"
                    @click="logOut()"
                  >Logout</a>
                </div>
              </div>
            </div>
          </header>
          <AppointmentsView v-if="showView == 1"></AppointmentsView>
          <AppointmentsCreate v-if="showView == 2"></AppointmentsCreate>
          <PortalCreate v-if="showView == 3"></PortalCreate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import AppointmentsView from "./AppointmentsView";
import AppointmentsCreate from "./AppointmentsCreate";
import PortalCreate from "./PortalCreate";

export default {
  name: "dashboard",
  components: {
    AppointmentsView,
    AppointmentsCreate,
    PortalCreate,
  },
  data() {
    return {
      email: null,
      sidebarOpen: false,
      dropdownOpen: false,
      showView: 1,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var currentUser = firebase.auth().currentUser;
        if (currentUser != null) {
          this.email = currentUser.email;
        }
      } else {
        this.$router.push("/");
      }
    });
  },
  methods: {
    toggleView(toggleViewNum) {
      this.showView = toggleViewNum;
      this.sidebarOpen = false;
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(
          function () {
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
