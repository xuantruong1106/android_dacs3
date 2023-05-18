<template>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title
          >Add product
          <Router-link to="LogOut">
            <ion-button style="padding-left: 25%"> Logout </ion-button>
          </Router-link>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="submitProduct">
        <ion-item>
          <ion-label position="floating">Tên sản phẩm</ion-label>
          <ion-input
            v-model.trim="Ten"
            type="text"
            required
            placeholder="Nhập tại đây"
          ></ion-input>
          </ion-item>
        <ion-item>
          <ion-label position="floating">Giá sản phẩm</ion-label>
          <ion-input
            v-model.trim="Gia"
            type="text"
            required
            placeholder="Nhập tại đây"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mô tả sản phẩm</ion-label>
          <ion-input
            v-model.trim="MoTa"
            type="text"
            required
            placeholder="Nhập tại đây"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Xuất xứ sản phẩm</ion-label>
          <ion-input
            v-model.trim="XuatXu"
            type="text"
            required
            placeholder="Nhập tại đây"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Số lượng sản phẩm</ion-label>
          <ion-input
            v-model.trim="SoLuong"
            type="text"
            required
            placeholder="Nhập tại đây"
          ></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">Thêm</ion-button>
      </form>
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
    const Ten = ref("");
    const Gia = ref("");
    const MoTa = ref("");
    const XuatXu = ref("");
    const SoLuong = ref("");
    const idUser = ref(Auth1.currentUser).value?.uid;
    const router = useIonRouter();

    const submitProduct = async () => {
      if (
        Ten.value == "" &&
        Gia.value == "" &&
        MoTa.value == "" &&
        XuatXu.value == "" &&
         SoLuong.value == "" 
      ) {
        alert("Điền đầy đủ thông tin");
      } else {
        const newProduct = ref({
          Ten: Ten,
          Gia: Gia,
          MoTa: MoTa,
          XuatXu: XuatXu,
          SoLuong: SoLuong,
          idUser: "RE7cGheNGMgtr8MYpNQ39YbSspq1",
        });
        console.log(newProduct.value);
        const ProductCollection = collection(db, "Product");
        await setDoc(doc(ProductCollection), newProduct.value);
        console.log("Add Product Successfully!");

        
        return router.push({
          name: "tab2",
        }),

        Ten.value = "",
        Gia.value = "",
        MoTa.value = "",
        XuatXu.value = "",
        SoLuong.value = "";

      }
    };

    return {
      submitProduct,
      Ten,
      Gia,
      MoTa,
      XuatXu,
      SoLuong,
    };
  },
});
</script>
