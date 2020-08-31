<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl" v-if="healthType != 'E'">Create Appointment</div>
    <div class="text-2xl" v-if="healthType == 'E'">Create Inspection</div>
    <form @submit.prevent="updateStats">
      <div class="mb-4 mt-4 p-2" v-if="healthType != 'E'">
        <div class="mb-2" v-if="healthType == 'H'">Patient First & Last Names</div>
        <div class="mb-2" v-if="healthType == 'A'">Owner's First & Last Names</div>
        <input
          type="text"
          minlength="4"
          maxlength="20"
          required
          autocomplete
          v-model="patientNames"
        />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div>Illness</div>
        <div class="mb-2 text-gray-600 text-sm">Use commas to separate each</div>
        <input type="text" maxlength="40" autocomplete required v-model="illness" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <input type="checkbox" autocomplete v-model="illnessConfirmed" />
        <span class="ml-3">Illness confirmed</span>
      </div>
      <div class="mb-4 mt-4 p-2" v-if="healthType == 'A'">
        <div class="mb-2">No. Of Animals</div>
        <input type="number" min="1" autocomplete required v-model="animalCount" />
      </div>
      <div class="mb-4 mt-4 p-2" v-if="healthType != 'H'">
        <div class="mb-2">Location</div>
        <input type="text" minlength="2" maxlength="30" autocomplete required v-model="location" />
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Date</div>
        <input class="bg-white" type="date" autocomplete required v-model="appointmentDate" />
      </div>
      <div class="mb-4 mt-4 p-2" v-if="healthType != 'E'">
        <div class="mb-2">Time</div>
        <input class="bg-white" type="time" autocomplete required v-model="appointmentTime" />
      </div>
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
      <div class="mb-4 mt-4 p-2" v-if="healthType == 'E'">
        <div class="mb-2">Intervention</div>
        <textarea cols="30" rows="10" maxlength="500" autocomplete required v-model="intervention"></textarea>
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Doctor Notes</div>
        <textarea cols="30" rows="10" maxlength="500" autocomplete required v-model="notes"></textarea>
      </div>
      <div class="flex flex-row">
        <button
          class="p-2 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3"
          type="submit"
        >Submit</button>
        <div @click="toggleDefaultView()">
          <div class="p-2">Cancel</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "./firebaseInit";

