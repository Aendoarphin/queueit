import { Firestore, deleteDoc, setDoc, getDoc, doc } from "firebase/firestore";

const addUser = async(db: Firestore, collPath: string, userName: string, userId: string, userPw: string, userEmail: string, userRole: string) => {
  try {
    const data = { userName, userId, userPw, userEmail, userRole }
    getUser(db, collPath, userId)
    return await setDoc(doc(db, collPath), data)
  } catch (error) {
    console.error(error)
    throw new Error(`Error adding user: ${error}`);
  }
}

const getUser = async(db: Firestore, docPath: string, docId: string) => {
  const docRef = doc(db, docPath, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : {};
}

const setUser = async(db: Firestore, docPath: string, docId: string, data: Object) => {
  await setDoc(doc(db, docPath, docId), data);
}

const deleteUser = async(db: Firestore, docPath: string, docId: string) => {
  await deleteDoc(doc(db, docPath, docId));
}

export { addUser, getUser, setUser, deleteUser };