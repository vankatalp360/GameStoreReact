import React, { Component, createContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service'
import { UserConsumer } from '../components/contexts/user-context';
import { toast } from 'react-toastify';

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            error: '',
            isRegister: false
        }
    }

    static service = new AuthenticationService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, username, firstName, lastName, password, confirmPassword } = this.state;

        const credentials = {
            email, 
            username, 
            firstName, 
            lastName, 
            password, 
            confirmPassword
        }

        this.setState({
            error: ''
        }, async () => {
            try {
                if(credentials.password !== credentials.confirmPassword) {
                    throw new Error("Password and Confirm Password doesnt match!");
                }
                const result = await Register.service.register(credentials);
    
                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');

                    throw new Error(errors);
                }
                toast.success("You are register Successfully");
                this.setState({
                    isRegister: true
                })
    
            } catch (error) {
                toast.error(error.toString());
            }
        });
    }

    render () {
        const { email, username, firstName, lastName, password, confirmPassword, error, isRegister } = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        }
        
        if (isRegister) {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div className="form-wrapper">
            {
                error.length
                    ? <div>Something went wrong: {error}</div>
                    : null
            }
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email"
                        placeholder="Enter your e-mail" 
                        value={email}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        placeholder="Enter your username" 
                        value={username}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName"
                        placeholder="Enter your First Name" 
                        value={firstName}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName"
                        placeholder="Enter your Last Name" 
                        value={lastName}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        placeholder="Enter your password" 
                        value={password}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword"
                        placeholder="Enter your password" 
                        value={confirmPassword}
                        onChange={this.handleChange} />
                </div>
                <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

const RegisterWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn}) => (
                    <Register 
                        {...props}
                        isLoggedIn={isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    )
}

export default RegisterWithContext;