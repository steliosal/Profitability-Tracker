import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectsStore = defineStore("projectsStore", () => {
  const projects = ref([
    { id: 0, title: "Presales Projects" },
    { id: 1, title: "Internal Projects or Rituals" },
    { id: 2, title: "Acronyms & Coke's marketing team" },
    { id: 3, title: "Mouhalis Business Process Options" },
    { id: 4, title: "5-Day Day oof" },
    { id: 5, title: "Rocket Science Simplified" },
    { id: 6, title: "Mystery of the Missing Socks" },
    { id: 7, title: "Time Travelers' Tea Party" },
    { id: 8, title: "Underwater Basket Weaving" },
    { id: 9, title: "Secrets of the Office Fridge" },
    { id: 10, title: "Expedition to the Desk Drawer" },
    { id: 11, title: "Quantum Coffee Brewing" },
    { id: 12, title: "Chasing Rainbows and Unicorns" },
    { id: 13, title: "Dancing with Algorithms" },
    { id: 14, title: "The Art of Napping at Work" },
    { id: 15, title: "Surviving a Meeting Marathon" },
    { id: 16, title: "Escape Room: The Server Room" },
    { id: 17, title: "Journey to the Center of the Codebase" },
    { id: 18, title: "The Great Paperclip Heist" },
    { id: 19, title: "Pirate Talk 101" },
    { id: 20, title: "Yoga with Your Keyboard" },
    { id: 21, title: "Mastering the Art of Slack" },
    { id: 22, title: "Gardening on the Cloud" },
    { id: 23, title: "Building a Castle in the Sandbox" },
    { id: 24, title: "Navigating the Maze of Sticky Notes" },
  ]);

  function updateProjectProgress(projectId, newProgress) {
    const projectIndex = projects.value.findIndex((p) => p.id === projectId);
    if (projectIndex !== -1) {
      projects.value[projectIndex] = {
        ...projects.value[projectIndex],
        progress: newProgress,
      };
    }
  }

  function getProjectById(projectId) {
    return projects.value.find((p) => p.id === projectId);
  }

  return { projects, updateProjectProgress, getProjectById };
});
