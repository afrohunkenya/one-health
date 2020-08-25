<template>
  <nav class="flex flex-row shadow-md p-2 justify-around bg-green-700 text-white">
    <router-link class="uppercase" to="/">One Health</router-link>
    <router-link to="/portal">Portal</router-link>
    <router-link to="/stats">Stats</router-link>
    <div class="relative">
      <button @click="contactOpen = !contactOpen">Contact</button>
      <div
        v-show="contactOpen"
        class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
      >
        <a
          href="tel:0711188890"
          class="block px-4 py-2 text-sm text-black hover:bg-green-600"
        >Hospital Phone</a>
        <a
          href="mailto:contact@hospital.com"
          class="block px-4 py-2 text-sm text-black hover:bg-green-600"
        >Hospital Email</a>
      </div>
    </div>
    <div class="relative">
      <button @click="menuOpen = !menuOpen" class="text-white focus:outline-none">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div
        v-show="menuOpen"
        class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
      >
        <router-link
          class="block px-4 py-2 text-sm text-black hover:bg-green-600"
          v-if="showAuth"
          to="/login"
        >Log In</router-link>
        <router-link
          class="block px-4 py-2 text-sm text-black hover:bg-green-600"
          v-if="showAuth"
          to="/signup"
        >Sign Up</router-link>
        <router-link
          class="block px-4 py-2 text-sm text-black hover:bg-green-600"
          v-if="! showAuth"
          to="/dashboard"
        >Dashboard</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showAuth: true,
      contactOpen: false,
      menuOpen: false,
    };
  },
  mounted() {
    if (localStorage.getItem("userEmail")) {
      this.showAuth = false;
    }
  },
};
</script>

<style scoped>
</style>
