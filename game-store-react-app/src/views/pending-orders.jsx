import React, { Fragment, Component } from 'react';
import OrdersService from '../services/orders-service';
import PendingOrder from '../components/pending-order';
import OrderGame from '../components/order-game';

class PendingOrders extends Component {
    constructor (props) {
        super(props);
        this.state = {
            orders: [],
            isLoading: false,
            order: {}
        }
    }

    orderDetails = (order) => {
        this.setState({
            order
        });
    }

    approveOrder = async (order) => {
        await PendingOrders.OrdersService.approveOrder(order._id);
        this.setState({
            order: {}
        });
        this.componentDidMount();
    }

    static OrdersService = new OrdersService();

    render() {
        const { orders, order } = this.state;
        const games = order.products;
        
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
                <div className="container" style={{paddingTop: "25px;"}}>
                    <h1 className="text-center">Pending Orders</h1>
                    <div className="row" style={{paddingTop: "25px;"}}>
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
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <PendingOrder key={order._id} order={order} orderDetails={this.orderDetails} approveOrder={this.approveOrder}/>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                {
                    order.hasOwnProperty("_id") 
                    ?
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th style={{width: "50px"}}>Product</th>
                            <th style={{width: "10px"}}>Price</th>
                            <th className="text-center" style={{width: "22px"}}>Subtotal</th>
                            <th style={{width: "10px"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                games.map(game => (
                                    <OrderGame key={game._id} game={game} removeGame={this.removeGame} />
                                ))
                            }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td><a className="btn btn-warning" href="/store"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
                            <td colSpan="2" className="hidden-xs"></td>
                            <td className="hidden-xs text-center"><strong>Total ${(games
        .reduce(function (accumulator, game) {
        return accumulator + game.price;
        }, 0) || 0).toFixed(2)}</strong></td>
                        </tr>
                        <td></td>
                        </tfoot>
                    </table>
                    :
                    null

                }
            </Fragment>
        );
    }

    async componentDidMount() {
        try {
            const orders = await PendingOrders.OrdersService.getPendingOrders();

            this.setState({ orders });
        } catch (error) {
            console.error(error);
        }
    }
};


export default PendingOrders;