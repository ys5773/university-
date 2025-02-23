import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9EHesVUzRVfl6tmoQVK3suGGhofJQKAg",
  authDomain: "university-7ef98.firebaseapp.com",
  projectId: "university-7ef98",
  storageBucket: "university-7ef98.appspot.com", // Fixed incorrect URL
  messagingSenderId: "175974780891",
  appId: "1:175974780891:web:022970c50513d148dee1fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveLikedUniversity = async (university: any) => {
  try {
    await addDoc(collection(db, "likedUniversities"), university);
    console.log("University saved:", university);
  } catch (error) {
    console.error("Error saving university:", error);
  }
};

export const getLikedUniversities = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "likedUniversities"));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching liked universities:", error);
    return [];
  }
};
