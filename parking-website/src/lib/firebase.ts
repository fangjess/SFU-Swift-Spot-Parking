import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import type ParkingInfo from "./ParkingInfo.svelte";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfVpJmNgC0Yt7xcxxpPHwXIrMbopzUE1s",
  authDomain: "stormhacks-2024-6f854.firebaseapp.com",
  projectId: "stormhacks-2024-6f854",
  storageBucket: "stormhacks-2024-6f854.appspot.com",
  messagingSenderId: "360173476909",
  appId: "1:360173476909:web:658c2a62542b3fe984aca4",
  measurementId: "G-65CXNZ8862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function getAllParking(){
    const docs = await getDocs(collection(db, "parkings"));
    const infos : ParkingInfo[] = [];
    docs.forEach(item=>{
       infos.push(item.data() as ParkingInfo  )
    })
    return infos;
}
