<template>
  <div>
    <NavBar />
    <main class="flex-1 overflow-x-hidden overflow-y-auto">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-gray-700 text-3xl font-medium">{{savedViewData.title}}</h3>
        <div
          class="text-sm text-gray-800 mb-2"
        >by {{ savedViewData.firstName + " " + savedViewData.lastName }}</div>
        <hr />
        <span
          class="px-2 mr-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
          v-for="(illness, illnessIndex) in savedViewData.illness"
          :key="illnessIndex"
        >{{ illness }}</span>
        <div class="text-gray-500 my-5">{{savedViewData.desc}}</div>
        <div class="text-black mb-5" v-html="savedViewData.body"></div>
        <router-link
          class="p-2 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
          to="/contactdoctor"
          v-if="isDoctor"
        >Contact {{ savedViewData.firstName + " " + savedViewData.lastName }}</router-link>
      </div>
    </main>
    <FooterSection />
  </div>
</template>

<script>
import NavBar from "./NavBar";
import FooterSection from "./FooterSection";

export default {
  name: "PortalView",
  components: {
    NavBar,
    FooterSection,
  },
  data() {
    return {
      savedViewData: {},
      isDoctor: null,
    };
  },
  mounted() {
    var localStorageData = localStorage.getItem("savedViewData");
    this.savedViewData = localStorageData
      ? JSON.parse(localStorageData).savedViewData
      : {};
    this.savedViewData.title = this.savedViewData.title.split("<br>").join(" ");

    var localStorageIsDoctor = localStorage.getItem("isDoctor");
    if (localStorageIsDoctor) {
      this.isDoctor = JSON.parse(localStorageIsDoctor).isDoctor;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
