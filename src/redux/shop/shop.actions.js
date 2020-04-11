import shopTypes from "./shop.types";
import {
    firestore,
    convertCollectionsToMap,
} from "../../firebase/firebase.utils";

export const startFetchingData = () => {
    return {
        type: shopTypes.COLLECTION_FETCHING_START,
    };
};
export const fetchingSuccess = (payload) => {
    return {
        type: shopTypes.COLLECTION_FETCHING_SUCCESS,
        payload,
    };
};
export const fetchingFailed = (payload) => {
    return {
        type: shopTypes.COLLECTION_FETCHING_FAIL,
        payload,
    };
};

export const fetchCollectionDataAsync = () => {
    return (dispatch) => {
        dispatch(startFetchingData());
        const collectionRef = firestore.collection("collections");
        collectionRef
            .get()
            .then((snapshot) => {
                const collectionMap = convertCollectionsToMap(snapshot);
                dispatch(fetchingSuccess(collectionMap));
            })
            .catch((error) => {
                dispatch(fetchingFailed(error.message));
            });
    };
};
