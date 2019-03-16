import React, { Component, Fragment } from 'react';

class OrderCard extends Component {

    orderDetails = (event) => {
        event.preventDefault();
        const { order } = this.props;
        this.props.orderDetails(order);
    }

   render () {

       const { order } = this.props;
       const orderPrice = order.products.reduce(function (accumulator, game) {
        return accumulator + game.price;
        }, 0) || 0;

        return (
            <tr>
                <th>#{order._id}</th>
                <td>{order.date}</td>
                <td>$ {orderPrice.toFixed(2)}</td>
                <td><span className="label label-info">{order.status}</span></td>
                <td><a className="btn btn-outline-warning btn-sm" href="/orders" onClick={this.orderDetails}>View</a></td>
            </tr>
        );
   }
};

export default OrderCard;