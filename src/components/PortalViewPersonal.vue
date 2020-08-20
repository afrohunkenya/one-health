<template>
  <div class="mt-8">
    <div class="flex flex-col mt-6">
      <div class="my-2 py-2 overflow-x-auto sm:mx-6 sm:px-6 lg:mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Illness</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody
              class="bg-white"
              role="rowgroup"
              v-for="(portalItem, portalItemIndex) in portalData"
              :key="portalItemIndex"
            >
              <tr role="row">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="m-4">
                      <div
                        class="text-sm leading-5 font-medium text-gray-900"
                      >{{ portalItem.title }}</div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{ portalItem.desc }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    v-for="(illness, illnessIndex) in portalItem.illness"
                    :key="illnessIndex"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >{{ illness }}</span>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div class="text-indigo-600 hover:text-indigo-900">Edit</div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <div class="text-red-600 hover:text-red-900">Delete</div>
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
// import firebase from "firebase/app";
// import "firebase/auth";
import db from "./firebaseInit";

export default {
  name: "PortalViewCreated",
  data() {
    return {
      portalData: [],
    };
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
            };
            var doctorId = [];
            doctorId.push(data);
            //  Filter portal data via id
            db.collection("portal")
              .where("doctorId", "==", doctorId[0].id)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const data = {
                    title: doc.data().title,
                    desc: doc.data().desc,
                    illness: doc.data().illness,
                  };

                  this.portalData.push(data);
                });
              });
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
