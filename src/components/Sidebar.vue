<template>
  <div class="sidebar">
    <WeekSelector
      :date="workStore.selectedDate"
      :default-date="defaultDate"
      @on-change="onChange"
    />
    <ProjectFinder
      class="project-finder"
      @project-selected="emitProjectSelected"
    />
  </div>
</template>

<script setup>
import { useWorkStore } from "../stores/workStore";
import WeekSelector from "@/components/WeekSelector.vue";
import ProjectFinder from "./ProjectFinder.vue";
import { ref } from "vue";
const emit = defineEmits(["project-selected"]);

const workStore = useWorkStore();

const defaultDate = ref(new Date());

const emitProjectSelected = (project) => {
  emit("project-selected", project.id);
};

const onChange = (newDate) => {
  workStore.setSelectedDate(newDate);
};
</script>

<style scoped>
.sidebar {
  padding: 50px 0;
}
.project-finder {
  margin-top: 20px;
}
</style>
