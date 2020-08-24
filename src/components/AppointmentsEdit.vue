<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl">Edit Appointment</div>
    <form @submit.prevent="editAppointment">
      <div class="mb-4 mt-4 p-2">
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
      <div v-if="healthType == 'A'">
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">No. Of Animals</div>
          <input type="number" min="1" autocomplete required v-model="animalCount" />
        </div>
        <div class="mb-4 mt-4 p-2">
          <div class="mb-2">Location</div>
          <input
            type="text"
            minlength="2"
            maxlength="30"
            autocomplete
            required
            v-model="animalLocation"
          />
        </div>
      </div>
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Date</div>
        <input class="bg-white" type="date" autocomplete required v-model="appointmentDate" />
      </div>
      <div class="mb-4 mt-4 p-2">
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
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Doctor Notes</div>
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
      savedEditAppointment: {},
      patientNames: null,
      illness: null,
      appointmentDate: null,
      appointmentTime: null,
      linkURL: null,
      linkPassword: null,
      notes: null,
      patientNamesArr: null,
      healthType: null,
      animalCount: null,
      animalLocation: null,
    };
  },
  methods: {
    formatTime() {
      const dateArr = this.appointmentDate.split("-");
      var month = dateArr[1];
      const monthArr = month.split("");
      if (monthArr[0] == "0") {
        month = monthArr[1];
      }
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${dateArr[2]} ${monthNames[parseInt(month) - 1]} ${dateArr[0]}  ${
        this.appointmentTime
      }:00 GMT`;
    },
    editAppointment() {
      const formattedTime = Date.parse(this.formatTime()) / 100;
      if (this.healthType == "H") {
        //If Human Health
        db.collection("appointments")
          .doc(this.savedEditAppointment.id)
          .set({
            doctorId: this.savedEditAppointment.doctorId,
            patientId: this.savedEditAppointment.patientId,
            illness: this.illness.toLowerCase().split(","),
            time: formattedTime,
            linkURL: this.linkURL,
            linkPassword: this.linkPassword,
            notes: this.notes.trim(),
          })
          .then(function () {
            this.$router.push("/dashboard");
          })
          .catch((err) => console.log(err));
      } else if (this.healthType == "A") {
        //If Animal Health
        db.collection("appointments")
          .doc(this.savedEditAppointment.id)
          .set({
            doctorId: this.savedEditAppointment.doctorId,
            patientId: this.savedEditAppointment.patientId,
            illness: this.illness.toLowerCase().split(","),
            animalCount: this.animalCount,
            animalLocation: this.animalLocation,
            time: formattedTime,
            linkURL: this.linkURL,
            linkPassword: this.linkPassword,
            notes: this.notes.trim(),
          })
          .then(function () {
            this.$router.push("/dashboard");
          })
          .catch((err) => console.log(err));
      }
    },
  },
  mounted() {
    var localStorageData = localStorage.getItem("savedEditAppointment");
    this.savedEditAppointment = localStorageData
      ? JSON.parse(localStorageData).savedEditAppointment
      : {};
    this.patientNames =
      this.savedEditAppointment.patient.firstName +
      " " +
      this.savedEditAppointment.patient.lastName;
    this.illness = this.savedEditAppointment.illness.join(",");
    this.linkURL = this.savedEditAppointment.linkURL;
    this.linkPassword = this.savedEditAppointment.linkPassword;
    this.notes = this.savedEditAppointment.notes;

    var localStorageHealthType = localStorage.getItem("healthType");
    this.healthType = localStorageHealthType
      ? JSON.parse(localStorageHealthType).healthType
      : "";
    if (this.healthType == "A") {
      this.animalCount = this.savedEditAppointment.animalCount;
      this.animalLocation = this.savedEditAppointment.animalLocation;
    }
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
