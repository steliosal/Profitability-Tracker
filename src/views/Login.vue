<template>
  <div class="page">
    <header>
      <ReborrnLogo />
    </header>
    <main>
      <h1>Hey REBORRNian!</h1>
      <h2>
        Ready to update your weekly grind? <br />
        Sign in to get started.
      </h2>
      <div class="button-container">
        <Button type="primary" size="normal" :click="onLoginButtonClick">
          <template #icon>
            <GoogleIcon />
          </template>
          Sign in with Google
        </Button>
        <div v-if="loading" class="spinner-overlay">
          <div class="spinner"></div>
        </div>
      </div>
    </main>
    <footer>
      <div class="copyright">
        Copyright © 2023 REBORRN Ltd All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ReborrnLogo from "@/components/icons/ReborrnLogo.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const loading = ref(false);

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

function onLoginButtonClick() {
  loading.value = true;

  authStore.login("Dimosthenis Papakonstantinou");

  setTimeout(() => {
    loading.value = false;
    if (isLoggedIn.value) {
      router.push({ name: "home" }); // Navigate to the home page if logged in
    }
  }, 1200);
}
</script>

<style scoped>
.page {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  min-height: 100vh;
  padding: 0 15px;
}
header {
  flex: 0 0 auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
}
main {
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
}
footer {
  flex: 0 0 auto;
  display: block;
  width: 100%;
}
h1 {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  color: var(--text-color);
  text-align: center;
  font-size: 36px;
  font-weight: 600;
}
h2 {
  display: block;
  width: 100%;
  margin: 20px 0 0;
  padding: 0;
  color: var(--color-3);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
}
.copyright {
  display: block;
  width: 100%;
  text-align: center;
  padding: 50px;
  color: var(--color-4);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}

.button-container {
  position: relative;
  display: inline-block;
  margin: 30px 0;
}

.spinner-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 200%);
  display: grid;
  place-items: center;
}

.spinner {
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: conic-gradient(
    from 180deg at 50% 50%,
    rgba(82, 0, 255, 0) 0deg,
    #ffffff 360deg
  );
  animation: spin 2s infinite linear;
}
.spinner::before {
  content: "";
  border-radius: 50%;
  width: 85%;
  height: 85%;
  background: var(--color-7);
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
