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
    where 
} from "firebase/firestore/lite";
import { db } from "../firestore/firestore";

//Create

export const createIssue = (obj) => {
    const colRef = collection(db, 'issues');
    return addDoc(colRef, obj).id;
}

//Update

export const updateItem = async (id, obj) => {
    const colRef = collection(db, 'items');
    await updateDoc(doc(colRef, id), obj);
}

//Read

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return {...doc.data(), id: doc.id};
    })
}

export const getItems = async () => {
    const colRef = collection(db, 'items');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

//Read with WHERE


