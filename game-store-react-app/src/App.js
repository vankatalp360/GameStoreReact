import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider, defaultUserState } from './components/contexts/user-context';
import AuthorizedRoute from './components/authorized-route'
import AdminRoute  from './components/admin-route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header';
import Footer from './components/footer';
import Home from './views/home';
import Login from './views/login';
import Store from './views/store';
import CreateGame from './views/create-game';
import EditGame from './views/edit-game';
import DeleteGame from './views/delete-game';
import Cart from './views/cart';
import PendingOrders from './views/pending-orders';
import GameDetails from './views/game-details';
import MyOrders from './views/my-orders';
import Register from './views/register'
import NotFound from './views/not-found';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    const userFromStorage = window.localStorage.getItem('user');
    let parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser,
        updateUser: this.updateUser
      }
    };
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  logout = () => {
    window.localStorage.clear();
    this.setState({ 
      user: {
      ...defaultUserState,
      updateUser: this.updateUser
    }});
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <Router>
          <Fragment>
            <UserProvider value={user}>
              <Header logout={this.logout}/>
              <ToastContainer/>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <AdminRoute path="/admin/create" exact component={CreateGame} />
                  <AdminRoute path="/admin/game/edit/:id" exact component={EditGame} />
                  <AdminRoute path="/admin/game/delete/:id" exact component={DeleteGame} />
                  <AdminRoute path="/admin/orders/pending" exact component={PendingOrders} />
                  <AuthorizedRoute path="/store" exact component={Store} />
                  <AuthorizedRoute path="/details/:id" exact component={GameDetails} />
                  <AuthorizedRoute path="/cart" exact component={Cart} />
                  <AuthorizedRoute path="/orders" exact component={MyOrders} />
                  <Route component={NotFound}/>
                </Switch>
              <Footer/>
            </UserProvider>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
