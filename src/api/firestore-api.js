import { 
    collection,
    getDocs, 
    query, 
    doc, 
    getDoc, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    setDoc, 
    where,
    Timestamp
} from "firebase/firestore/lite";
import { db } from "../firestore/firestore";

//Create single issue

export const createIssue = (obj) => {
    const colRef = collection(db, 'issues');
    return addDoc(colRef, obj).id;
}


