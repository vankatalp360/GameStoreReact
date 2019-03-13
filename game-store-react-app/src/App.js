import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider, defaultUserState } from './components/contexts/user-context';
import AuthorizedRoute from './components/authorized-route'

import Header from './components/header'
import Footer from './components/footer'
import Home from './views/home'
import Login from './views/login'
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
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  {/* <AuthorizedRoute path="/create" exact component={CreateGame} /> */}
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
