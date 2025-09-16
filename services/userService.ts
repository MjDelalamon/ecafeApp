// services/userService.ts
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

export const addUserToFirestore = async (
  lastName: string,
  firstName: string,
  email: string,
  mobile: string
) => {
  try {
    const docRef = await addDoc(collection(db, "customer"), {
      lastName,
      firstName,
      email,
      mobile,
      wallet: 0,
      points: 0,
      status: "Active",
      dateJoined: Timestamp.now(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding user: ", error);
    return { success: false, error };
  }
};
