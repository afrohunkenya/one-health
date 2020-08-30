<template>
  <div class="container max-w-xs p-8">
    <div class="text-2xl" v-if="healthType != 'E'">Edit Appointment</div>
    <div class="text-2xl" v-if="healthType == 'E'">Edit Inspection</div>
    <form @submit.prevent="sendEmail">
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
import firebase from "firebase/app";
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
      location: null,
      intervention: null,
    };
  },
  methods: {
    sendEmail() {
      if (this.healthType != "E") {
        //Get doctor's details
        db.collection("users")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "==",
            this.savedEditAppointment.doctorId
          )
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const doctorData = {
                firstName: doc.data().firstName,
                surname: doc.data().surname,
                lastName: doc.data().lastName,
                email: doc.data().email,
              };

              //Get patient's details
              db.collection("users")
                .where(
                  firebase.firestore.FieldPath.documentId(),
                  "==",
                  this.savedEditAppointment.patientId
                )
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    const patientData = {
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
                          this.editAppointment();
                        }
                      })
                      .catch((err) => console.log(err));
                  });
                })
                .catch((err) => console.log(err));
            });
          });
      } else {
        this.editAppointment();
      }
    },
    editAppointment() {
      if (this.healthType == "E") {
        //If Environmental Health
        db.collection("appointments")
          .doc(this.savedEditAppointment.id)
          .set({
            doctorId: this.savedEditAppointment.doctorId,
            illness: this.illness.toLowerCase().split(","),
            location: this.location,
            date: this.appointmentDate,
            linkURL: this.linkURL,
            linkPassword: this.linkPassword,
            intervention: this.intervention.trim(),
            notes: this.notes.trim(),
          })
          .then((placeHolder) => {
            placeHolder;
            this.$router.push("/dashboard");
          })
          .catch((err) => console.log(err));
      } else {
        if (this.healthType == "H") {
          //If Human Health
          db.collection("appointments")
            .doc(this.savedEditAppointment.id)
            .set({
              doctorId: this.savedEditAppointment.doctorId,
              patientId: this.savedEditAppointment.patientId,
              illness: this.illness.toLowerCase().split(","),
              date: this.appointmentDate,
              time: this.appointmentTime,
              linkURL: this.linkURL,
              linkPassword: this.linkPassword,
              notes: this.notes.trim(),
            })
            .then((placeHolder) => {
              placeHolder;
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
              environmentLocation: this.location,
              date: this.appointmentDate,
              time: this.appointmentTime,
              linkURL: this.linkURL,
              linkPassword: this.linkPassword,
              notes: this.notes.trim(),
            })
            .then((placeHolder) => {
              placeHolder;
              this.$router.push("/dashboard");
            })
            .catch((err) => console.log(err));
        }
      }
    },
  },
  mounted() {
    var localStorageData = localStorage.getItem("savedEditAppointment");
    this.savedEditAppointment = localStorageData
      ? JSON.parse(localStorageData).savedEditAppointment
      : {};
    var localStorageHealthType = localStorage.getItem("healthType");
    this.healthType = localStorageHealthType
      ? JSON.parse(localStorageHealthType).healthType
      : "";
    if (this.healthType != "E") {
      this.patientNames =
        this.savedEditAppointment.patient.firstName +
        " " +
        this.savedEditAppointment.patient.lastName;
    } else if (this.healthType == "E") {
      this.location = this.savedEditAppointment.environmentLocation;
      this.intervention = this.savedEditAppointment.intervention;
    } else if (this.healthType == "A") {
      this.animalCount = this.savedEditAppointment.animalCount;
      this.location = this.savedEditAppointment.animalLocation;
    }
    this.illness = this.savedEditAppointment.illness.join(",");
    this.linkURL = this.savedEditAppointment.linkURL;
    this.linkPassword = this.savedEditAppointment.linkPassword;
    this.notes = this.savedEditAppointment.notes;
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
