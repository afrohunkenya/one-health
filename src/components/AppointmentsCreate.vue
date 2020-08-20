<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl">Create Appointment</div>
    <form @submit.prevent="createAppointment">
      <div class="mb-4 mt-4 p-2">
        <div class="mb-2">Patient First & Last Names</div>
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
      patientNames: null,
      illness: null,
      appointmentDate: null,
      appointmentTime: null,
      linkURL: null,
      linkPassword: null,
      notes: null,
      patientNamesArr: null,
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
    createAppointment() {
      this.patientNamesArr = this.patientNames.trim().split(" ");
      var userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        userEmail = JSON.parse(userEmail).userEmail
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
              // Get Patient Id
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
                    const formattedTime = Date.parse(this.formatTime()) / 100;
                    // Insert into appointments table
                    db.collection("appointments")
                      .add({
                        doctorId: doctorId[0].id,
                        patientId: patientId[0].id,
                        illness: this.illness.toLowerCase().split(","),
                        time: formattedTime,
                        linkURL: this.linkURL,
                        linkPassword: this.linkPassword,
                        notes: this.notes.trim(),
                      })
                      .then((docRef) => {
                        docRef;
                        this.$router.push("/dashboard");
                      })
                      .catch((err) => console.log(err));
                  });
                });
            });
          });
      }
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
