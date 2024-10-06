import { initializeApp } from "firebase/app";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, increment, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import type { ParkingLot } from "./types";



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
    const infos : ParkingLot[] = [];
    docs.forEach(item=>{
       infos.push(item.data() as ParkingLot  )
    })
    return infos;
}


export async function onParkingLotChange(onChange: (lotChanges:ParkingLot[])=>void){
  onSnapshot(query(collection(db, "parkings")),(changes)=>{
    const lots : ParkingLot[]= [];
    changes.docs.forEach(parkingDoc =>{
      lots.push(parkingDoc.data()  as ParkingLot);
    })
    onChange(lots);
  } )
}


export async function addParkingRecord(lotName:string, userName:string){
  const docRef = doc(db, "parkings", lotName);
  updateDoc(docRef, {
    parkedusers: arrayUnion(userName),
    current: increment(1)
  })
}

export async function removeParkingRecord(lotName:string, userName:string){
  const docRef = doc(db, "parkings", lotName);
  updateDoc(docRef, {
    parkedusers: arrayRemove(userName),
    current: increment(-1)
  })
}

export async function reportFullness(lotName:string, fullness: number){
  const fetchedDoc = await getDoc(doc(db, "parkings", lotName));
  console.log(fetchedDoc.exists(), lotName);
  
  const oldFullness = (fetchedDoc.data() as ParkingLot).fullness;
  oldFullness[fullness] += 1;

  updateDoc(doc(db, "parkings", lotName), {
    fullness: oldFullness
  })
}



export async function newAPrkingLot(lotName:string) {
  setDoc(doc(db, "parkings", lotName),{
    name:lotName, description:"", fullness: [0,0,0,0,0], current:0, total:999, parkedusers:[]
  } )
}