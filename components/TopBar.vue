<template>
  <header class="topbar">
    <div class="logo">
      <ReborrnLogo />
    </div>
    <div class="menu">
      <Avatar />
    </div>
  </header>
</template>

<script setup>
import ReborrnLogo from "@/components/icons/ReborrnLogo.vue";
import Avatar from "@/components/Avatar.vue";
</script>

<style scoped>
.topbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 24px auto;
  border-radius: 12px;
  border: 1px solid var(--color-6);
  background: var(--color-7);
}
.logo {
  flex: 0 0 auto;
  padding: 24px 32px;
}
.menu {
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 24px 32px;
}
</style>
