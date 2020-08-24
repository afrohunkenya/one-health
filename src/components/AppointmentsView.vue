<template>
  <div class="mt-8">
    <div class="flex flex-col mt-6">
      <div class="my-2 py-2 overflow-x-auto sm:mx-6 sm:px-6 lg:mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full" v-if="isDoctor && profileData.healthType == 'H'">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Illness</th>
                <th>Link</th>
                <th>Notes</th>
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
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.date }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    v-for="(illness, illnessIndex) in appointment.illness"
                    :key="illnessIndex"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >{{ illness }}</span>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.linkURL }}</div>
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.linkPassword }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.notes }}</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div
                    class="text-indigo-600 hover:text-indigo-900"
                    @click="editAppointment(appointmentIndex)"
                  >Edit</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div
                    class="text-red-600 hover:text-red-900"
                    @click="deleteAppointment(appointmentIndex)"
                  >Delete</div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="min-w-full" v-if="isDoctor && profileData.healthType == 'A'">
            <thead>
              <tr>
                <th>Owner's Name</th>
                <th>Time</th>
                <th>Illness</th>
                <th>Location</th>
                <th>No. of Animals</th>
                <th>Link</th>
                <th>Notes</th>
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
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.date }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    v-for="(illness, illnessIndex) in appointment.illness"
                    :key="illnessIndex"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >{{ illness }}</span>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.animalLocation }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.animalCount }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.linkURL }}</div>
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.linkPassword }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.notes }}</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div
                    class="text-indigo-600 hover:text-indigo-900"
                    @click="editAppointment(appointmentIndex)"
                  >Edit</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div
                    class="text-red-600 hover:text-red-900"
                    @click="deleteAppointment(appointmentIndex)"
                  >Delete</div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="min-w-full" v-if="isDoctor && profileData.healthType == 'E'">
            <thead>
              <tr>
                <th>Location</th>
                <th>Date</th>
                <th>Illness</th>
                <th>Link</th>
                <th>Intervention</th>
                <th>Notes</th>
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
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.environmentLocation }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.date }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    v-for="(illness, illnessIndex) in appointment.illness"
                    :key="illnessIndex"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >{{ illness }}</span>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.linkURL }}</div>
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.linkPassword }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.intervention }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.notes }}</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div
                    class="text-indigo-600 hover:text-indigo-900"
                    @click="editAppointment(appointmentIndex)"
                  >Edit</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div
                    class="text-red-600 hover:text-red-900"
                    @click="deleteAppointment(appointmentIndex)"
                  >Delete</div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="min-w-full" v-if="! isDoctor">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Link</th>
                <th>Email</th>
                <th>Contact</th>
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
                      >{{ appointment.doctor.firstName +" " + appointment.doctor.lastName }}</div>
                      <div class="text-sm leading-5 text-gray-500">{{ appointment.doctor.surname }}</div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.time }}</div>
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.date }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.linkURL }}</div>
                  <div class="text-sm leading-5 text-gray-500">{{ appointment.linkPassword }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ appointment.doctor.email }}</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <a
                    :href="'mailto:' + appointment.doctor.email"
                    class="text-indigo-600 hover:text-indigo-900"
                  >Contact</a>
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
import "firebase/auth";
import db from "./firebaseInit";

