<template>
  <ion-page>
    <ion-content class="ion-padding">
      <form @submit.prevent="forgotPass">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model.trim="Email" type="email" required></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">Gửi</ion-button>
      </form>
      <ion-item>
        <ion-button href="/">đăng nhập</ion-button>
        <ion-button href="/Register" style="padding-left: 35%">đăng kí</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonList, IonItem, IonInput, useIonRouter, IonRouterOutlet } from "@ionic/vue";
import { sendPasswordResetEmail } from "firebase/auth";
import {  Auth1 } from "@/configs/firebase";
export default defineComponent({
  name: "forgotPass",
  components: {
    IonPage,
    IonInput,
    IonItem,
    IonList,
    IonRouterOutlet
  },
  setup() {
    let Email = ref("");
    const auth = Auth1;
    const router = useIonRouter();
    const forgotPass = async () => {
      console.log(Email.value);
      try {
        await sendPasswordResetEmail(auth, Email.value);
        confirm("đã gửi thành công");
        router.push({
          name: "Login",
        });
      } catch (error) {
        const errorCode = error
        const errorMessage = error;
        confirm("chưa gửi mã xác nhận, kiểm tra lại Email");
      }
    };

    return {
      Email,
      forgotPass,
    };
  },
});

</script>

<style>
#list {
  border: 1px solid red;
  margin-top: 20%;
}
</style>
