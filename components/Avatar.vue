<template>
  <div class="avatar-container">
    <div class="avatar" @click="togglePopup">DP</div>
    <div v-if="showPopup" class="popup" ref="popupRef" >
      <div>{{ username }}</div>
      <button @click="logoutUser">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const { username } = authStore; 
const router = useRouter();
const showPopup = ref(false);
const popupRef = ref(null);

function togglePopup() {
  // Toggle the visibility state of the popup
  showPopup.value = !showPopup.value;
}

function logoutUser() {
  authStore.logout();
  router.push({ name: 'login' });
}


function handleClickOutside(event) {
  if (popupRef.value && !popupRef.value.contains(event.target) && !event.target.classList.contains('avatar')) {
    showPopup.value = false;
  }
}
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>

.avatar-container {
  position: relative; 
}

.avatar {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: var(--color-8);
  color: var(--color-1);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.14px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
}

.popup {
  position: absolute;
  top: 120%;
  right: 0;
  min-width: 300px; 
  background-color: var(--color-10);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 100;
  
 
}

.popup div {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 300;
}

.popup button {
  width: 100%;
  padding: 5px 10px;
  color: var(--color-1);
  background-color: var(--color-10);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  text-align: left;
  
}

.popup button:hover {
  color: var(--color-8);
  
}
</style>
