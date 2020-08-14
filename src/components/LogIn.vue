<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl">Log In</div>
    <form @submit.prevent="logIn">
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Email</div>
        <input type="email" autocomplete required v-model="email" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Password</div>
        <input type="password" autocomplete required v-model="password" />
      </div>
      <div class="flex flex-row">
        <button class="p-2" type="submit">Submit</button>
        <router-link to="/">
          <div class="p-2">Cancel</div>
        </router-link>
      </div>
      <router-link to="/signup">
        <div class="p-2">Don't have an account yet?</div>
      </router-link>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "LogIn",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(docRef => {
          docRef;
          console.log("Logged In");
        })
        .catch(function(error) {
          console.log(error.code, error.message);
        });
    }
  }
};
</script>

<style scoped>
input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
</style>
