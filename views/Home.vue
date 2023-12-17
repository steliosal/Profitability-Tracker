<template>
  <div class="page">
    <Topbar class="topbar" />

    <Sidebar class="sidebar" @project-selected="onAddProject" />
    <div class="maincontent" v-if="workStore.weekWork.length">
      <WeekProgress :progress="workStore.totalWeekProgress" />
      <div class="projects-progress">
        <ProjectProgress
          v-for="weekProject in workStore.weekWork"
          :key="weekProject.id"
          :id="weekProject.id"
          :projectId="weekProject.projectId"
          :progress="weekProject.progress"
          @on-change="onProjectChange"
          @on-delete="onProjectDelete"
        />
      </div>
      <div class="controls">
        <Button
          :type="`${canSubmit ? 'primary' : 'secondary'}`"
          class="submit-button"
          :class="[{ canSubmit: canSubmit }]"
          :click="onSubmit"
          size="normal"
        >
          <template #icon v-if="canSubmit"> 🚀 </template>
          SUBMIT
        </Button>
        <div class="button-label">
          {{ buttonLabel }}
        </div>
      </div>
    </div>
    <div class="maincontent" v-if="!workStore.weekWork.length">
      <SelectProjectPrompt />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import Topbar from "@/components/TopBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import WeekProgress from "@/components/WeekProgress.vue";
import ProjectProgress from "@/components/ProjectProgress.vue";
import SelectProjectPrompt from "@/components/SelectProjectPrompt.vue";
import Button from "@/components/Button.vue";

import { useWorkStore } from "../stores/workStore";
const workStore = useWorkStore();

const router = useRouter();

const onAddProject = (projectId) => {
  const date = workStore.selectedDate;
  const progress = 0;
  workStore.addWork(date, projectId, progress);
};

const onProjectDelete = (workItemId) => {
  workStore.removeWork(workItemId);
};

const onProjectChange = ({ workItemId, progress }) => {
  workStore.updateWork(workItemId, progress);
};

const canSubmit = computed(() => {
  return workStore.totalWeekProgress === 100;
});

const onSubmit = () => {
  if (canSubmit.value === true) {
    router.push({ name: "submitted" });
  }
};

const buttonLabel = computed(() => {
  if (workStore.totalWeekProgress < 100) {
    return "You must reach 100% to submit";
  }
  if (workStore.totalWeekProgress > 100) {
    return "You must be at 100% to submit";
  }
  return "";
});
</script>

<style scoped>
.page {
  display: grid;
  grid-template-areas:
    "topbar topbar"
    "sidebar maincontent";
  grid-template-rows: auto 1fr;

  grid-template-columns: 320px 1fr;
  width: 100%;
  max-width: var(--page-max-width);
  min-height: 50vh;
  margin: 0 auto;
  padding: 0 15px;
}
.topbar {
  grid-area: topbar;
}
.sidebar {
  grid-area: sidebar;
}
.maincontent {
  grid-area: maincontent;
  padding-left: 30px;
  min-height: 800px;
}
.projects-progress {
  display: block;
  width: 100%;
  margin-top: 45px;
}
.controls {
  display: flex;
  flex-flow: column-reverse nowrap;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
}
.submit-button {
  border: none;
  margin-top: 5px;
}
.button-label {
  display: inline-block;
  width: auto;
  min-height: 26px;
  padding: 6px 12px;
  background-color: var(--color-20);
  color: var(--color-1);
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  visibility: hidden;
}
.submit-button:not(.canSubmit):hover + .button-label {
  visibility: visible;
}
</style>
