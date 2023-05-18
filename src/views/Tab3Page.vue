<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Logn Out</ion-title>
        </ion-toolbar>
      </ion-header>
      <LognOut />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LognOut from './LogIn_LogOut_Create-Account/LognOut.vue';
</script>
