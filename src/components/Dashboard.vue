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
          <nav class="text-xl">
            <a
              class="flex items-center mt-4 py-2 px-6 border-l-4 bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
              href="#"
              target="_blank"
            >
              <span class="mx-4">Appointments</span>
            </a>
            <a
              class="flex items-center mt-4 py-2 px-6 border-l-4 border-green-700 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              href="#"
              target="_blank"
            >
              <span class="mx-4">Item 2</span>
            </a>
          </nav>
        </div>
        <div class="flex-1 flex flex-col overflow-hidden">
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
              <button class="flex mx-4 text-gray-600 focus:outline-none">
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

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
          <AppointmentsView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import AppointmentsView from "./AppointmentsView";

export default {
  name: "dashboard",
  components: {
    AppointmentsView,
  },
  data() {
    return {
      email: null,
      sidebarOpen: false,
      dropdownOpen: false,
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
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(
          function () {
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
