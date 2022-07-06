import firebase from "firebase/app"

import "firebase/firestore"
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCEaDP8ppihFwcIMzKMbMMEpVLTJRP16dw",
    authDomain: "web-replay.firebaseapp.com",
    projectId: "web-replay",
    storageBucket: "web-replay.appspot.com",
    messagingSenderId: "1060846780101",
    appId: "1:1060846780101:web:4e32796c0c7f9b2f0f7aac"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const firestore = firebase.firestore()
const auth = firebase.auth();

export { firestore, auth }