export default {
  name: "AppointmentsCreate",
  data() {
    return {
      patientNames: null,
      illness: null,
      illnessConfirmed: null,
      appointmentDate: null,
      appointmentTime: null,
      linkURL: null,
      linkPassword: null,
      notes: null,
      patientNamesArr: null,
      healthType: null,
      animalCount: null,
      location: null,
      intervention: null,
      statsMonth: null,
      statsWeekOfMonth: null,
      storedStats: [],
      newStats: [],
      updatedStats: [],
      addedStats: [],
      unUpdatedStats: [],
      allStats: [],
    };
  },
  methods: {
    toggleDefaultView() {
      this.$emit("toggle-default-view");
    },
    updateStats() {
      if (this.illnessConfirmed) {
        this.newStats = this.illness.split(",");

        Date.prototype.getWeekOfMonth = function () {
          var firstWeekday = new Date(
            this.getFullYear(),
            this.getMonth(),
            1
          ).getDay();
          var offsetDate = this.getDate() + firstWeekday - 1;
          return Math.floor(offsetDate / 7);
        };

        //parse ISO As Local
        var dateArr = this.appointmentDate.split("-");

        // Get Month & Week of Month
        this.statsMonth = parseInt(dateArr[1]).toString();
        var parsedDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
        this.statsWeekOfMonth = parsedDate.getWeekOfMonth();

        // Get stored stats
        db.collection("stats2020")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "==",
            this.statsMonth
          )
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = {
                content: doc.data().content,
              };
              this.storedStats = data.content;

              //Update existing stats
              for (let j = 0; j < this.newStats.length; j++) {
                const newStat = this.newStats[j];
                for (let k = 0; k < this.storedStats.length; k++) {
                  const storedStat = this.storedStats[k];
                  if (newStat == storedStat.illness) {
                    var updatedCases = [];
                    for (let l = 0; l < storedStat.cases.length; l++) {
                      l == this.statsWeekOfMonth - 1
                        ? updatedCases.push(storedStat.cases[l] + 1)
                        : updatedCases.push(storedStat.cases[l]);
                    }
                    this.updatedStats.push({
                      illness: storedStat.illness,
                      cases: updatedCases,
                    });
                  }
                }
              }

              //Add bool to check if newStat has been added already
              //i.e. it wasn't updated earlier
              var newStatsTemp = [];
              for (let n = 0; n < this.newStats.length; n++) {
                const newStat = this.newStats[n];
                newStatsTemp.push({
                  illness: newStat,
                  isAdded: false,
                });
              }

              //Add non-existant stats
              const updatedStatsLength = this.updatedStats.length;
              for (let j = 0; j < newStatsTemp.length; j++) {
                const newStat = newStatsTemp[j];
                for (let k = 0; k < updatedStatsLength; k++) {
                  const updatedStat = this.updatedStats[k];
                  if (newStat.illness == updatedStat.illness) {
                    newStat.isAdded = true;
                  } else if (k == updatedStatsLength - 1 && !newStat.isAdded) {
                    var addedCases = [];
                    for (let l = 0; l < 4; l++) {
                      l == this.statsWeekOfMonth - 1
                        ? addedCases.push(1)
                        : addedCases.push(0);
                    }
                    this.addedStats.push({
                      illness: newStat.illness,
                      cases: addedCases,
                    });
                  }
                }
              }

              //Add bool to check if storedStat has been filtered already
              //i.e. it was found already
              var storedStatsTemp = [];
              for (let n = 0; n < this.storedStats.length; n++) {
                const storedStat = this.storedStats[n];
                storedStatsTemp.push({
                  illness: storedStat.illness,
                  cases: storedStat.cases,
                  isFiltered: false,
                });
              }

              //Keep unupdated stats
              for (let k = 0; k < storedStatsTemp.length; k++) {
                const storedStat = storedStatsTemp[k];
                for (let j = 0; j < this.updatedStats.length; j++) {
                  const updatedStat = this.updatedStats[j];
                  if (updatedStat.illness == storedStat.illness) {
                    storedStat.isFiltered = true;
                  } else if (
                    j == this.updatedStats.length - 1 &&
                    !storedStat.isFiltered
                  ) {
                    this.unUpdatedStats.push({
                      cases: storedStat.cases,
                      illness: storedStat.illness,
                    });
                  }
                }
              }

              //Combine all stats
              this.allStats = this.updatedStats.concat(
                this.unUpdatedStats,
                this.addedStats
              );

              db.collection("stats2020")
                .doc(this.statsMonth)
                .set({
                  content: this.allStats,
                })
                .then(function () {})
                .catch((err) => console.log(err));
              this.sendEmail();
            });
          });
      } else {
        this.sendEmail();
      }
    },
    sendEmail() {
      var userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        userEmail = JSON.parse(userEmail).userEmail;
        if (this.healthType != "E") {
          //Get doctor's details
          db.collection("users")
            .where("email", "==", userEmail)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const doctorData = {
                  id: doc.id,
                  firstName: doc.data().firstName,
                  surname: doc.data().surname,
                  lastName: doc.data().lastName,
                  email: doc.data().email,
                };

                //Get patient's details
                this.patientNamesArr = this.patientNames.trim().split(" ");
                db.collection("users")
                  .where("firstName", "==", this.patientNamesArr[0])
                  .where("lastName", "==", this.patientNamesArr[1])
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      const patientData = {
                        id: doc.id,
                        email: doc.data().email,
                      };

                      //Send Email
                      fetch(
                        `http://localhost:3000/appointment?names=${doctorData.firstName}.${doctorData.lastName}.${doctorData.surname}&emails=${doctorData.email}.${patientData.email}&time=${this.appointmentDate}.${this.appointmentTime}&linkurl=${this.linkURL}&linkpass=${this.linkPassword}`
                      )
                        .then((data) => data.json())
                        .then((res) => {
                          res = JSON.parse(res);
                          if (res.sent) {
                            this.createAppointment(
                              doctorData.id,
                              patientData.id
                            );
                          }
                        })
                        .catch((err) => console.log(err));
                    });
                  })
                  .catch((err) => console.log(err));
              });
            });
        } else {
          //If Environmental Health
          // Get doctor id via email
          db.collection("users")
            .where("email", "==", userEmail)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const doctorData = {
                  id: doc.id,
                };
                this.createAppointmentEnvironmental(doctorData.id);
              });
            })
            .catch((err) => console.log(err));
        }
      }
    },
    createAppointmentEnvironmental(doctorId) {
      // Insert into appointments table
      db.collection("appointments")
        .add({
          doctorId: doctorId,
          environmentLocation: this.location,
          date: this.appointmentDate,
          illness: this.illness.toLowerCase().split(","),
          linkURL: this.linkURL,
          linkPassword: this.linkPassword,
          intervention: this.intervention.trim(),
          notes: this.notes.trim(),
        })
        .then((docRef) => {
          docRef;
          this.$emit("toggle-default-view");
        })
        .catch((err) => console.log(err));
    },
    createAppointment(doctorId, patientId) {
      if (this.healthType == "H") {
        //If Human Health
        // Insert into appointments table
        db.collection("appointments")
          .add({
            doctorId: doctorId,
            patientId: patientId,
            illness: this.illness.toLowerCase().split(","),
            date: this.appointmentDate,
            time: this.appointmentTime,
            linkURL: this.linkURL,
            linkPassword: this.linkPassword,
            notes: this.notes.trim(),
          })
          .then((docRef) => {
            docRef;
            this.$emit("toggle-default-view");
          })
          .catch((err) => console.log(err));
      } else if (this.healthType == "A") {
        //If Animal Health
        // Insert into appointments table
        db.collection("appointments")
          .add({
            doctorId: doctorId[0].id,
            patientId: patientId[0].id,
            illness: this.illness.toLowerCase().split(","),
            animalCount: this.animalCount,
            location: this.location.trim(),
            date: this.appointmentDate,
            time: this.appointmentTime,
            linkURL: this.linkURL,
            linkPassword: this.linkPassword,
            notes: this.notes.trim(),
          })
          .then((docRef) => {
            docRef;
            this.$emit("toggle-default-view");
          })
          .catch((err) => console.log(err));
      }
    },
  },
  mounted() {
    var localStorageData = localStorage.getItem("healthType");
    this.healthType = localStorageData
      ? JSON.parse(localStorageData).healthType
      : "";
  },
};
</script>

<style scoped>
input[type="text"],
input[type="date"],
input[type="time"],
input[type="url"],
input[type="number"],
textarea,
select {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
select {
  @apply bg-white text-black;
}
input[type="checkbox"] {
  @apply shadow border rounded py-2 px-6 text-gray-700 leading-tight;
}
</style>
