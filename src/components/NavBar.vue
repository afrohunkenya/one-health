<template>
  <nav class="flex flex-row shadow-md p-2 justify-around bg-green-700 text-white">
    <router-link class="uppercase" to="/">One Health</router-link>
    <router-link to="/portal">Portal</router-link>
    <router-link to="/stats">Stats</router-link>
    <router-link v-if="showAuth" to="/login">Log In</router-link>
    <router-link v-if="showAuth" to="/signup">Sign Up</router-link>
    <router-link v-if="! showAuth" to="/dashboard">Dashboard</router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showAuth: true,
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
