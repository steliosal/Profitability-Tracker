<template>
  <button
    class="button"
    :class="[
      {
        primary: type === 'primary',
        secondary: type === 'secondary',
      },
      {
        sizeNormal: size === 'normal',
        sizeSmall: size === 'small',
      },
      {
        fullWidth: fullWidth,
      },
    ]"
    @click="click"
  >
    <div class="icon" v-if="!!$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div class="text">
      <slot></slot>
    </div>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    validator: (value) => {
      return ["primary", "secondary"].includes(value);
    },
    default: "primary",
    required: true,
  },
  size: {
    type: String,
    validator: (value) => {
      return ["normal", "small"].includes(value);
    },
    default: "normal",
    required: true,
  },
  click: {
    type: Function,
    required: true,
  },
  icon: {
    type: Object,
    default: null,
    required: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<style scoped>
.button {
  --button-padding: 16px 32px;
  --button-icon-size: 32px;
  --button-font-size: 16px;
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 0;
  padding: var(--button-padding);
  border: none;
  border-radius: 8px;
  box-shadow: none;
  cursor: pointer;
  user-select: none;
}

.sizeNormal {
  --button-padding: 16px 32px;
  --button-font-size: 16px;
  --button-icon-size: 16px;
}
.sizeSmall {
  --button-padding: 6px 12px;
  --button-font-size: 12px;
  --button-icon-size: 12px;
}

.fullWidth {
  display: flex;
  width: 100%;
}
.icon {
  flex: 0 0 var(--button-icon-size);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  width: var(--button-icon-size);
  margin-right: var(--button-icon-size);
}

.icon:deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

.text {
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--button-font-size);
  text-align: left;
  font-style: normal;
  font-weight: 500;
}

.primary {
  background: var(--color-5);
  color: var(--color-1);
}
.secondary {
  background: var(--color-10);
  color: var(--color-1);
  border: 1px solid var(--color-9);
}
</style>
