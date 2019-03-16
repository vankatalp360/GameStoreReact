import React, { Fragment, Component } from 'react';
import GameCart from '../components/game-cart';
import GamesService from '../services/games-service';
import OrdersService from '../services/orders-service';
import { UserConsumer } from "../components/contexts/user-context";

class Cart extends Component {
    constructor (props) {
        super(props);
        this.state = {
            games: [],
            isRemoved: false,
            message: '',
            error: ''
        }
    }

    removeGame = async (game) => {
        const isRemoved = await Cart.GamesService.removeFromCart(game);

        this.setState({
            isRemoved
        });
        
        this.componentDidMount();
    }
    
    createOrder = async () => {
        try {
            const body = this.state.games;
            const result = await Cart.OrdersService.createOrder(body);

            if (!result.success) {
                const errors = Object.values(result.errors).join(' ');
                throw new Error(errors);
            } 
            const message = "Order was created Successfully";
            this.setState({
                message: message,
                games: []
            })
            Cart.GamesService.emptyCart();
        }   catch (error) {
            this.setState({
                error: error.message,
            });
        }
    }
    
    static GamesService = new GamesService();
    static OrdersService = new OrdersService();

    render() {
        const { games } = this.state;
        if (!games.length) {
            return (
                <div>
                    <br/>
                    <h2>No games in your cart!</h2>    
                </div>
            );
        }
        const totalAmount = games
            .reduce(function (accumulator, game) {
            return accumulator + game.price;
            }, 0) || 0;

        return (
            <Fragment>
                <div className="container">
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
                                    <GameCart key={game._id} game={game} removeGame={this.removeGame} />
                                ))
                            }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td><a className="btn btn-warning" href="/store"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
                            <td colSpan="2" className="hidden-xs"></td>
                            <td className="hidden-xs text-center"><strong>Total ${totalAmount.toFixed(2)}</strong></td>
                            <td>
                                <button 
                                    className="btn btn-success btn-block"
                                    onClick={this.createOrder}>Checkout 
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    </div>
            </Fragment>
        );
    }

    componentDidMount() {
        try {
            const games = JSON.parse(window.localStorage.getItem("games")) || [];

            if (games !== "null"){
                this.setState({ games });
            } 

        } catch (error) {
            console.error(error);
        }
    }
};


const CartWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username, id }) => (
                    <Cart {...props} username={username} user={{id}} />
                )
            }
        </UserConsumer>
    )
}

export default CartWithContext;