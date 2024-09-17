// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

// Configurația Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBweC079gmoewXB7vMqg4nMJuZMUhFWE1E",
  authDomain: "mangaro-97aff.firebaseapp.com",
  projectId: "mangaro-97aff",
  storageBucket: "mangaro-97aff.appspot.com",
  messagingSenderId: "954703854255",
  appId: "1:954703854255:web:11b2b2c0b1ac245bfb325a"
};

// Inițializează aplicația Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


// Funcție pentru încărcarea imaginii în Firebase Storage
export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL; // Returnează URL-ul imaginii
};

// Funcție pentru adăugarea manga în Firestore
export const addMangaToFirestore = async (title, description, coverImageUrl, episodes) => {
  try {
    await addDoc(collection(db, 'manga'), {
      title,
      description,
      coverImage: coverImageUrl,
      episodes,
    });
    console.log('Manga adăugată în Firestore');
  } catch (error) {
    console.error('Eroare la adăugarea manga în Firestore:', error);
  }
};

// Funcție pentru a obține toate manga din Firestore
export const getMangaFromFirestore = async () => {
  try {
    const mangaCollection = collection(db, 'manga');
    const mangaSnapshot = await getDocs(mangaCollection);
    const mangaList = mangaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return mangaList;
  } catch (error) {
    console.error('Eroare la obținerea manga din Firestore:', error);
    throw new Error('Failed to fetch manga');
  }
};

// Funcție pentru actualizarea manga în Firestore
export const updateMangaInFirestore = async (id, updatedData) => {
  try {
    const mangaRef = doc(db, 'manga', id);
    await updateDoc(mangaRef, updatedData);
    console.log('Manga actualizată în Firestore');
  } catch (error) {
    console.error('Eroare la actualizarea manga în Firestore:', error);
  }
};

// Funcție pentru ștergerea manga din Firestore
export const deleteMangaFromFirestore = async (id) => {
  try {
    const mangaRef = doc(db, 'manga', id);
    await deleteDoc(mangaRef);
    console.log('Manga ștersă din Firestore');
  } catch (error) {
    console.error('Eroare la ștergerea manga din Firestore:', error);
  }
};

// Funcție simplă pentru a verifica accesul la Firestore
export const testFirestoreAccess = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'manga'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.error('Eroare la accesarea Firestore:', error);
  }
};

// Funcție pentru a obține lista de manga din Firestore
export const getMangaListFromFirestore = async () => {
  try {
    const mangaCollection = collection(db, 'manga');
    const mangaSnapshot = await getDocs(mangaCollection);
    const mangaList = mangaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return mangaList;
  } catch (error) {
    console.error('Error fetching manga list:', error);
    throw new Error('Failed to fetch manga list');
  }
};




export const getMangaByIdFromFirestore = async (id) => {
  try {
    console.log('Fetching manga with ID:', id); // Adaugă log pentru ID
    const mangaRef = doc(db, 'manga', id);
    const mangaDoc = await getDoc(mangaRef);

    if (mangaDoc.exists()) {
      console.log('Manga found:', mangaDoc.data()); // Adaugă log pentru datele manga-ului
      return mangaDoc.data();
    } else {
      throw new Error('Manga not found');
    }
  } catch (error) {
    console.error('Error fetching manga by ID:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};