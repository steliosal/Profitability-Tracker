import { isWithinWeek } from "@/helpers";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useWorkStore = defineStore("workStore", () => {
  const selectedDate = ref(new Date());

  const work = ref([
    // { id: 0, date: new Date(), projectId: 0, progress: 0}] },
  ]);

  const weekWork = computed(() => {
    return work.value.filter((workEntry) =>
      isWithinWeek(workEntry.date, selectedDate.value)
    );
  });

  const totalWeekProgress = computed(() => {
    return weekWork.value.reduce(
      (total, workItem) => total + workItem.progress,
      0
    );
  });

  const setSelectedDate = (newDate) => {
    selectedDate.value = newDate;
  };

  const addWork = (date, projectId, progress) => {
    const id = `${date.valueOf()}${projectId}`;
    const isAlreadyStored = weekWork.value.some(
      (workItem) => workItem.id === id
    );
    if (!isAlreadyStored) {
      work.value.push({
        id,
        date,
        projectId,
        progress,
      });
    }
  };

  const removeWork = (workItemId) => {
    work.value = work.value.filter((workItem) => workItem.id !== workItemId);
  };

  const updateWork = (workItemId, progress) => {
    work.value = work.value.map((workItem) => {
      if (workItem.id === workItemId) {
        return {
          ...workItem,
          progress: progress,
        };
      } else {
        return workItem;
      }
    });
  };

  return {
    work,
    selectedDate,
    setSelectedDate,
    weekWork,
    addWork,
    updateWork,
    removeWork,
    totalWeekProgress,
  };
});
