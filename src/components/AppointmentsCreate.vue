<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl" v-if="healthType != 'E'">Create Appointment</div>
    <div class="text-2xl" v-if="healthType == 'E'">Create Inspection</div>
    <form @submit.prevent="createAppointment">
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
        <router-link to="/dashboard">
          <div class="p-2">Cancel</div>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    createAppointment() {
      var userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        userEmail = JSON.parse(userEmail).userEmail;
        // Get doctor id via email
        db.collection("users")
          .where("email", "==", userEmail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = {
                id: doc.id,
              };
              var doctorId = [];
              doctorId.push(data);
              if (this.healthType == "E") {
                //If Environmental Health
                // Insert into appointments table
                db.collection("appointments")
                  .add({
                    doctorId: doctorId[0].id,
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
              } else {
                // Get Patient Id
                this.patientNamesArr = this.patientNames.trim().split(" ");
                db.collection("users")
                  .where("firstName", "==", this.patientNamesArr[0])
                  .where("lastName", "==", this.patientNamesArr[1])
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      const data = {
                        id: doc.id,
                      };
                      const patientId = [];
                      patientId.push(data);
                      if (this.healthType == "H") {
                        //If Human Health
                        // Insert into appointments table
                        db.collection("appointments")
                          .add({
                            doctorId: doctorId[0].id,
                            patientId: patientId[0].id,
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
                    });
                  });
              }
            });
          });
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
