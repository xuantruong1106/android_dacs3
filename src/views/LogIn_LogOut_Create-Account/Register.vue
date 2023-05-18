<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-h1 style="text-align: center">Tạo Tài Khoản</ion-h1>
      <form @submit.prevent="HandleSubmit">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model.trim="Email" type="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Tên đăng nhập</ion-label>
          <ion-input v-model.trim="UserName" type="text" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mật khẩu</ion-label>
          <ion-input v-model.trim="Pass" type="password" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mật khẩu</ion-label>
          <ion-input v-model.trim="PassAg" type="password" required></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">Đăng kí</ion-button>
      </form>
      <ion-item>
        <ion-button href="/">đăng nhập</ion-button>
        <ion-button href="/ForgotPass" style="padding-left: 15%">quên mật khẩu</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonButton,
  IonLabel,
  IonItem,
  IonContent,
  IonInput,
  useIonRouter,
} from "@ionic/vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, Auth1 } from "../../configs/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
export default defineComponent({
  name: "Register",
  components: {
    IonPage,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
  },
  setup() {
    const router = useIonRouter();
    const Email = ref();
    const Pass = ref();
    const PassAg = ref();
    const UserName = ref();
    const auth = Auth1;
    var MsgPass = "";
    const HandleSubmit = async () => {
      if (Pass.value == PassAg.value) {
        await createUserWithEmailAndPassword(auth, Email.value, Pass.value)
          .then((userCredential) => {
            console.log("done"); 
            const newUser = ref({
              UserName: UserName,
              Email: Email,
              TypeUser: "0",
              Active: "1",
              UID: userCredential.user.uid,

            });
            const usersCollection = collection(db, "user");
            setDoc(doc(usersCollection), newUser.value);
            console.log("Add User Successfully!");
            newUser.value = {UserName: "", TypeUser: "0", Active: "1", UID: "", Email: ""}
            return router.push({
              name: "Login",
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      } else {
        MsgPass = "mật khẩu không khớp";
      }
    };
    return { Email, Pass, PassAg, MsgPass, UserName, HandleSubmit };
  },
});
</script>

<style></style>