export default {
  name: "AppointmentsView",
  data() {
    return {
      appointments: [],
      savedEditAppointment: {},
      profileData: {},
      isDoctor: false,
    };
  },
  methods: {
    formatDate(date){
      const dateArr = date.split("-");
      var month = dateArr[1];
      const monthArr = month.split("");
      if (monthArr[0] == "0") {
        month = monthArr[1];
      }
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${dateArr[2]} ${monthNames[parseInt(month) - 1]}, ${dateArr[0]}`;
    },
    getDocHumanHealth() {
      //  Filter appointments via id
      db.collection("appointments")
        .where("doctorId", "==", this.profileData.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const patientId = doc.data().patientId;
            const data = {
              id: doc.id,
              doctorId: doc.data().doctorId,
              patientId: doc.data().patientId,
              date: this.formatDate(doc.data().date),
              time: doc.data().time,
              illness: doc.data().illness,
              linkURL: doc.data().linkURL,
              linkPassword: doc.data().linkPassword,
              notes: doc.data().notes,
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
                  this.appointments.push(data);
                });
              });
          });
        });
    },
    getDocAnimalHealth() {
      //  Filter appointments via id
      db.collection("appointments")
        .where("doctorId", "==", this.profileData.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const patientId = doc.data().patientId;
            const data = {
              id: doc.id,
              doctorId: doc.data().doctorId,
              patientId: doc.data().patientId,
              date: this.formatDate(doc.data().date),
              time: doc.data().time,
              illness: doc.data().illness,
              animalCount: doc.data().animalCount,
              animalLocation: doc.data().animalLocation,
              linkURL: doc.data().linkURL,
              linkPassword: doc.data().linkPassword,
              notes: doc.data().notes,
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
                  this.appointments.push(data);
                });
              });
          });
        });
    },
    getDocEnvironmentalHealth() {
      //  Filter appointments via id
      db.collection("appointments")
        .where("doctorId", "==", this.profileData.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              doctorId: doc.data().doctorId,
              environmentLocation: doc.data().environmentLocation,
              date: this.formatDate(doc.data().date),
              illness: doc.data().illness,
              linkURL: doc.data().linkURL,
              linkPassword: doc.data().linkPassword,
              intervention: doc.data().intervention,
              notes: doc.data().notes,
            };
            this.appointments.push(data);
          });
        });
    },
    getPatient() {
      //  Filter appointments via id
      db.collection("appointments")
        .where("patientId", "==", this.profileData.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const doctorId = doc.data().doctorId;
            const data = {
              id: doc.id,
              doctorId: doc.data().doctorId,
              patientId: doc.data().patientId,
              date: this.formatDate(doc.data().date),
              time: doc.data().time,
              linkURL: doc.data().linkURL,
              linkPassword: doc.data().linkPassword,
            };

            db.collection("users")
              .where(firebase.firestore.FieldPath.documentId(), "==", doctorId)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  data.doctor = {
                    firstName: doc.data().firstName,
                    surname: doc.data().surname,
                    lastName: doc.data().lastName,
                    email: doc.data().email,
                  };
                  this.appointments.push(data);
                });
              });
          });
        });
    },
    editAppointment(appointmentIndex) {
      this.savedEditAppointment = this.appointments[appointmentIndex];
      localStorage.setItem(
        "savedEditAppointment",
        JSON.stringify({ savedEditAppointment: this.savedEditAppointment })
      );
      this.$router.push("/editappointment");
    },
    deleteAppointment(appointmentIndex) {
      const appointmentToBeDeleted = this.appointments[appointmentIndex];
      db.collection("appointments")
        .doc(appointmentToBeDeleted.id)
        .delete()
        .then(function () {
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    var userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      userEmail = JSON.parse(userEmail).userEmail;
      // Get id via email
      db.collection("users")
        .where("email", "==", userEmail)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              type: doc.data().type,
              healthType: doc.data().healthType,
            };
            this.profileData = data;
            this.isDoctor = this.profileData.type == "D";
            localStorage.setItem(
              "isDoctor",
              JSON.stringify({ isDoctor: this.isDoctor })
            );
            localStorage.setItem(
              "healthType",
              JSON.stringify({ healthType: this.profileData.healthType })
            );
            this.$emit(
              "toggle-sidebar-view",
              this.isDoctor,
              this.profileData.healthType
            );

            if (this.isDoctor) {
              //If Doctor
              if (this.profileData.healthType == "H") {
                //If Human Health
                this.getDocHumanHealth();
              } else if (this.profileData.healthType == "A") {
                //If Animal Health
                this.getDocAnimalHealth();
              } else if (this.profileData.healthType == "E") {
                //If Environmental Health
                this.getDocEnvironmentalHealth();
              }
            } else {
              //If Patient
              this.getPatient();
            }
          });
        });
    }
  },
};
</script>

<style scoped>
th {
  @apply px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider;
}
</style>
