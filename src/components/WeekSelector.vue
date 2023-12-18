<template>
  <div class="week-selector">
    <div class="date-controls">
      <div class="week-button week-button-prev" @click="previousWeek">
        <ChevronLeft />
      </div>
      <div class="week-button week-button-next" @click="nextWeek">
        <ChevronLeft />
      </div>
      <div class="dates-text">{{ currentWorkingWeek }}</div>
    </div>
    <Button
      class="reset-button"
      :class="{ show: !isPristine }"
      type="secondary"
      size="small"
      :click="reset"
      >Back to current week</Button
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
import Button from "./Button.vue";
import ChevronLeft from "./icons/ChevronLeft.vue";
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
  formatDate,
  addDaysToDate,
} from "../helpers";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  defaultDate: {
    type: Date,
    required: true,
  },
});

const emit = defineEmits(["on-change"]);

const onChange = (newDate) => {
  emit("on-change", newDate);
};

const currentWorkingWeek = computed(() => {
  const firstDayOfWeek = getFirstDayOfWeek(props.date);
  const firstDayOfWeekFormatted = formatDate(firstDayOfWeek);
  const lastDayOfWeek = getLastDayOfWeek(props.date);
  const lastDayOfWeekFormatted = formatDate(lastDayOfWeek);
  return `${firstDayOfWeekFormatted} - ${lastDayOfWeekFormatted}`;
});

const isPristine = computed(() => {
  const defaultFirstDayOfWeek = getFirstDayOfWeek(props.defaultDate);
  const defaultFirstDayOfWeekFormatted = formatDate(defaultFirstDayOfWeek);
  const firstDayOfWeek = getFirstDayOfWeek(props.date);
  const dateFormatted = formatDate(firstDayOfWeek);
  return defaultFirstDayOfWeekFormatted === dateFormatted;
});

function previousWeek() {
  const firstDayOfWeek = getFirstDayOfWeek(props.date);
  const newDate = addDaysToDate(firstDayOfWeek, -7);
  onChange(newDate);
}

function nextWeek() {
  const firstDayOfWeek = getFirstDayOfWeek(props.date);
  const newDate = addDaysToDate(firstDayOfWeek, +7);
  onChange(newDate);
}

function reset() {
  const defaultFirstDayOfWeek = getFirstDayOfWeek(props.defaultDate);
  onChange(defaultFirstDayOfWeek);
}
</script>

<style scoped>
.week-selector {
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: flex-start;
}
.date-controls {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--color-9);
  background: var(--color-10);
  user-select: none;
}
.week-button {
  --button-size: 28px;
  flex: 0 0 var(--button-size);
  width: var(--button-size);
  height: var(--button-size);
  cursor: pointer;
}
.week-button:deep(svg) {
  display: block;
  width: var(--button-size);
  height: var(--button-size);
}
.week-button-next:deep(svg) {
  transform: rotateY(180deg);
}
.dates-text {
  flex: 1;
  margin-left: 10px;
  color: var(--color-1);
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}

.reset-button {
  margin-top: 15px;
  visibility: hidden;
}
.reset-button.show {
  visibility: visible;
}
</style>
