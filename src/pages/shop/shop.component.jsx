import React, { Component } from "react";
import { connect } from "react-redux";
import { startFetchingData } from "../../redux/shop/shop.actions";

import CollectionsOverview from "../../components/collections-overview/collection-overview.container";
import CollectionPage from "../collection/collection.container";
import { Route } from "react-router-dom";

class ShopPage extends Component {
    state = { loading: true };

    componentDidMount() {
        const { startFetchingData } = this.props;
        startFetchingData();
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
    startFetchingData: () => dispatch(startFetchingData()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
