import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4mo7sgFXRP8LpeZxt8qLxL9RSgFsD3q0",
    authDomain: "demotest.firebaseapp.com",
    projectId: "demotest",
};

let app

if (!getApps().length) {
    app = initializeApp(firebaseConfig)
}
else {
    app = getApps[0]
}

export const auth = getAuth(app)
export const db = getFirestore(app)

connectAuthEmulator(auth,"http://localhost:9099")
connectFirestoreEmulator(db,'localhost',8080)
