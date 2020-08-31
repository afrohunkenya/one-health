<template>
  <div>
    <NavBar />
    <div class="mx-8">
      <div class="my-4">
        <div class="text-2xl font-semibold text-green-700">Problem</div>
        <p>
          A doctor who works in a busy public hospital with few medical personnel is exhausted.
          <br />He needs to attend to his immunocompromised patients within a short period of time
          <br />Because the patients are suffering from zoonotic and diseases resulting from environmental pollution and delays can lead to serious health complications
        </p>
        <div class="mt-2 font-bold text-green-600">User</div>
        <p>Doctor</p>
        <div class="mt-2 font-bold text-green-600">Need</div>
        <p>To communicate with his immunocompromised patients prior to visits and attends to immunocompromised patients within a short period of time</p>
        <div class="mt-2 font-bold text-green-600">Insight</div>
        <p>
          The doctor does not want a delayed service delivery to the immunocompromised patients. He would like to attend to his patients within a short period of time,
          However most of these immunocompromised patients are suffering from zoonotic and waterborne diseases.
        </p>
      </div>
      <div class="my-4">
        <div class="text-2xl font-semibold text-green-700">Solutions</div>
        <div class="mt-2 font-bold text-green-600">A</div>
        <p>
          Create a communication channel between the different departments in the healthcare system.Involving the medical personnel, Public health workers to veterinary.
          <br />The veterinary will get information from medical side in case of a rise or emergence of certain zoonotic diseases such as brucellosis and pinpoint which area has highest number of cases.
        </p>
        <div class="mt-2 font-bold text-green-600">B</div>
        <p>
          Data analysis will be done through the system and with the outcomes, a plan can be set to address the situation. Thus this will ease disease surveillance.
          <br />After interventions has been made , data will be recorded in the app stating why certain disease occurred and it's causes.
          <br />The doctor will be able to access this information and inform his patients of the necessary precautions he/she should take in order to avoid reoccurrence of the same disease after treatment.
        </p>
        <div class="mt-2 font-bold text-green-600">C</div>
        <p>
          The app will also allow patients to schedule/ book meetings prior to visit.
          <br />Through this, the doctor will choose which specific disease to handle on specific day and time.
          <br />This will reduce congestion in hospital and also doctors workload will be reduced since he/she will able to do specific number of patients.
          The app will also allow the patients to seek for advice from doctor without necessarily coming in contact with them.
        </p>
        <div class="mt-2 font-bold text-green-600">D</div>
        <p>
          The medical officers will be able to interact with patients despite the distance and those with complications can be identified and brought in for further interventions.
          <br />The system through its online aspect, is able to reduce contact between people. This is vital in place of a disease outbreaks such as the COVID-19 or Ebola
        </p>
      </div>
    </div>
    <FooterSection></FooterSection>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import FooterSection from "./FooterSection";

export default {
  name: "LandingPage",
  components: {
    NavBar,
    FooterSection,
  },
};
</script>

<style scoped>
input,
select {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
select {
  @apply bg-white text-black;
}
</style>
