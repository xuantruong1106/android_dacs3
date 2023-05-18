<template>
    <h1>đang chuyển hướng...</h1>
</template>
<script setup lang="ts">
import { onMounted} from "vue";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { useRoute } from "vue-router";
import { useIonRouter } from "@ionic/vue";

onMounted(async () => {
    const router = useIonRouter();
    const routeVue = useRoute();
    const ID = routeVue.params.IDProduct;
    await deleteDoc(doc(db, "Product", ID.toString() ));
    
    return router.push({
          name: "tab1",
    });
})

</script>

<style>

</style>