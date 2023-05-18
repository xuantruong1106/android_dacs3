<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Product
          <ion-button style="padding-left: 20%" href="/tabs/AddProduct">
            Add product
          </ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- <div class="example-content">Product content</div> -->
      <ion-card v-for="show in ShowDataDetail" :key="show.ID">
        <ion-card-header>
          <ion-card-title>{{ show.Ten }}</ion-card-title>
          <ion-card-subtitle>Giá: {{ show.Gia }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Mô tả: {{ show.MoTa }}
          <br />
          Xuất xứ: {{ show.XuatXu }}
          <br />
          Số lượng: {{ show.SoLuong }}
        </ion-card-content>

        <router-link :to="'/tabs/EditProduct/' + show.ID">
          <ion-button style="padding-left: 40%">Edit</ion-button>
        </router-link>
        <router-link :to="'/tabs/DeleteProduct/' + show.ID">
          <ion-button color="danger" >Delete</ion-button>
        </router-link>
      </ion-card>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db, Auth1 } from "@/configs/firebase";
import { ref, onMounted } from "vue";

let idUser = ref(Auth1.currentUser).value?.uid;
let ShowDataDetail = ref([]);
// console.log(idUser)
Auth1.onAuthStateChanged(function (_user) {
  if (_user) idUser = _user.uid;
});
onMounted(async () => {
  let ArrData = [];
  const q = query(
    collection(db, "Product"),
    where("idUser", "==", "RE7cGheNGMgtr8MYpNQ39YbSspq1")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log("dul lieu", doc.id, " => ", doc.data());
    const Data = {
      ID: doc.id,
      Ten: doc.data().Ten,
      Gia: doc.data().Gia,
      MoTa: doc.data().MoTa,
      XuatXu: doc.data().XuatXu,
      SoLuong: doc.data().SoLuong,
    };
    ArrData.push(Data);
  });
  ShowDataDetail.value = ArrData;
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