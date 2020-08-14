<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl">Sign Up</div>
    <form action @submit.prevent="saveUser">
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Username</div>
        <input type="text" v-model="username" autocomplete required />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Email</div>
        <input type="email" v-model="email" autocomplete required />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Password</div>
        <input type="password" v-model="password" autocomplete required />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Role</div>
        <select class="mb-2" name="type" v-model="type" required>
          <option disabled>Choose your role</option>
          <option value="D">Doctor</option>
          <option value="P">Patient</option>
          <option value="V">Volunteer</option>
        </select>
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">First Name</div>
        <input type="text" v-model="firstName" autocomplete required />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Last Name</div>
        <input type="text" v-model="lastName" autocomplete required />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Surname</div>
        <input type="text" v-model="surname" autocomplete />
      </div>
      <div class="flex flex-row">
        <button class="p-2" type="submit">Submit</button>
        <router-link to="/">
          <div class="p-2">Cancel</div>
        </router-link>
      </div>
      <router-link to="/login">
        <div class="p-2">Already have an account?</div>
      </router-link>
    </form>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "SignUp",
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      surname: null,
      type: null,
      username: null
    };
  },
  methods: {
    saveUser() {
      db.collection("users")
        .add({
          email: this.email.toLowerCase(),
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          surname: this.surname,
          type: this.type,
          username: this.username
        })
        .then(docRef => {
          docRef;
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
input,
select {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
select {
  @apply bg-white text-black;
}
</style>
