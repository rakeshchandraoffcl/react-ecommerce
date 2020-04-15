import { takeLatest, call, put, all } from "redux-saga/effects";
import shopTypes from "./shop.types";
import {
    firestore,
    convertCollectionsToMap,
} from "../../firebase/firebase.utils";
import { fetchingSuccess, fetchingFailed } from "./shop.actions";

function* startAsyncFetch() {
    const collectionRef = firestore.collection("collections");
    try {
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsToMap, snapshot);
        yield put(fetchingSuccess(collectionMap));
    } catch (error) {
        yield put(fetchingFailed(error.message));
    }
}

export function* startFetch() {
    yield takeLatest(shopTypes.COLLECTION_FETCHING_START, startAsyncFetch);
}

export function* shopSagas(){
    yield all([call(startFetch)])
}
