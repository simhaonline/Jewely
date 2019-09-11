import React from 'react';
import { ProductIndexItem } from './product_index_item';

export class ProductIndex extends React.Component {

    componentDidMount() {
        this.props.fetchProducts()
    }

    render() {
        
        // const products = this.props.products.map((product, idx) => {
        //     return (
                
        //     )
        // })
        console.log(this.props.products)
        return (
            <div>
                <ul className="product-index-ul">
                    {this.props.products.map((product, idx) =>
                        <ProductIndexItem
                            key={idx}
                            product={product}
                        />
                    )}    
                </ul>
            </div>
        )
    }
}