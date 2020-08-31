<template>
  <div>
    <NavBar />
    <div class="mx-8">
      <div class="my-8">
        <div class="text-2xl font-semibold text-green-700">Problem</div>
        <p>
          Doctors who work in busy public hospitals with few medical personnel are exhausted.
          <br />They need to attend to their immunocompromised patients within a short period of time
          <br />Because the patients are suffering from zoonotic, warterborne and diseases resulting from environmental pollution and delays can lead to serious health complications
        </p>
      </div>
      <div class="my-8">
        <div class="text-2xl font-semibold text-green-700">Solution</div>
        <div class="mt-4 font-bold text-green-600">INFORMATION SHARING</div>
        <p>
          The portal is a communication channel between different departments in the healthcare system involving the medical personnel, public health workers and veterinary.
          <br />It enables doctors to consult between each another and report on unfamiliar/unusual/frequent cases in the hospital
        </p>
        <div class="mt-4 font-bold text-green-600">ONLINE APPOINTMENTS</div>
        <p>
          Doctors can schedule/book online meetings prior to hospital visits. This is only done for non-serious conditions. It also allows patients to seek advice from the doctor without physical proximity to them.
          <br />It reduces the doctors' workload, congestion in the hospital and physical proximity during disease outbreaks like COVID-19 or Ebola
        </p>
        <div class="mt-4 font-bold text-green-600">ILLNESS STATISTICS</div>
        <p>
          Using the appointments, data analysis is done on the illnesses and charts are drawn. The charts show top illnesses and emerging illnesses
          <br />It eases disease surveillance. Through this doctors can make necessary interventions and inform their patients on precautionary measures
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
