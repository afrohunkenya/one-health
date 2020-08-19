<template>
  <div>
    <NavBar />
    <main class="flex-1 overflow-x-hidden overflow-y-auto">
      <div class="container mx-auto px-6 py-8">
        <div class="flex items-center justify-center">
          <div class="relative mx-4 lg:mx-0">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <input
              class="shadow appearance-none border w-full py-2 px-6 text-gray-700 leading-tight form-input sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
              type="text"
              placeholder="Search by illness or title"
              v-model="searchFor"
              @keypress="searchData()"
            />
          </div>
        </div>
        <div class="mt-8">
          <div class="px-6 w-full mx-0 text-center">
            <div
              class="px-5 py-6 shadow rounded-md bg-white text-gray-500 hover:text-gray-200 hover:bg-green-500 mb-5 sm:mx-5"
              v-for="(portalItem, portalItemIndex) in listPortalData"
              :key="portalItemIndex"
              @click="viewData(portalItemIndex)"
            >
              <h4 class="text-xl text-gray-800">{{ portalItem.title }}</h4>
              <div class="text-sm mb-1">{{ portalItem.desc }}</div>
              <div
                class="text-sm text-gray-800 mb-2"
              >by {{ portalItem.firstName + " " +portalItem.lastName }}</div>
              <span
                class="px-2 mr-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                v-for="(illness, illnessIndex) in portalItem.illness"
                :key="illnessIndex"
              >{{ illness }}</span>
          </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import db from "./firebaseInit";
import NavBar from "./NavBar";
import Fuse from "fuse.js";

export default {
  name: "Portal",
  components: {
    NavBar,
  },
  data() {
    return {
      portalData: [],
      listPortalData: [],
      searchFor: "",
      fuse: null,
      options: {
        keys: ["title", "illness"],
      },
      searchResults: [],
      savedViewData: {}
    };
  },
  methods: {
    searchData() {
      if (this.searchFor != "") {
        this.fuse = new Fuse(this.portalData, this.options);
        this.searchResults = this.fuse.search(this.searchFor);
        if (this.searchResults != []) {
          this.listPortalData = [];
          this.searchResults.forEach(result => {
            this.listPortalData.push(result.item)
          });
        }
      } else if (this.searchFor == "") {
        this.listPortalData = this.portalData;
      }
    },
    viewData(portalItemIndex){
      this.savedViewData = this.listPortalData[portalItemIndex];
      localStorage.setItem(
        "savedViewData",
        JSON.stringify({ savedViewData: this.savedViewData })
      );
      this.$router.push("/viewdata");
    },
  },
  created() {
    db.collection("portal")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.data().doctorId,
            title: doc.data().title,
            desc: doc.data().desc,
            body: doc.data().body,
            illness: doc.data().illness,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
          };
          this.portalData.push(data);
          this.listPortalData = this.portalData;
        });
      });
  },
};
</script>

<style scoped>
</style>
