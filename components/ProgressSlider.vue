<template>
  <div class="container">
    <div
      class="slider-container"
      :class="{ sliding: isSliding }"
      ref="sliderContainerRef"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <div class="progress-outter">
        <div
          class="progress-inner"
          :class="{ sliding: isSliding }"
          :style="{ width: `${progressTemp}%` }"
        ></div>
      </div>
      <div class="snap-points">
        <div class="snap-point" v-for="n in 11"></div>
      </div>
      <div
        class="marker"
        :style="{ left: `${progressTemp}%` }"
        :class="{ sliding: isSliding }"
        @mousedown="onMouseDown"
      ></div>
      <div
        class="marker-label"
        :class="{ sliding: isSliding }"
        :style="{ left: `${progressTemp}%` }"
      >
        {{ progressTempRounded }}
        <div class="triangle-down"></div>
      </div>
    </div>
    <div class="progress-text">{{ progress }}%</div>
    <div class="progress-controls" @click="emitDelete">
      <DeleteIcon />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from "vue";
import DeleteIcon from "./icons/DeleteIcon.vue";

const props = defineProps({
  value: Number,
});

const emit = defineEmits(["on-change", "on-delete"]);
const { value } = toRefs(props);

const progress = ref(value.value);
const progressTemp = ref(value.value);
const progressTempRounded = computed(
  () => Math.round(progressTemp.value / 10) * 10
);
const isSliding = ref(false);
const sliderContainerRef = ref(null);

function onMouseDown(event) {
  isSliding.value = true;
}

function onMouseMove(event) {
  if (isSliding.value) {
    const mouseX = event.clientX;
    const { left, width } = sliderContainerRef.value.getBoundingClientRect();
    const percent =
      100 * Math.max(0, Math.min(1, (mouseX - left) / Math.max(1, width)));
    progressTemp.value = percent;
  }
}

function onMouseUp(event) {
  isSliding.value = false;
  const mouseX = event.clientX;
  const { left, width } = sliderContainerRef.value.getBoundingClientRect();
  const percent = 100 * Math.max(0, Math.min(1, (mouseX - left) / width));
  const percentRounded = Math.round(percent / 10) * 10;
  progress.value = percentRounded;
  progressTemp.value = progress.value;

  // Call emitProgressUpdate when the final progress value is set
  emitProgressUpdate(percentRounded);
}

// Emit progress value when it changes

const emitProgressUpdate = (newProgress) => {
  emit("on-change", newProgress);
};

const emitDelete = () => {
  emit("on-delete");
};
</script>

<style scoped>
.title {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}
.container {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 30px;
  border-radius: 12px;
  border: 1px solid var(--color-16);
  background: var(--color-7);
}
.slider-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
}

.slider-container.sliding {
  cursor: grab;
}

.progress-outter {
  position: relative;
  display: block;
  width: 100%;
  height: 4px;
  border-radius: 100px;
  background: var(--color-17);
  overflow: hidden;
  z-index: 1;
}
.progress-inner {
  display: block;
  height: 100%;
  background: var(--color-12);
  transition: width 0.3s ease-out;
}
.progress-inner.sliding {
  transition: none;
}
.snap-points {
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  left: 0;
  top: 50%;
  margin-top: -1px;
  z-index: 2;
}

.snap-point {
  display: block;
  width: 2px;
  height: 2px;
  border-radius: 100%;
  background-color: var(--color-18);
}

.marker {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  left: 0;
  top: 50%;
  border-radius: 100%;
  background-color: var(--color-12);
  transform: translate(-50%, -50%);
  cursor: grab;
  z-index: 3;
  transition: left 0.3s ease-out;
}
.marker::before {
  content: "";
  position: absolute;
  display: none;
  left: 50%;
  top: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  background: #2196f330;
  z-index: 3;
}
.marker.sliding {
  transition: none;
}
.marker.sliding::before {
  display: block;
}
.marker-label {
  position: absolute;
  display: none;
  width: auto;
  left: 0;
  top: 0;
  padding: 6px 14px;
  border-radius: 4px;
  background: var(--color-19);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.1px;
  transform: translate(-50%, -3px);
  z-index: 4;
}
.marker-label.sliding {
  display: inline-block;
}
.triangle-down {
  position: absolute;
  display: block;
  left: 50%;
  top: 100%;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid var(--color-19); /* Adjust color and size as needed */
  transform: translate(-50%, -3px);
}
.progress-text {
  flex: 0 0 100px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 0 20px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
.progress-controls {
  flex: 0 0 auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.progress-controls:deep(> svg) {
  display: block;
  width: 20px;
  height: auto;
  cursor: pointer;
}
</style>
