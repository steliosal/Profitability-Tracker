<template>
  <div class="container">
    <div class="left" v-if="progress > 100">
      <div class="warning-message">
        <Warning class="warning-message-icon" />
        <div class="warning-message-text">
          We know you are an overachiever, but we need to stay at 100% 🤓
        </div>
      </div>
    </div>
    <div class="right">
      <RingProgress
        :progress="progress"
        :class="[
          'ring-progress',
          {
            'normal-status': progress <= 100,
            'warning-status': progress > 100,
          },
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import RingProgress from "./RingProgress.vue";
import Warning from "@/components/icons/Warning.vue";

defineProps({
  progress: {
    type: Number,
    validator: (value) => {
      return value >= 0; // Ensure it's a non-negative number
    },
    default: 0,
    required: true,
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
}
.left {
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px 0 0;
}
.right {
  flex: 0 0 100px;
  width: 100px;
}

.ring-progress {
  --ring-background-color: transparent;
  --ring-color: var(--color-12);
  --ring-text-color: white;
  --ring-outter-width: 4;
  --ring-inner-width: 4;
}
.normal-status {
  --ring-color: var(--color-12);
}
.warning-status {
  --ring-color: var(--color-13);
}
.warning-message {
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--color-14);
  color: var(--color-15);
}
.warning-message-icon {
  flex: 0 0 auto;
  margin-right: 10px;
}
.warning-message-text {
  flex: 1;
  display: block;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.15px;
}
</style>
