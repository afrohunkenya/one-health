<template>
  <div>
    <NavBar />
    <div class="container max-w-xs p-8">
      <div class="text-2xl">Contact Doctor</div>
      <form @submit.prevent="contactDoctor">
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2 text-green-600 text-sm">
            <a href="https://zoom.us/signin">Sign In to Zoom to Create Link and Password</a>
          </div>
          <div class="mb-2">Zoom Link</div>
          <input type="url" autocomplete required v-model="linkURL" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Zoom Password</div>
          <input type="text" minlength="2" autocomplete required v-model="linkPassword" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">About</div>
          <input type="text" minlength="2" maxlength="150" autocomplete required v-model="about" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Notes</div>
          <textarea
            name="notes"
            cols="30"
            rows="10"
            maxlength="500"
            autocomplete
            required
            v-model="notes"
          ></textarea>
        </div>
        <div class="flex flex-row">
          <button
            class="p-2 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3 text-sm"
            type="submit"
          >Submit</button>
          <router-link to="/viewdata">
            <div class="p-2">Cancel</div>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "./firebaseInit";
import NavBar from "./NavBar";

export default {
  name: "PortalContactDoctor",
  components: {
    NavBar,
  },
  data() {
    return {
      linkURL: null,
      linkPassword: null,
      about: null,
      notes: null,
      sendNotes: null,
      savedViewData: null,
      email: null,
    };
  },
  mounted() {
    var localStorageData = localStorage.getItem("savedViewData");
    this.savedViewData = localStorageData
      ? JSON.parse(localStorageData).savedViewData
      : {};
    this.notes = `Hello Dr. ${this.savedViewData.firstName} ${this.savedViewData.lastName}. Article: ${this.savedViewData.title}`;
  },
  methods: {
    contactDoctor() {
      db.collection("users")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "==",
          this.savedViewData.id
        )
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              email: doc.data().email,
            };
            this.sendNotes = `
            ${this.notes}
            <br>
            <h3>Zoom</h3>
            Meeting Link: <a href="${this.linkURL}">${this.linkURL}</a>
            <br>
            Meeting Password: ${this.linkPassword}
            `;
            window.open(
              `mailto:${data.email}?subject=${this.about}&body=${this.sendNotes}`
            );
          });
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
