export const RECEIVE_ALL_PRODUCTS = 'RECEIVE_ALL_PRODUCTS'
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
import * as ProductAPIUtil from '../util/product_api_util';

const receiveProducts = (products) => {
    return {
        type: RECEIVE_ALL_PRODUCTS,
        products
    }
}

const receiveProduct = (product) => {
    return {
        type: RECEIVE_PRODUCT,
        product
    }
}

const removeProduct = (productId) => {
    return {
        type: REMOVE_PRODUCT,
        productId
    }
}

// Action creators ^^^
////////////////////////////////////////////
// Thunk action creators vvv

export const fetchProducts = () => dispatch => {
    return ProductAPIUtil.fetchProducts()
            .then(products => dispatch(receiveProducts(products)))
}

export const fetchProduct = (id) => dispatch => {
    return ProductAPIUtil.fetchProduct(id)
            .then(product => dispatch(receiveProduct(product)))
}

export const createProduct = (product) => dispatch => {
    return ProductAPIUtil.createProduct(product)
            .then(product => dispatch(receiveProduct(product))
            , err => dispatch(receiveErrors(err)))
}

export const updateProduct = (product) => dispatch => {
    return ProductAPIUtil.updateProduct(product)
            .then(product => dispatch(receiveProduct(product))
            , err => dispatch(receiveErrors(err)))
}

export const removeProduct = (productId) => dispatch => {
    return ProductAPIUtil.removeProduct(productId)
            .then(() => dispatch(removeProduct(productId))
            , err => dispatch(receiveErrors(err)))
}