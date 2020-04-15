import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux'
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from './collections-overview.component';
import { selectIsfetching } from '../../redux/shop/shop.selectors'


const mapStateToProps = createStructuredSelector({
      isLoading: selectIsfetching
})

const Container = compose(connect(mapStateToProps),WithSpinner)(CollectionOverview);


export default Container;