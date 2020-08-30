<template>
  <div>
    <div class="container max-w-xs p-8">
      <div class="text-2xl">Edit Data</div>
      <form @submit.prevent="editData">
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
          <router-link to="/dashboard">
            <div class="p-2">Cancel</div>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "PortalEditPersonal",
  data() {
    return {
      savedEditData: {},
      title: null,
      desc: null,
      bodyInput: null,
      body: null,
      illness: null,
    };
  },
  methods: {
    editData() {
      this.body = this.bodyInput.split("\n").join("<br>");
      db.collection("portal")
        .doc(this.savedEditData.id)
        .set({
          title: this.title,
          desc: this.desc,
          body: this.body,
          illness: this.illness.split(","),
          doctorId: this.savedEditData.doctorId,
          firstName: this.savedEditData.firstName,
          lastName: this.savedEditData.lastName,
        })
        .then((placeHolder) => {
          placeHolder;
          this.$router.push("/dashboard");
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    var localStorageData = localStorage.getItem("savedEditData");
    this.savedEditData = localStorageData
      ? JSON.parse(localStorageData).savedEditData
      : {};
    this.title = this.savedEditData.title.split("<br>").join("");
    this.desc = this.savedEditData.desc.split("<br>").join("");
    this.bodyInput = this.savedEditData.body.split("<br>").join("\n");
    this.illness = this.savedEditData.illness.join(",");
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
