import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "../stylesheets/cart.css";
import { Link } from 'react-router-dom';

export default class BrowseProducts extends Component {

    render() {
        return (
            <div className="container">
                <h3>Check Out</h3>
                <div>
                    {getCartItems()}
                </div>
                <div style={{position:'relative', textAlign:'right'}} className='subtotal'><div>Subtotal: ${getSubTotal()}</div></div>
                <div style={{position:'relative', textAlign:'right'}} className='taxes'><div>Sales Tax: ${getSalesTax()}</div></div>
                <div style={{position:'relative', textAlign:'right'}} className='taxes'><div>Shipping: ${getShipping()}</div></div>
                <div style={{position:'relative', textAlign:'right'}} className='totalPrice'><div>Final Price: ${getFinalPrice()}</div></div>
                <div>
                    {this.getCreditForm()}
                </div>
                <div id="orderSubmit"></div>
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.onChangeCard = this.onChangeCard.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            orderNum: '',
            orderUser: '',
            orderUserID: '',
            orderPrice: '',
            orderItems: '',
            shippingAddress: '',
            cardNumber: '',
            expDate: '',
            cardName: '',
            secCode: '',
        }

    }

    onChangeCard(e) {
        this.setState({
            cardNumber: e.target.value,
        });
        console.log(JSON.parse(localStorage.getItem('user')).name);
    }

    onChangeDate(e) {
        this.setState({
            expDate: e.target.value,
        });
    }

    onChangeName(e) {
        this.setState({
            cardName: e.target.value,
        });
    }

    onChangeCode(e) {
        this.setState({
            secCode: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let d = new Date();

        const order = {
            orderNum: d.getTime(),
            orderUser: JSON.parse(localStorage.getItem('user')).name,
            orderUserID: JSON.parse(localStorage.getItem('user')).username,
            orderPrice: getFinalPrice(),
            shippingAddress: (JSON.parse(localStorage.getItem('user')).streetAddress + '. ' + JSON.parse(localStorage.getItem('user')).city + ', ' + JSON.parse(localStorage.getItem('user')).state + ' ' + JSON.parse(localStorage.getItem('user')).zip),
            orderItems: JSON.parse(localStorage.getItem('cart')),
            cardNumber: this.state.cardNumber,
            expDate: this.state.expDate,
            cardName: this.state.cardName,
            secCode: this.state.secCode,
        }

        console.log(order);

        axios.post('http://localhost:5000/order/add', order)
            .then(res => console.log(res.data));

        ReactDOM.render(<div>Your order has been submitted</div>, document.getElementById('login-container'));
    }
    
    getCreditForm() {
        return (
            <div id="login-container">
                <form onSubmit={this.onSubmit}>
                    <div className="login-input"><label>Credit Card #: </label><input maxLength="16" type="text" required value={this.state.username} onChange={this.onChangeCard}></input></div>
                    <div className="login-input"><label>Expiration: </label><input maxLength="5" type="text" placeholder="MM/YY" required value={this.state.password} onChange={this.onChangeDate}></input></div>
                    <div className="login-input"><label>Security Code: </label><input maxLength="3" type="text" required value={this.state.name} onChange={this.onChangeCode}></input></div>
                    <div className="login-input"><label>Name on Card: </label><input type="text" required value={this.state.streetAddress} onChange={this.onChangeName}></input></div>
                    <div style={{textAlign:'right', paddingTop:'8px'}}><input style={{backgroundColor:'mediumseagreen', border:'0px', padding:'6px', cursor:'pointer'}} type="submit" value="Place Order"></input></div>
                </form>
            </div>
        )}
    
}

function getShipping() {
    return 4.99;
}

function getSalesTax() {
    return (getSubTotal() * .0575).toFixed(2);
}


function getFinalPrice() {
    return (Number(getSubTotal()) + Number(getSalesTax()) + getShipping()).toFixed(2);
}

function getCartItems() {
    console.log(localStorage.getItem('cart'))
    //var cartArray = localStorage.getItem("cart");
    var cartArray;
    if (localStorage.getItem('cart') == null) {
        cartArray = [];
    } else {
        cartArray = JSON.parse(localStorage.getItem("cart"));
    }
    var newCart;
    console.log(cartArray);
    var cart = [];
    let subTotal;
    if (cartArray.length > 0) { 
        for (let i = 0; i < cartArray.length; i++) {
            let cartObj = JSON.parse(localStorage.getItem("cart"))[i];
            let cartItem =  <div className='cartItem' key={i}>
                            <div className='cartName'>{cartObj.name}</div>
                            <div className='cartPrice'>${cartObj.price}</div>
                            <div className='cartThumb'><img src={cartObj.thumb} alt='product image'></img></div>
                        </div>
            cart.push(cartItem);
            subTotal += cartObj.price;
        }
    } else {
        cart = "The cart is empty."
    }

    return cart;
}

function getSubTotal() {
    var cartArray;
    if (localStorage.getItem('cart') == null) {
        cartArray = [];
    } else {
        cartArray = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(cartArray);
    let subTotal = 0;
    if (cartArray.length > 0) { 
        for (let i = 0; i < cartArray.length; i++) {
            let cartObj = JSON.parse(localStorage.getItem("cart"))[i];
            subTotal += Number(cartObj.price);
        }
    } else {
        subTotal = 0;
    }
    return subTotal.toFixed(2);
}

