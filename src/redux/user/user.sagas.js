import { takeLatest, put, call, all } from "redux-saga/effects";
import { UserActionTypes as types } from "./user.types";
import { signInSuccess, signInFailed, signOutSuccess,emailSignInStart } from "./user.actions";
import {
    auth,
    googleProvider,
    createUserProfileDocument,
    checkUserAuthentication,
} from "../../firebase/firebase.utils";

function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
        //   console.log(userRef);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    yield takeLatest(types.GOOGLE_SIGN_IN_START, googleSignIn);
}

function* emailSignIn({ payload: { email, password } }) {
    console.log({ email, password });
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
        //   console.log(userRef);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail() {
    yield takeLatest(types.EMAIL_SIGN_IN_START, emailSignIn);
}

function* isAuthenticated() {
    try {
        const userAuth = yield checkUserAuthentication();
        if (!userAuth) return;
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(types.CHECK_USER_SESSION, isAuthenticated);
}

function* signOut(){
    try {
       yield auth.signOut();
       yield put(signOutSuccess()) 
    } catch (error) {
        yield put(signInFailed(error));
    }
}


export function* onSignOut() {
    yield takeLatest(types.SIGN_OUT_START, signOut);
}

function* signUp({payload : { displayName, email, password }}){
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
          );
          yield createUserProfileDocument(user, { displayName });
          yield put(emailSignInStart({email, password}))
        
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onSignUpStart(){
    yield takeLatest(types.SIGN_UP_START, signUp)
}

export function* userSagas() {
    yield all([
        call(signInWithGoogle),
        call(signInWithEmail),
        call(onCheckUserSession),
        call(onSignOut),
        call(onSignUpStart)
    ]);
}
