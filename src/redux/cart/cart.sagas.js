import { all, call, put, takeLatest } from "redux-saga/effects";
import { clearCart } from "./cart.actions";
import { UserActionTypes as types } from "../user/user.types";

// GEN_ means generator

function* GEN_clearCart() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(types.SIGN_OUT_SUCCESS, GEN_clearCart);
}

export function* cartSagas() {
    yield all([call(onSignOutSuccess)]);
}
