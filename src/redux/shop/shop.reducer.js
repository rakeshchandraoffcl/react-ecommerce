import  shopTypes  from './shop.types'

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case shopTypes.COLLECTION_FETCHING_START:
            return {
                ...state,
                isFetching: true
            }
        case shopTypes.COLLECTION_FETCHING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case shopTypes.COLLECTION_FETCHING_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
};

export default shopReducer;
