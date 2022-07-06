import { firestore } from "./firebase"

const getReplays = async () => {
    const snapshot = await firestore.collection("replays").get()
    snapshot.docs.forEach(doc => console.log(doc.data()))
}

export { getReplays }
