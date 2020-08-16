<template>
  <div class="mt-8">
    <div class="flex flex-col mt-6">
      <div class="my-2 py-2 overflow-x-auto sm:mx-6 sm:px-6 lg:mx-8 lg:px-8">
        <!-- <h4 class="text-gray-600 uppercase">Appointments</h4> -->
        <button
          class="px-6 py-3 mb-3 float-right bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-teal-500 ml-3 text-sm"
        >Add Appointment</button>
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Ailment</th>
                <th>Link</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody
              class="bg-white"
              role="rowgroup"
              v-for="(appointment, appointmentIndex) in appointments"
              :key="appointmentIndex"
            >
              <tr role="row">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="m-4">
                      <div
                        class="text-sm leading-5 font-medium text-gray-900"
                      >{{ appointment.patient.firstName +" " + appointment.patient.lastName }}</div>
                      <div class="text-sm leading-5 text-gray-500">{{ appointment.patient.surname }}</div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.time }}</div>
                  <!-- <div class="text-sm leading-5 text-gray-500">August 8th</div> -->
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    v-for="(disease, diseaseIndex) in appointment.diseases"
                    :key="diseaseIndex"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >{{ disease }}</span>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.linkURL }}</div>
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.linkPassword }}</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "./firebaseInit";

export default {
  name: "appointments-view",
  data() {
    return {
      appointments: [],
    };
  },
  methods: {
    formatTime(unixTime) {
      const time = new Date(unixTime * 1000);
      return time.getHours() + ":" + ("0" + time.getMinutes()).substr(-2);
    },
  },
  created() {
    db.collection("appointments")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const patientId = doc.data().patientId.id;
          const data = {
            time: this.formatTime(doc.data().time),
            diseases: doc.data().diseases,
            linkURL: doc.data().linkURL,
            linkPassword: doc.data().linkPassword,
          };

          db.collection("users")
            .where(firebase.firestore.FieldPath.documentId(), "==", patientId)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                data.patient = {
                  firstName: doc.data().firstName,
                  surname: doc.data().surname,
                  lastName: doc.data().lastName,
                };
              });
            });
          this.appointments.push(data);
        });
      });
  },
};
</script>

<style scoped>
th {
  @apply px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider;
}
</style>
