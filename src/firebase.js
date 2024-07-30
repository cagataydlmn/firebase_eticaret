import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNyL2n08rs_HDkr9FpNej8g0rRUsiVgjM",
  authDomain: "dalaman-eticaret.firebaseapp.com",
  projectId: "dalaman-eticaret",
  storageBucket: "dalaman-eticaret.appspot.com",
  messagingSenderId: "1055571855514",
  appId: "1:1055571855514:web:61fa72bc127c0b86737723",
  measurementId: "G-D9QP12GCSS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const db = getFirestore(app);

export const register = async (email, password, name, lastName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    email: user.email,
    name: name,
    lastName: lastName,
  });
  return user;
};

export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const addLike = async (likeItem, uid) => {
  const result = await addDoc(collection(db, "likeItems"), {
    ...likeItem,
    uid: uid,
  });
};

export const getLikeItems = (callback) => {
  return onSnapshot(
    query(
      collection(db, "likeItems"),
      where("uid", "==", auth.currentUser.uid)
    ),
    (snapshot) => {
      const likeItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(likeItems);
    }
  );
};
export const deleteLike = async (id) => {
  try {
    return await deleteDoc(doc(db, "likeItems", id));
  } catch (error) {
    console.log(error.message);
  }
};

export const addComment = async (data) => {
  const result = await addDoc(collection(db, "comments"), data);
};

export const getComment = (callback) => {
  return onSnapshot(query(collection(db, "comments")), (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });
};
export const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return usersList;
};

export const addBasket = async (basketItem, uid) => {
  const basketRef = collection(db, "basketItems");
  const q = query(
    basketRef,
    where("uid", "==", uid),
    where("productId", "==", basketItem.productId)
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const item = querySnapshot.docs[0];
    const itemRef = doc(db, "basketItems", item.id);
    const newQuantity =
      item.data().productQuantity + basketItem.productQuantity;
    await runTransaction(db, async (transaction) => {
      transaction.update(itemRef, { productQuantity: newQuantity });
    });
  } else {
    await addDoc(collection(db, "basketItems"), {
      ...basketItem,
      uid: uid,
    });
  }
};

export const getBasketItems = (callback) => {
  return onSnapshot(
    query(
      collection(db, "basketItems"),
      where("uid", "==", auth?.currentUser?.uid)
    ),
    (snapshot) => {
      const basketItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(basketItems);
    }
  );
};

export const updateBasketItemQuantity = async (itemId, newQuantity) => {
  const itemRef = doc(db, "basketItems", itemId);
  await runTransaction(db, async (transaction) => {
    const itemDoc = await transaction.get(itemRef);
    transaction.update(itemRef, { productQuantity: newQuantity });
  });
};

export const deleteBasketItem = async (itemId) => {
  const itemRef = doc(db, "basketItems", itemId);
  await deleteDoc(itemRef);
};


export const addAdress = async (data) => {
  const result = await addDoc(collection(db, "adresses"), data);
};


export const getAdress = (callback) => {
  return onSnapshot(
    query(
      collection(db, "adresses"),
      where("uid", "==", auth?.currentUser?.uid)
    ),
    (snapshot) => {
      const adres = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(adres);
    }
  );
};
export const deleteAdress = async (uid) => {
  const itemRef = doc(db, "adresses",uid);
  await deleteDoc(itemRef);
};
export { auth, firestore };
export default app;
