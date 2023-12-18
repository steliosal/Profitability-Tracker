<template>
  <div class="page">
    <Topbar class="topbar" />
    <div class="maincontent">
      <h1>Thank You for Your Submission!</h1>
      <h3>See you next week 😎</h3>
      <img
        class="gif-image"
        src="https://media.giphy.com/media/3o6wred0KQ8Vx5fmYE/giphy.gif"
        alt="Thank You"
      />
    </div>
  </div>
</template>

<script setup>
import Topbar from "@/components/TopBar.vue";
</script>

<style scoped>
.page {
  display: grid;
  grid-template-areas:
    "topbar"
    "maincontent";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: var(--page-max-width);
  min-height: 50vh;
  margin: 0 auto;
  padding: 0 15px;
}
.topbar {
  grid-area: topbar;
}
.maincontent {
  grid-area: maincontent;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
}

h1 {
  font-weight: 20px;
}

h3 {
  font-size: 15px;
  font-weight: 400;
}
.gif-image {
  display: block;
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-top: 40px;
}
</style>
