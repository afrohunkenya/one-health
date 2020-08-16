<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl">Sign Up</div>
    <form @submit.prevent="saveUser">
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Username</div>
        <input type="text" minlength="4" maxlength="20" autocomplete required v-model="username" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Email</div>
        <input type="email" autocomplete required v-model="email" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Password</div>
        <input
          type="password"
          minlength="6"
          autocomplete
          required
          ref="password"
          v-model="password"
          @keypress="validatePassword()"
        />
        <div
          v-show="! isPasswordValid"
        >Password should have 1 lowercase letter, 1 UPPERCASE LETTER, 1 digit and be at least 6 characters long</div>
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Role</div>
        <select class="mb-2" name="type" required v-model="type">
          <option disabled>Choose your role</option>
          <option value="D">Doctor</option>
          <option value="P">Patient</option>
          <option value="V">Volunteer</option>
        </select>
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">First Name</div>
        <input type="text" minlength="2" maxlength="20" autocomplete required v-model="firstName" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Last Name</div>
        <input type="text" minlength="2" maxlength="20" autocomplete required v-model="lastName" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Surname</div>
        <input type="text" minlength="2" maxlength="20" autocomplete v-model="surname" />
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
import firebase from "firebase/app";
import "firebase/auth";

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
      username: null,
      isPasswordValid: true,
      passwordRegex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/
    };
  },
  methods: {
    validatePassword() {
      this.isPasswordValid = this.passwordRegex.test(this.password);
    },
    addEmailAndPassword() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          console.log(error.code, error.message);
        });
    },
    saveUser() {
      if (this.passwordRegex.test(this.password)) {
        this.isPasswordValid = true;
        this.email = this.email.toLowerCase();
        this.addEmailAndPassword();
        db.collection("users")
          .add({
            email: this.email,
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
      } else {
        this.password = "";
        this.isPasswordValid = false;
        this.$refs.password.focus();
      }
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
