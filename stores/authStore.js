
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const username = ref('')
  const isLoggedIn = ref(false)

  function login(user) {
    username.value = user;
    isLoggedIn.value = true;
  }

  function logout() {
    username.value = '';
    isLoggedIn.value = false;
  }

  return { username, isLoggedIn, login, logout }
})
