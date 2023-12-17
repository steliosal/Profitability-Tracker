<template>
  <div class="ring-progress-container">
    <svg viewBox="0 0 36 36">
      <path
        class="ring-path-outter"
        fill="none"
        d="M18 2.0845 a
      15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        class="ring-path-inner"
        fill="none"
        :stroke-dasharray="`${progress}, 100`"
        :stroke-linecap="`${roundCorners ? 'round' : 'auto'}`"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155
      15.9155 0 0 1 0 -31.831"
      />
    </svg>
    <div class="ring-progress-content">
      <div class="ring-progress-aligner">{{ progress }}%</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    validator: (value) => {
      return value >= 0 && value <= 100; // Validate range from 0 to 100
    },
    default: 0,
    required: true,
  },
  roundCorners: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<style scoped>
:root {
  --ring-background-color: black;
  --ring-color: red;
  --ring-text-color: white;
  --ring-outter-width: 3.8;
  --ring-inner-width: 2.8;
}
.ring-progress-container {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}
.ring-progress-container:deep(> svg) {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.ring-progress-content {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.ring-progress-aligner {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--ring-text-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  user-select: none;
}
.ring-path-outter {
  stroke: var(--ring-background-color);
  stroke-width: var(--ring-outter-width);
}
.ring-path-inner {
  stroke: var(--ring-color);
  stroke-width: var(--ring-inner-width);
}
</style>
