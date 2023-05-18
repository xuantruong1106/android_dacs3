<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title
          >Order
          <ion-button style="padding-left: 30%" href="/tabs/AddOrder">
            Add order
          </ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card v-for="show in ShowDataDetailOrder" :key="show.ID">
        <ion-card-header>
          <ion-card-title> Đơn hàng</ion-card-title>
          <ion-card-subtitle>
            Trạng thái: {{ show[0].Trang_Thai }}
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Tên người nhận: {{ show[0].NameRev }}
          <br />
          Địa chỉ: {{ show[0].DC }}
          <br />
          Số điện thoại: {{ show[0].Phone }}
          <br />
          Tên sản phẩm: {{ show[0].TenProduct }}
        </ion-card-content>

        <router-link :to="'/user/EditOrder/' + show.ID">
          <ion-button style="padding-left: 40%">Edit</ion-button>
        </router-link>
        <router-link :to="'/user/DeleteOrder/' + show.ID">
          <ion-button color="danger">Delete</ion-button>
        </router-link>
      </ion-card>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
} from "@firebase/firestore";
import { db, Auth1 } from "@/configs/firebase";
import { ref, onMounted } from "vue";
import firebase from "firebase/app";
import "firebase/database";
let idUser = ref(Auth1.currentUser).value?.uid;
let ShowDataDetailOrder = ref([]);
let ShowDataOrder = ref([]);
let ShowNameProduct = ref([]);
Auth1.onAuthStateChanged(function (_user) {
  if (_user) idUser = _user.uid;
});

onMounted(async () => {
  let ArrDataOrder = [];
  let ArrDataProduct = [];
  let fg = [];
  //------------------------------
  const q = query(
    collection(db, "Order"),
    where("ID_ben_gui", "==", "RE7cGheNGMgtr8MYpNQ39YbSspq1")
  );

  //----------------Get data from collection Order-----------
  const querySnapshotOrder = await getDocs(q);
  querySnapshotOrder.forEach((doc) => {
    const Data = {
      ID: doc.id,
      ID_san_pham: doc.data().ID_san_pham,
      Trang_Thai: doc.data().Trang_Thai,
      NameRev: doc.data().NameRev,
      DC: doc.data().DC,
      Phone: doc.data().Phone,
    };
    ArrDataOrder.push(Data);
  });

  ShowDataOrder.value = ArrDataOrder;
  

// Product
  const count = ArrDataOrder.length
  for (let i = 0; i < count; i++) {
    //Product
    const docRefProduct = doc(
      db,
      "Product",
      ShowDataOrder.value[i].ID_san_pham.toString()
    );
    const docSnapProduct = await getDoc(docRefProduct);
    if (docSnapProduct.exists()) {
      ArrDataProduct.push(docSnapProduct.data());
      ShowNameProduct.value = ArrDataProduct;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("Product No such document!");
    }

    const Show = {
      ID: ShowDataOrder.value[i].ID,
      Trang_Thai: ShowDataOrder.value[i].Trang_Thai,
      TenProduct: ShowNameProduct.value[i].Ten,
      NameRev: ShowDataOrder.value[i].NameRev,
      DC: ShowDataOrder.value[i].DC,
      Phone: ShowDataOrder.value[i].Phone,
    };
    let ArrShow = [];
    ArrShow.push(Show);
    ShowDataDetailOrder.value[i] = ArrShow;
  }
});
</script>
<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
