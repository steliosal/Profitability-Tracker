<template>
  <div class="project-progress">
    <div class="title">{{ project.title }}</div>
    <ProgressSlider
      :key="project.id"
      :value="props.progress"
      @on-change="onChange"
      @on-delete="onDelete"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import ProgressSlider from "@/components/ProgressSlider.vue";
import { useProjectsStore } from "@/stores/projectsStore";

const props = defineProps({
  id: String,
  projectId: Number,
  progress: Number,
});

const emit = defineEmits(["on-change", "on-delete"]);

const projectsStore = useProjectsStore();

const project = computed(() => {
  return projectsStore.getProjectById(props.projectId);
});

function onDelete() {
  emit("on-delete", props.id);
}

function onChange(progress) {
  emit("on-change", { workItemId: props.id, progress });
}
</script>

<style>
.project-progress {
  display: block;
  width: 100%;
}
.title {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}
</style>
