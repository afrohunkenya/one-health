<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl">Edit Profile</div>
    <form @submit.prevent="editProfile">
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Username</div>
        <input type="text" minlength="4" maxlength="20" autocomplete required v-model="username" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Email</div>
        <input type="email" autocomplete required v-model="email" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Phone Number</div>
        <input type="tel" autocomplete required v-model="phone" />
      </div>
      <div class="mb-4 mt-4 p-2" v-if="isDoctor">
        <div class="mb-2">Department</div>
        <input type="text" minlength="2" maxlength="20" autocomplete required v-model="dept" />
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
      <div class="mb-4 mt-4 p-2" v-if="! isDoctor">
        <div class="mb-2">Address</div>
        <input type="text" minlength="2" maxlength="30" autocomplete v-model="address" />
      </div>
      <div class="flex flex-row">
        <button
          class="p-2 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3 text-sm"
          type="submit"
        >Submit</button>
        <router-link to="/dashboard">
          <div class="p-2">Cancel</div>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "ProfileEdit",
  data() {
    return {
      profileData: {},
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      surname: null,
      type: null,
      phone: null,
      username: null,
      dept: null,
      address: null,
      isDoctor: false,
    };
  },
  methods: {
    fillInput() {
      if (this.profileData.doctorDept) {
        this.dept = this.profileData.doctorDept;
        this.isDoctor = true;
      } else {
        this.address = this.profileData.address;
        this.isDoctor = false;
      }
      this.email = this.profileData.email;
      this.firstName = this.profileData.firstName;
      this.lastName = this.profileData.lastName;
      this.password = this.profileData.password;
      this.surname = this.profileData.surname;
      this.type = this.profileData.type;
      this.phone = this.profileData.phone;
      this.username = this.profileData.username;
    },
    editProfile() {
      if (this.isDoctor) {
        db.collection("users")
          .doc(this.profileData.id)
          .set({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            surname: this.surname,
            phone: this.phone,
            username: this.username,
            doctorDept: this.dept,
          })
          .then(function () {
            this.$emit("toggle-default-view");
          })
          .catch((err) => console.log(err));
      } else {
        db.collection("users")
          .doc(this.profileData.id)
          .set({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            surname: this.surname,
            phone: this.phone,
            username: this.username,
            patientAddress: this.address,
            type: this.profileData.type,
          })
          .then(function () {
            this.$emit("toggle-default-view");
          })
          .catch((err) => console.log(err));
      }
    },
  },
  created() {
    var userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      userEmail = JSON.parse(userEmail).userEmail;
      db.collection("users")
        .where("email", "==", userEmail)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              email: doc.data().email,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              surname: doc.data().surname,
              type: doc.data().type,
              phone: doc.data().phone,
              username: doc.data().username,
              doctorDept: doc.data().doctorDept,
              patientAddress: doc.data().address,
            };
            this.profileData = data;
            this.fillInput();
          });
        });
    }
  },
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
