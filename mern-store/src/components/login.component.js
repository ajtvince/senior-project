import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import "../stylesheets/login.css";
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            users: '',
            currentUser: [],
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

    async onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(user);

        let userArray;

        await axios.get('http://localhost:5000/users/')
            .then(res => {
                userArray = res.data
            }
            );

        console.log(userArray);

        for (let x = 0; x < userArray.length; x++) {
            if (user.username == userArray[x].username) {
                console.log('account found');
                if (user.password == userArray[x].password) {
                    console.log('login successful');
                    this.setState({currentUser: userArray[x]});
                    console.log(this.state.currentUser);
                    localStorage.setItem('user', JSON.stringify(userArray[x]));
                    ReactDOM.render(<div>{userArray[x].name}, you have been successfully logged in. The page will refresh in <span id="timer">5</span> seconds.</div>, document.getElementById('login-container'));
                    if (true) {
                        var counter = 5;
                        setInterval(function() {
                            counter--;
                            if (counter >= 0) {
                            ReactDOM.render(<span>{counter}</span>, document.getElementById('timer'));
                            }
                            // Display 'counter' wherever you want to display it.
                            if (counter === 0) {
                                window.location.reload();
                            }
                        
                        }, 1000);
                    }
                    break;
                } else {
                    console.log('incorrect password');
                    ReactDOM.render(<div>Incorrect password</div>, document.getElementById('login-error'));
                }
            } else {
                console.log('account not found');
                ReactDOM.render(<div>Account does not exist</div>, document.getElementById('login-error'));
            }
        }

    }
    
    getLoginState() {
        if (localStorage.getItem('user') == null) {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="login-input"><label>Email: </label><input type="text" required value={this.state.username} onChange={this.onChangeUsername}></input></div>
                        <div className="login-input"><label>Password: </label><input type="password" required value={this.state.password} onChange={this.onChangePassword}></input></div>
                        <div style={{textAlign:'center', color:'darkred', paddingTop:4}} id='login-error'></div>
                        <div className="btn-container">
                            <input style={{marginBottom:'8px',cursor:'pointer', fontSize: '18px', border: 'none', width:90, backgroundColor: 'mediumseagreen', color:'white', padding:8}} id="login-btn" type="submit" value="Sign In"></input>
                        </div>
                    </form>
                    <Link style={{textDecoration:'none'}} to='/signup'><div style={{fontSize: '18px',textAlign: 'center', margin:'auto', width:90, backgroundColor: 'mediumseagreen', color:'white', padding:8}}>Sign Up</div></Link>
                </div>
            )
        } else {
            let curUser = JSON.parse(localStorage.getItem('user'));
            return (
                <div>
                    <h3 style={{marginBottom:8}}>{curUser.name}'s Account</h3>
                    <div className='accInfoLabel'>Email: </div><div className='accInfoData'>{curUser.username}</div>
                    <div className='accInfoLabel'>Address: </div><div className='accInfoData'>{curUser.streetAddress}</div>
                    <div className='accInfoLabel'>City: </div><div className='accInfoData'>{curUser.city}</div>
                    <div className='accInfoLabel'>State: </div><div className='accInfoData'>{curUser.state}</div>
                    <div className='accInfoLabel'>Zip: </div><div className='accInfoData'>{curUser.zip}</div>
                    <input style={{border:'none', backgroundColor:'darkred', color:'white', padding:8, marginTop:8}} type='button' onClick={() => {localStorage.removeItem('user'); window.location.reload()}} value='Sign Out'></input>
                </div>
            );
        }
    }

    render() {
        return (

            <div class="container">
                <h2>CROSSED LOGIN</h2>
                <div id="login-container">
                {this.getLoginState()}
                
            </div>
            </div>
            
        );
    }
    
}
