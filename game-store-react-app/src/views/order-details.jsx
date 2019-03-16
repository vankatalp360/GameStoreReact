import React, { Fragment, Component } from 'react';
import OrdersService from '../services/orders-service';
import OrderCard from '../components/order-card';

class OrderDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
            orders: [],
            isLoading: false,
            order: {}
        }
    }

    orderDetails = (order) => {

    }

    static OrdersService = new OrdersService();

    render() {
        const { orders } = this.state;
        if (!orders.length) {
            return (
                <div>
                    <br/>
                    <h2>No orders in your list!</h2>    
                </div>
            );
        }

        return (
            <Fragment>
                <div className="container" style={{paddingTop: "25px"}}>
                <h1 className="text-center">My Orders</h1>
                <div className="row" style={{paddingTop: "25px"}}>
                    <div className="col-md-12" id="customer-orders">
                    <div className="box">
                        <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orders.map(order => (
                                    <OrderCard key={order._id} order={order} orderDetail={this.orderDetails} />
                                ))
                            }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </Fragment>
        );
    }

    async componentDidMount() {
        try {
            const orders = await OrderDetails.OrdersService.getUserOrders();

            this.setState({ orders });
        } catch (error) {
            console.error(error);
        }
    }
};


export default OrderDetails;