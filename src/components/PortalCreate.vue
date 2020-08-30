<template>
  <div>
    <div class="container max-w-xs p-8">
      <div class="text-2xl">Create Data</div>
      <form @submit.prevent="createData">
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Title</div>
          <input type="text" minlength="4" maxlength="150" autocomplete required v-model="title" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Description</div>
          <input type="text" minlength="4" maxlength="250" autocomplete required v-model="desc" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div>Illness</div>
          <div class="mb-2 text-gray-600 text-sm">Use commas to separate each</div>
          <input type="text" maxlength="40" autocomplete required v-model="illness" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Body</div>
          <textarea
            cols="30"
            rows="10"
            min
            maxlength="2000"
            autocomplete
            required
            v-model="bodyInput"
          ></textarea>
        </div>
        <div class="flex flex-row">
          <button
            class="p-2 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3 text-sm"
            type="submit"
          >Submit</button>
          <div @click="toggleDefaultView()">
            <div class="p-2">Cancel</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "PortalCreate",
  data() {
    return {
      title: null,
      desc: null,
      bodyInput: null,
      body: null,
      illness: null,
    };
  },
  methods: {
    toggleDefaultView() {
      this.$emit("toggle-default-view");
    },
    createData() {
      var userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        userEmail = JSON.parse(userEmail).userEmail;
        // Get id and names via email
        db.collection("users")
          .where("email", "==", userEmail)
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
              this.body = this.bodyInput.split("\n").join("<br>");

              db.collection("portal")
                .add({
                  title: this.title,
                  desc: this.desc,
                  body: this.body,
                  illness: this.illness.split(","),
                  doctorId: doctorData[0].id,
                  firstName: doctorData[0].firstName,
                  lastName: doctorData[0].lastName,
                })
                .then((docRef) => {
                  docRef;
                  this.$emit("toggle-default-view");
                })
                .catch((err) => console.log(err));
            });
          });
      }
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
