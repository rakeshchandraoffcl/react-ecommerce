import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShopCollection } from "../../redux/shop/shop.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";

import {
    firestore,
    convertCollectionsToMap,
} from "../../firebase/firebase.utils";

class ShopPage extends Component {
    unsubscribeFromCollections = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");
        collectionRef.onSnapshot((snapshot) => {
            // console.log({ snapshot });
            // console.log(snapshot.docs);
            const collectionMap = convertCollectionsToMap(snapshot);
            updateCollections(collectionMap);
        });
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverview}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collection) =>
        dispatch(updateShopCollection(collection)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
