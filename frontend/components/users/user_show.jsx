import React from 'react';
import {UserShowItem} from './user_show_item';

export class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      products: this.props.user.products,
    };

    this.populateUserProducts = this.populateUserProducts.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.user.id);
  }

  populateUserProducts() {
    return (
      <ul className="user-show-products-ul">
        {this.state.products.map((product) => {
          return <UserShowItem product={product} />;
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="user-show-items-container">
        <h3 style={{color: 'purple'}}>{this.state.user.username}</h3>
        <div
          style={{
            border: '3px solid purple',
            padding: '30px',
            paddingRight: '100px',
          }}
        >
          <p className="user-show-product-list-label">
            Products that this user sells:
          </p>
          {this.populateUserProducts()}
        </div>
      </div>
    );
  }
}
