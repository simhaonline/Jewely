import React from 'react';
import { ProductIndexItem } from './product_index_item';

export class ProductIndex extends React.Component {

    componentDidMount() {
        this.props.fetchProducts()
    }

    render() {
        return (
            <div>
                <div className="product-index-list">
                    {this.props.products.map((product, idx) =>
                        <ProductIndexItem
                            key={idx}
                            product={product}
                        />
                    )}
                </div>
            </div>
        )
    }
}