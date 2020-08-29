<template>
  <div>
    <NavBar />
    <div class="flex h-screen font-roboto">
      <div
        :class="sidebarOpen ? 'block' : 'hidden'"
        @click="sidebarOpen = false"
        class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      ></div>

      <div
        :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
        class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-green-700 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
      >
        <nav>
          <div class="flex items-center mt-4 py-2 px-6 text-white">
            <span class="mx-4" @click="toggleView(1)">Top Illnesses</span>
          </div>
          <div class="flex items-center mt-4 py-2 px-6 text-white">
            <span class="mx-4" @click="toggleView(2)">Emerging Illnesses</span>
          </div>
        </nav>
      </div>
      <div class="flex-1 flex flex-col">
        <header class="flex justify-between items-center py-4 px-6 bg-white">
          <div class="flex items-center">
            <button @click="sidebarOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </header>
        <StatsTopIllnesses v-if="showView == 1"></StatsTopIllnesses>
        <StatsEmergingIllnesses v-if="showView == 2"></StatsEmergingIllnesses>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import StatsTopIllnesses from "./StatsTopIllnesses";
import StatsEmergingIllnesses from "./StatsEmergingIllnesses";

export default {
  name: "StatsView",
  components: {
    NavBar,
    StatsTopIllnesses,
    StatsEmergingIllnesses,
  },
  data() {
    return {
      sidebarOpen: false,
      showView: 1,
    };
  },
  methods: {
    toggleView(toggleViewNum) {
      this.showView = toggleViewNum;
      this.sidebarOpen = false;
    },
  },
};
</script>

<style scoped>
</style>
