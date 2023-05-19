<template>

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useIonRouter } from "@ionic/vue";

const router = useIonRouter();

onMounted(async () => {
  if (confirm("thoát khỏi ứng dụng")) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        return router.push({
          name: "Login",
        });
      })
      .catch((error) => {
        // An error happened.
      });
  }else{
    return router.push({
          name: "tab1",
        });
  }
});
</script>

<style>
h1 {
  color: red;
}
</style>
