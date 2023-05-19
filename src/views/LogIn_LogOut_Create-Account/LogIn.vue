<template>
  <ion-page>
    <ion-content class="ion-padding">
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Email đăng nhập</ion-label>
          <ion-input v-model.trim="Email" type="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mật khẩu</ion-label>
          <ion-input v-model.trim="Pass" type="password" required></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">Đăng nhập</ion-button>
      </form>
      <ion-item>
        <!-- <router-link to="/Register">Đăng kí</router-link> -->
        <!-- <router-link to="/tab4" style="padding-left:40%">Quên mật khẩu</router-link> -->
        <ion-button href="/Register">Đăng kí</ion-button>
        <ion-button href="/tab4" style="padding-left: 20%">
          Quên mật khẩu</ion-button
        >
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonList, IonItem, IonInput, useIonRouter } from "@ionic/vue";
import { db, Auth1 } from "../../configs/firebase";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, query, where, collection, getDocs } from "@firebase/firestore";
export default defineComponent({
  name: "LogIn",
  components: {
    IonPage,
    IonInput,
    IonItem,
    IonList,
  },
  setup() {
    let Email = ref("");
    let Pass = ref("");
    const auth = Auth1;
    const router = useIonRouter();
    const handleSubmit = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          getAuth(),
          Email.value,
          Pass.value
        );
        const user = userCredential.user;
        console.log("done");

        const QueryUserName = query(
          collection(db, "user"),
          where("UID", "==", user.uid)
        );
        const querySnapshot = await getDocs(QueryUserName);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const User = doc.data();
          const AccountName = User.UserName;
          return router.push({
            name: "tab1",
          });
        } else {
          throw new Error("Không tìm thấy tài khoản");
        }
      } catch (error) {
        console.error(error);
        alert("Đăng nhập không thành công");
      }
    };

    return {
      Email,
      Pass,
      handleSubmit,
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
<!-- 
// const q = query(
  //   collection(db, "user"),
  //   where("UserName", "==", user.value)
  // );
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   const Show = {
  //     UserName: doc.data().UserName,
  //     PassWord: doc.data().PassWord,
  //   };
  //   if (user.value == Show.UserName && pass.value == Show.PassWord) {
  //     return router.push({
  //       name: "OrderName",
  //       params: { AccountName: Show.UserName },
  //     });
  //   } else {
  //     alert("đăng nhập không thành công");
  //   }
  // }); -->
