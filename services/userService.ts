// src/services/userService.ts
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

// Add a new user to Firestore
export const addUserToFirestore = async (
  name: string,
  email: string,
  mobile: string,
  wallet: number
) => {
  try {
    // count existing customers
    const snapshot = await getDocs(collection(db, "customers"));
    const count = snapshot.size + 1;

    // auto-generate customer number (ex: 0001, 0002…)
    const customerNumber = count.toString().padStart(4, "0");

    // create customer document
    const customerRef = await addDoc(collection(db, "customers"), {
      customerNumber,
      name,
      email,
      mobile,
      wallet,
      tier: "Bronze",
      status: "Active",
      points: 0,
      qrCode: "", // updated below
      dateJoined: new Date().toISOString(),
    });

    // use Firestore doc ID as QR value
    const qrValue = customerRef.id;

    // update qrCode field in Firestore with just the ID
    await updateDoc(doc(db, "customers", customerRef.id), {
      qrCode: qrValue,
    });

    return {
      success: true,
      id: customerRef.id,
      customerNumber,
      qrValue, // use this for QR rendering
    };
  } catch (error) {
    console.error("Error adding customer:", error);
    return { success: false, error };
  }
};
