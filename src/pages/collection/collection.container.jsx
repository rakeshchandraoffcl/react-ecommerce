import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';
import { isCollectionLoaded } from '../../redux/shop/shop.selectors'


const mapStateToProps = createStructuredSelector({
      isLoading: state => !isCollectionLoaded(state)
})

const Container = compose(connect(mapStateToProps),WithSpinner)(CollectionPage);



export default Container;