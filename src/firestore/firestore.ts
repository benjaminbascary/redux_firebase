import { getFirestore } from "firebase/firestore/lite";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase-config";

export const db = getFirestore();

setPersistence(auth, browserLocalPersistence);




