import { create } from "ionicons/icons";
import { db } from "./firebase";
import { collection, addDoc } from "@firebase/firestore";

export default{
    method: {
        async CreateUser(){
            const ColRef = collection(db, 'user')
            const DataObj1 = {
                UserName: 'Van2',
                PassWord: '12344',
                Email: 'vantruong2@gmail.com',
                TypeUser: '0',
                Active: '1'
            }

            const DocRef = await addDoc(ColRef, DataObj1)
        },
        create(){
            this.CreateUser()
        }
    },

    
}