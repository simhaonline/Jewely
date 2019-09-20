import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";


export class ProductShow extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.imageShow = this.imageShow.bind(this)
    }

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId)
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.productId != this.props.match.params.productId) {
            this.props.fetchProduct(this.props.match.params.productId)
        }
    }
    
    handleAddToCart() {
        const productId = this.props.match.params.productId 
        const quantity = $('.product-show-quantity-dropdown')[0].value

        if (localStorage.cart) {
            let cartProductIdsAndQuantities = JSON.parse(localStorage.getItem('cart'))
            cartProductIdsAndQuantities.push([productId, quantity])
            localStorage.setItem('cart', JSON.stringify(cartProductIdsAndQuantities))
            this.props.fetchCartBadge();
        } else { 
            localStorage.setItem('cart', JSON.stringify([productId, quantity]))
            this.props.fetchCartBadge();
        }
    }
    
    renderSellerUsername() {
        const seller = this.props.seller
        return (
            <div>
                <Link
                    to={`/users/${seller.id}`}
                    className="product-show-seller-username">
                    {seller.username}
                </Link>
            </div>
        )
    }

    imageShow() {
        const product = this.props.product
        
        if (Array.isArray(product.photoUrls)) {
            return (
                <div>
                    <Carousel>
                        {product.photoUrls.map(photoUrl => {
                            return (
                                <div>
                                    <img
                                        src={photoUrl} />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            )
        } else if (typeof (product.photoUrls) === 'string') {
            return (
                <Carousel>
                    <div>
                        <img
                            src={photoUrl} />
                    </div>
                </Carousel>
            )
        } else {
            return null
        }
        // Question ) What is the deal with photoUrls? Why is it only showing one string even though I could have more than once image
    }
    
    render() {
        const product = this.props.product

        if (!product) {
            return <div>Loading...</div>
        }

        let editLink = null;
        if (this.props.currentUserId === product.seller_id) { 
            editLink = <Link 
                className="text-link-underline-hover"
                to={`/products/${product.id}/edit`}
                style={{ padding: '0', textDecoration: 'underline', color: 'rgb(74, 74, 74)'}}>
                    Edit your product listing
            </Link>
        }

        return (
            <div>
                <div className="clearfix product-listing">
                    {/* <div>
                        <img src={`${product.photoUrls[0]}`}  alt="" />
                    </div> */}
                    <div
                        className="product-show-images">
                        {this.imageShow()}
                    </div>


                    <div className="listing-right-column">
                        {this.props.seller ? this.renderSellerUsername() : null}

                        <h1 className="product-show-title">
                            {product.title}
                        </h1>

                        <div>
                            <span className="product-show-price">
                                ${parseFloat(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                {/* Number format source : https://stackoverflow.com/a/14428340/7974948 */}
                            </span>
                        </div>
                        
                        <div className="product-show-quantity-select">
                            <label className="quantity-label">
                                Quantity
                            </label>

                            <select className="product-show-quantity-dropdown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        {/* {this.hasProductInCart() ? this.addToCartAgainButton() : this.addToCartButton()} */}
                        {/* Task : ^^^ Get back to this after asking TA what is wrong with it */}
                            <Link to='/cart'>
                                <button
                                    className="product-show-add-to-cart-button"
                                    onClick={this.handleAddToCart}>
                                    Add to cart
                                </button>
                            </Link> 
                        <br/>
                        {editLink}
                    </div>
                </div>

                <div className="product-show-lower">
                    <div className="product-show-column product-show-column1">
                        <p className="product-show-description-details-label">
                            Details:
                        </p> 
                        <p className="product-show-description">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
