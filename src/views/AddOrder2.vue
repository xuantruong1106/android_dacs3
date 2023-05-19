<template>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Order </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="submitProduct">
        <ion-item>
          <ion-label position="floating">Tên người nhận</ion-label>
          <ion-input
            v-model.trim="Ten"
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
        <ion-item>
          <ion-label position="floating">Số điện thoại người nhận</ion-label>
          <ion-input
            v-model.trim="Phone"
            type="text"
            required
            placeholder="Nhập tại đây"
          ></ion-input>
        </ion-item>
        <ion-item>
          <select
            aria-label="fruit"
            placeholder="Select fruit"
            v-model.trim="SP"
          >
            <option
              v-for="show in ShowDataDetail"
              :key="show.ID"
              v-bind:value="{ text: show.Ten }"
            >
              {{ show.Ten }}
            </option>
          </select>
        </ion-item>
        <ion-button type="submit" expand="block">Thêm</ion-button>
      </form>
    </ion-content>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { db, Auth1 } from "@/configs/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "@firebase/firestore";
import { useIonRouter } from "@ionic/vue";
import {
  IonItem,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonHeader,
  IonTitle,
  IonToolbar,
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
    IonToolbar,
  },
  setup() {
    let ShowDataDetail = ref([]);
    const Ten = ref("");
    const DC = ref("");
    const Phone = ref("");
    const SP = ref("");
    const idUser = ref(Auth1.currentUser).value?.uid;
    const router = useIonRouter();
    let Data2 = {};
    onMounted(async () => {
      let ArrData = [];
      const q = query(
        collection(db, "Product"),
        where("idUser", "==", "RE7cGheNGMgtr8MYpNQ39YbSspq1")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const Data = {
          ID: doc.id,
          Ten: doc.data().Ten,
        };
        ArrData.push(Data);
      });
      ShowDataDetail.value = ArrData;
    });

    const submitProduct = async () => {
      const q = query(
        collection(db, "Product"),
        where("Ten", "==", SP.value.text)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        Data2 = {
          ID: doc.id,
        };
      });
      const newProduct = ref({
        NameRev: Ten,
        DC: DC,
        Phone: Phone,
        ID_ben_gui: "RE7cGheNGMgtr8MYpNQ39YbSspq1",
        ID_san_pham: Data2.ID,
        Trang_Thai: "lên đơn",
      });
      console.log(newProduct.value);
        const OrderCollection = collection(db, "Order");
      await setDoc(doc(OrderCollection), newProduct.value);
      console.log("Add Order Successfully!");

      return router.push({
        name: "tab1",
      });
    
    };
    return {
      submitProduct,
      Ten,
      DC,
      Phone,
      ShowDataDetail, 
      SP,
    };
  },
});
</script>
