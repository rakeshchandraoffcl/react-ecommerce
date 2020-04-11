import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCollectionDataAsync } from "../../redux/shop/shop.actions";
import { createStructuredSelector } from 'reselect';
import { selectIsfetching,isCollectionLoaded } from '../../redux/shop/shop.selectors'

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import { Route } from "react-router-dom";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    state = { loading: true}

    componentDidMount() {
        const { fetchCollectionDataAsync } = this.props;
        fetchCollectionDataAsync();
    }

    render() {
        const { match,loading,isCollectionLoaded } = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionDataAsync: () =>
        dispatch(fetchCollectionDataAsync()),
});

const mapStateToProps = createStructuredSelector({
    loading: selectIsfetching,
    isCollectionLoaded
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
