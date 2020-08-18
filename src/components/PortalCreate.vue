<template>
  <div>
    <div class="container max-w-xs p-8">
      <div class="text-2xl">Create Data</div>
      <form @submit.prevent="createData">
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Title</div>
          <input type="text" minlength="4" maxlength="30" autocomplete required v-model="title" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Description</div>
          <input type="text" minlength="4" maxlength="60" autocomplete required v-model="desc" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div>Ailments</div>
          <div class="mb-2 text-gray-600 text-sm">Use commas to separate each</div>
          <input type="text" maxlength="40" autocomplete required v-model="ailments" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Body</div>
          <textarea cols="30" rows="10" min maxlength="2000" autocomplete required v-model="body"></textarea>
        </div>
        <div class="flex flex-row">
          <button
            class="p-2 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3 text-sm"
            type="submit"
          >Submit</button>
          <router-link to="/">
            <div class="p-2">Cancel</div>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "PortalCreate",
  data() {
    return {
      title: null,
      desc: null,
      body: null,
      ailments: null,
    };
  },
  methods: {
    createData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var currentUser = firebase.auth().currentUser;
          // Get id and names via Auth email
          if (currentUser != null) {
            db.collection("users")
              .where("email", "==", currentUser.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const data = {
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                  };
                  var doctorData = [];
                  doctorData.push(data);

                  db.collection("portal")
                    .add({
                      title: this.title,
                      desc: this.desc,
                      ailments: this.ailments.split(","),
                      doctorId: doctorData[0].id,
                      firstName: doctorData[0].firstName,
                      lastName: doctorData[0].lastName,
                    })
                    .then((docRef) => {
                      docRef;
                      this.$router.push("/");
                    })
                    .catch((err) => console.log(err));
                });
              });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
input,
textarea,
select {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
select {
  @apply bg-white text-black;
}
</style>
