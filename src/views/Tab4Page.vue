<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <ForgotPass />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ForgotPass from './LogIn_LogOut_Create-Account/ForgotPass.vue';
</script>

<style></style>
