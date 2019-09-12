import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './product_form';
import { fetchProduct, updateProduct } from '../../../actions/product_actions';


const mapStateToProps = (state, ownProps) => {

    const defaultProduct = {
        title: '',
        description: '',
        price: 0,
        photoUrl: null,
        seller_id: state.session.id
    };


    const product = state.entities.products[ownProps.match.params.productId] || defaultProduct;
    product['errors'] = state.errors.product
    // Note : This is different than how it was done it create form container
            // because in this case we need to first check if a product exists

    const formType = 'Update Product';


    return {
        product,
        formType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: id => dispatch(fetchProduct(id)),
        action: product => dispatch(updateProduct(product)),
    };
};

class EditProductForm extends React.Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product.id != this.props.match.params.productId) {
            this.props.fetchProduct(this.props.match.params.productId);
        }
    }

    render() {
        const { action, formType, product, errors } = this.props;
        return (
            <ProductForm
                action={action}
                formType={formType}
                product={product}
                errors={errors} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm);