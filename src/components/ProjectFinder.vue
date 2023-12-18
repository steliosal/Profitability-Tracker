<template>
  <div class="project-finder">
    <div class="title">Find project</div>

    <div class="searchbox">
      <input
        type="seach"
        placeholder="Search..."
        class="input-text"
        v-model="searchQuery"
      />
      <div class="drop-down-button" @click="toggleDropdown">
        <ArrowDown />
      </div>
      <div
        class="all-projects-dropdown"
        ref="dropdown"
        v-if="isDropdownVisible"
      >
        <div class="dropdown-list">
          <div
            class="dropdown-item"
            v-for="project in projects"
            :key="project.id"
            @click="selectProject(project)"
          >
            {{ project.title }}
          </div>
        </div>
      </div>
    </div>

    <div class="suggestions">
      <div class="suggestions-title">Suggested Projects</div>
      <div class="suggestions-list">
        <div
          class="suggestions-list-item"
          v-for="project in filteredProjects"
          :key="project.id"
          @click="selectProject(project)"
        >
          {{ project.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref } from "vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { storeToRefs } from "pinia";
import ArrowDown from "./icons/ArrowDown.vue";

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);

const searchQuery = ref("");
const isDropdownVisible = ref(false);
const dropdown = ref(null);

const emit = defineEmits(["project-selected"]);

const selectProject = (project) => {
  emit("project-selected", project);
};

const filteredProjects = computed(() => {
  let result = projects.value;
  // Filter the projects if searchQuery is not empty
  if (searchQuery.value) {
    result = result.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  // Return only the first 5 elements
  return result.slice(0, 5);
});

let clickOutsideHandler;

const toggleDropdown = (event) => {
  event.stopPropagation();
  isDropdownVisible.value = !isDropdownVisible.value;
};

const closeDropdown = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isDropdownVisible.value = false;
  }
};
// Set up global click event listener
onMounted(() => {
  clickOutsideHandler = (event) => closeDropdown(event);
  window.addEventListener("click", clickOutsideHandler);
});

// Clean up
onUnmounted(() => {
  window.removeEventListener("click", clickOutsideHandler);
});
</script>

<style scoped>
.project-finder {
  position: relative;
  display: block;
  padding: 36px 32px;
  border-radius: 12px;
  border: 1px solid var(--color-6);
  background: var(--color-7);
}
.title {
  color: var(--color-1);
  font-size: 22px;
  font-weight: 600;
}
.searchbox {
  --dropdown-button-size: 40px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  margin-top: 12px;
  border-radius: 4px;
  border: 1px solid var(--color-9);
  background: var(--color-2);
}
.input-text {
  flex: 1;
  display: block;
  width: calc(100% - var(--dropdown-button-size));
  margin: 0;
  padding: 16px;
  border: none;
  box-shadow: none;
  background: transparent;
  color: var(--color-1);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
.input-text::placeholder {
  color: var(--color-11);
}
.all-projects-dropdown {
  position: absolute;
  width: 300px;
  height: 400px; /* Set a reasonable max height */
  top: 100%; /* Position just below the search box */
  left: 0;
  margin-top: 10px;

  border-radius: 8px;
  border: 1px solid var(--color-6);
  z-index: 10; /* Ensure it's above other content */
  overflow: hidden;
  background: var(--color-10);
}

.dropdown-list {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
}
.dropdown-item {
  display: block;
  width: 100%;
  padding: 6px;
  margin: 2px 0;
  cursor: pointer;
  border-radius: 4px;
}
.dropdown-item:hover {
  background-color: var(--color-9); /* Hover effect */
}
.drop-down-button {
  flex: 0 0 var(--dropdown-button-size);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: var(--dropdown-button-size);
  cursor: pointer;
}
.drop-down-button:deep(svg) {
  display: block;
  width: 16px;
  height: auto;
}
.suggestions {
  display: block;
  width: 100%;
  margin-top: 20px;
}
.suggestions-title {
  color: var(--color-1);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
.suggestions-list {
  display: block;
  width: 100%;
  margin-top: 5px;
}
.suggestions-list-item {
  display: inline-block;
  width: auto;
  max-width: 100%;
  margin-top: 5px;
  padding: 6px 12px;
  border-radius: 40px;
  border: 1px solid var(--color-9);
  background: var(--color-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  cursor: pointer;
  color: var(--color-1);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
</style>
