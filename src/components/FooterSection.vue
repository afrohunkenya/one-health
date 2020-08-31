<template>
  <div>
    <footer class="bg-green-700 text-white flex flex-row p-8 mt-12">
      <section class="mx-4 mt-4 w-1/12">
        <img
          class="max-w-sm"
          src="../../public/img/logo.png"
          alt="Bold Team Logo"
          style="filter: opacity(10%); height:200px;"
        />
      </section>
      <section class="flex flex-col justify-center text-sm w-11/12 p-4 rounded-lg">
        <article class="mb-2">
          <div>
            <a
              class="font-semibold text-xl"
              href="https://afrohun.org/"
            >For the One Health App Development Challenge 2020</a>
          </div>
        </article>
        <p>The USAID One Health Workforce - Next Generation (OHW-NG) project.&nbsp;In collaboration with AFROHUN Kenya</p>
        <p class="mt-4">&copy; 2020 Team Bold &bull; MIT License</p>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>

<style scoped>
</style>
