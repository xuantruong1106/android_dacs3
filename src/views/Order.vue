<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title
          >Order
          <ion-button style="padding-left: 30%" href="/user/AddOrder">
            Add order
          </ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card v-for="show in ShowDataDetailOrder" :key="show.id">
        <ion-card-header>
          <ion-card-title> Đơn hàng</ion-card-title>
          <ion-card-subtitle>
            Trạng thái: {{ show.Trang_Thai }}
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Tên người nhận: {{ show.TenRev }}
          <br />
          Địa chỉ: {{ show.DC }}
          <br />
          Số điện thoại: {{ show.SDT }}
          <br />
          Tên sản phẩm: {{ show.TenProduct }}
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
let ShowNameRev = ref([]);
let ShowNameProduct = ref([]);

Auth1.onAuthStateChanged(function (_user) {
  if (_user) idUser = _user.uid;
});

onMounted(async () => {
  let ArrDataOrder = [];
  let ArrDataRev = [];
  let ArrDataProduct = [];
  let count = 0;
  // firebase.database().ref("Order").once("value")
  // .then(function(snapshot) {
  //   var count = snapshot.numChildren();
  //   console.log("Số lượng node con: " + count);
  // });
  //------------------------------
  const q = query(
    collection(db, "Order"),
    where("ID_ben_gui", "==", "RE7cGheNGMgtr8MYpNQ39YbSspq1")
  );

  //----------------Get data from collection Order-----------
  const querySnapshotOrder = await getDocs(q);
  querySnapshotOrder.forEach((doc) => {
    // console.log("dul lieu", doc.id, " => ", doc.data());
    const Data = {
      ID: doc.id,
      ID_ben_nhan: doc.data().ID_ben_nhan,
      ID_san_pham: doc.data().ID_san_pham,
      Trang_Thai: doc.data().Trang_Thai,
    };
    ArrDataOrder.push(Data);
  });

  ShowDataOrder.value = ArrDataOrder;

  
  //Rev
  const docRef = doc(db, "Rev", ShowDataOrder.value[0].ID_ben_nhan.toString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    ArrDataRev.push(docSnap.data());
    ShowNameRev.value = ArrDataRev;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("rev No such document!");
  }

  //Product
  const docRefProduct = doc(
    db,
    "Product",
    ShowDataOrder.value[0].ID_san_pham.toString()
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
    ID: ShowDataOrder.value[0].ID,
    Trang_Thai: ShowDataOrder.value[0].Trang_Thai,
    TenProduct: ShowNameProduct.value[0].Ten,
    TenRev: ShowNameRev.value[0].Ten,
    DC: ShowNameRev.value[0].DC,
    SDT: ShowNameRev.value[0].SDT,
  };
  const ArrShow = [];
  ArrShow.push(Show);
  ShowDataDetailOrder.value = ArrShow;
  
  console.log(ShowDataDetailOrder.value)
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