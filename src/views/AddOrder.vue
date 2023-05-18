<template>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-title
            >Add Order
            <Router-link to="LogOut">
              <ion-button style="padding-left: 25%"> Logout </ion-button>
            </Router-link>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <form @submit.prevent="submitOrder">
          <ion-item>
            <ion-label position="floating"> Tên người nhận </ion-label>
            <ion-input
              v-model.trim="TenRev"
              type="text"
              required
              placeholder="Nhập tại đây"
            ></ion-input>
            </ion-item>
          <ion-item>
            <ion-label position="floating">Số điện thoại người nhận</ion-label>
            <ion-input
              v-model.trim="SDT"
              type="text"
              required
              placeholder="Nhập tại đây"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Địa chỉ người nhận</ion-label>
            <ion-input
              v-model.trim="DC"
              type="text"
              required
              placeholder="Nhập tại đây"
            ></ion-input>
          </ion-item>
          
          <ion-button type="submit" expand="block">Thêm</ion-button>
        </form>
        <ion-item>
            <ion-select aria-label="fruit" placeholder="Select fruit" v-model="SP">
              <ion-select-option value="apples">Apple</ion-select-option>
              <ion-select-option value="oranges">Oranges</ion-select-option>
              <ion-select-option value="bananas">Bananas</ion-select-option>
            </ion-select>
      </ion-item>
      </ion-content>
      
    </ion-content>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { db, Auth1 } from "@/configs/firebase";
  import { collection, setDoc, doc, } from "@firebase/firestore";
  import { useIonRouter } from "@ionic/vue";
  import {
    IonItem,
    IonContent,
    IonButton,
    IonInput,
    IonLabel,
    IonHeader,
    IonTitle,
    IonToolbar
  } from "@ionic/vue";
  
  export default defineComponent({
    name: "AddProduct",
    components: {
      IonItem,
      IonContent,
      IonButton,
      IonInput,
      IonLabel,
      IonHeader,
      IonTitle,
      IonToolbar
    },
    setup() {
      const TenRev = ref("");
      const DC = ref("");
      const SDT = ref("");
      const SP = ref("");
      const idUser = ref(Auth1.currentUser).value?.uid;
      const router = useIonRouter();
        
      console.log('hi', SP.value)
      const submitOrder = async () => {
        if (
            TenRev.value == "" &&
            DC.value == "" &&
            SDT.value == "" &&
            SP.value == ""
        ) {
          alert("Điền đầy đủ thông tin");
        } else {
        //   const newRev = ref({
        //     Ten: TenRev,
        //     DC: DC,
        //     SDT: SDT,
        //   });
        //   const RevCollection = collection(db, "Rev");
        //   await setDoc(doc(RevCollection), newRev.value);
        //   console.log("Add Rev Successfully!");
  
         
  
          return router.push({
            name: "Order",
          });
        }
      };
  
      return {
        submitOrder,
        TenRev,
        DC,
        SDT,
        SP,
      };
    },
  });
  </script>
  