import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShopCollection } from "../../redux/shop/shop.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import { Route } from "react-router-dom";

import {
    firestore,
    convertCollectionsToMap,
} from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    unsubscribeFromCollections = null;
    state = { loading: true}

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");
        this.unsubscribeFromCollections = collectionRef.onSnapshot((snapshot) => {
            const collectionMap = convertCollectionsToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({ loading: false})
        });
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
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
