import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAPx5hjRCt4P0eDyuVnKQDENEpu3GNQlvA",
    authDomain: "crwn-db-20096.firebaseapp.com",
    databaseURL: "https://crwn-db-20096.firebaseio.com",
    projectId: "crwn-db-20096",
    storageBucket: "crwn-db-20096.appspot.com",
    messagingSenderId: "256745643420",
    appId: "1:256745643420:web:b7cb0bb5832e142f"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async(collectionName, documents) => {
    const collectionRef = firestore.collection(collectionName);
    // console.log({collectionRef})

    const batch = firestore.batch();
    documents.forEach(doc => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, doc);
    })
    return await batch.commit();
}

export const convertCollectionsToMap = collectionSnapshot => {
    const data = collectionSnapshot.docs.map(docSnapshot => {
        const { title, items } = docSnapshot.data();
        return {
            id: docSnapshot.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items

        }
    })

    return data.reduce((accum,document)=>{
        accum[document.title.toLowerCase()] = document;
        return accum;
    },{});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
