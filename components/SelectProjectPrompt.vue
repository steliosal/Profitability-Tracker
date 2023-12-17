<template>
  <div class="select-project">
    <ProjectIcon />
    <div class="text">Select a project to add it on the list</div>
  </div>
</template>

<script setup>
import ProjectIcon from "@/components/icons/ProjectIcon.vue";
</script>

<style scoped>
.select-project {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.text {
  width: 100%;
  margin-top: 24px;
  text-align: center;
  color: var(--color-3);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
</style>
