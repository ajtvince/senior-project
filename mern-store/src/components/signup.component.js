import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "../stylesheets/login.css";
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStreetAddress = this.onChangeStreetAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            name: '',
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
        }

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeStreetAddress(e) {
        this.setState({
            streetAddress: e.target.value,
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value,
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value,
        });
    }
    onChangeZip(e) {
        this.setState({
            zip: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            streetAddress: this.state.streetAddress,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        ReactDOM.render(<div><div>Thank you for signing up, {this.state.name}.</div><a href="http://localhost:3000/login">Back to Login</a></div>, document.getElementById('confirmLogin'));
    }
    
    getLoginState() {
        return (
            <div id="login-container">
                <form onSubmit={this.onSubmit}>
                    <div className="login-input"><label>Email: </label><input type="text" required value={this.state.username} onChange={this.onChangeUsername}></input></div>
                    <div className="login-input"><label>Password: </label><input type="password" required value={this.state.password} onChange={this.onChangePassword}></input></div>
                    <div className="login-input"><label>Name: </label><input type="text" required value={this.state.name} onChange={this.onChangeName}></input></div>
                    <div className="login-input"><label>Address: </label><input type="text" required value={this.state.streetAddress} onChange={this.onChangeStreetAddress}></input></div>
                    <div className="login-input"><label>City: </label><input type="text" required value={this.state.city} onChange={this.onChangeCity}></input></div>
                    <div className="login-input"><label>State: </label><input type="text" required value={this.state.state} onChange={this.onChangeState}></input></div>
                    <div className="login-input"><label>Zip: </label><input type="text" required value={this.state.zip} onChange={this.onChangeZip}></input></div>
                    <div className="btn-container">
                        <input id="login-btn" type="submit" value="Sign Up"></input>
                    </div>
                </form>
                <div id="confirmLogin"></div>
            </div>
        )}

    render() {
        return (

            <div className="container">
                <h2>CROSSED</h2>
                    {this.getLoginState()}
            </div>
            
        );
    }
    
}
