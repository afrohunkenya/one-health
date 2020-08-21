<template>
  <div>
    <div class="text-xl text-center mx-2 mb-8 uppercase">Emerging Illnesses This Month</div>
    <canvas id="DOMChart" width="200" height="200"></canvas>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "./firebaseInit";
import Chart from "chart.js";

export default {
  name: "StatsEmergingIllnesses",
  data() {
    return {
      statsData: [],
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

          const ctx = document.getElementById("DOMChart").getContext("2d"),
            borderWidth = 3,
            backgroundColor = "rgba(0,0,0,0)";
          const myChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [
                {
                  label: this.statsData[5].illness,
                  data: this.statsData[5].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#ce303b"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[6].illness,
                  data: this.statsData[6].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#e9b231"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[7].illness,
                  data: this.statsData[7].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#26262c"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[8].illness,
                  data: this.statsData[8].cases,
                  backgroundColor: [backgroundColor],
                  borderColor: ["#3eb650"],
                  borderWidth: borderWidth,
                },
                {
                  label: this.statsData[9].illness,
                  data: this.statsData[9].cases,
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
