import admin from "firebase-admin";

try{     
  admin.initializeApp({
    credential: admin.credential.cert('./serviceAccountKey.json'),
    databaseURL: "https://taskfor-6b3ff-default-rtdb.firebaseio.com"
  }) 
} catch(err) {     
  admin.app() 
}

const firestoreAdm = admin.firestore();
const authAdm = admin.auth();

export { firestoreAdm, authAdm };