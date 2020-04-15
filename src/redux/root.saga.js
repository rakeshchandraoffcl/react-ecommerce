import { all, call } from "redux-saga/effects";
import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";

export default function* () {
    yield all([call(cartSagas), call(userSagas), call(shopSagas)]);
}
