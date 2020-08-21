<template>
  <div>
    <div class="text-xl text-center mx-2 mb-2 uppercase">Top Illnesses This Month</div>

    <div class="flex flex-row justify-center items-center mb-12">
      <div class="m-1" v-for="(illness, illnessIndex) in listStatsData" :key="illnessIndex">
        <a
          class="text-green-800 uppercase underline text-sm"
          :href="'https://search.cdc.gov/search/index.html?query=' + illness.illness"
        >{{ illness.illness }}</a>
      </div>
    </div>
    <div
      class="m-2 text-gray-600 text-sm text-center"
    >Filter the illnesses by clicking on the names below</div>
    <canvas id="DOMChart" width="200" height="200"></canvas>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "./firebaseInit";
import Chart from "chart.js";

export default {
  name: "StatsTopIllnesses",
  data() {
    return {
      statsData: [],
      listStatsData: [],
    };
  },
  created() {
    //Get stats for this month
    db.collection("stats2020")
      .where(firebase.firestore.FieldPath.documentId(), "==", "7")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //The data is received when the DOM has long been mounted
          //However, the mounted() lifecycle is triggered before
          //the data is received
          const data = {
            content: doc.data().content,
          };
          this.statsData = data.content;
          this.listStatsData = this.statsData.slice(0, 5);

          const ctx = document.getElementById("DOMChart").getContext("2d"),
            borderWidth = 3,
            backgroundColor = "rgba(0,0,0,0)";
          const myChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [
                {
                  label: this.statsData[0].illness,
                  data: this.statsData[0].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#ce303b"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[1].illness,
                  data: this.statsData[1].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#e9b231"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[2].illness,
                  data: this.statsData[2].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#26262c"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[3].illness,
                  data: this.statsData[3].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#3eb650"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[4].illness,
                  data: this.statsData[4].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#e14530"],
                  borderWidth: borderWidth,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: false,
                    },
                  },
                ],
              },
            },
          });
          myChart;
        });
      });
  },
};
</script>

<style scoped>
</style>
