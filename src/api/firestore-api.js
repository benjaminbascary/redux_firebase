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

// Get all issues

export const getAllIssues = async () => {
    const colRef = collection(db, 'issues');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

// Delete single issue

export const deleteItem = async (id) => {
    const colRef = collection(db, 'issues');
    await deleteDoc(doc(colRef, id));
}









// Entity mapper to get all issues into an array

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}

