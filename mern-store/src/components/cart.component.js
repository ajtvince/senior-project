import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/cart.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default class BrowseProducts extends Component {

    render() {
        return (
            <div className="container">
                <h3>Cart</h3>
                <div>
                    {getCartItems()}
                </div>
                <div style={{position:'relative'}} className='subtotal'>{getSubTotal()}</div>
                <input style={{marginBottom:'8px', marginTop:'28px', backgroundColor:'darkred', color:'white', border:'none', padding:6}} onClick={() => {localStorage.removeItem("cart"); window.location.reload();}} type="button" value="clear cart"></input>
                <div>{getUserLoginStatus()}</div>
            </div>
        );
    }
    
}



//localStorage.clear();

function getUserLoginStatus() {
    console.log(localStorage.getItem('cart'));
    if (localStorage.getItem("user") != null && localStorage.getItem("cart") != null) {
        let curUser = JSON.parse(localStorage.getItem('user'));
        return <div style={{position:'relative'}}>
                    <div style={{padding:12}}>Hi, {curUser.name}. Ready to check out? Click the button below to place your order.</div>
                    <div style={{position:'relative', width:'100%'}}><Link style={{textDecoration:'none'}} to="/checkout"><div style={{width:'100%', padding:12, backgroundColor:'mediumseagreen', color:'white', textDecoration:'none'}}>Contine to Check Out<FontAwesomeIcon icon={faArrowRight} style={{position:'absolute', right:12}}/></div></Link></div>
                </div>
    } else if (localStorage.getItem("user") == null && localStorage.getItem("cart") != null) {
        return <div>Ready to check out? <Link to='/login'>Sign in</Link> to continue.</div>
    } else {
        return <div>Items you add to your cart will appear here.</div>
    }
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
                            <div className='removeFromCart' onClick={() => { cartArray.splice(i, 1); newCart = JSON.stringify(cartArray); localStorage.setItem("cart", newCart); console.log("clicked" + newCart + "num: " + i); window.location.reload(); }}>x</div>
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
    return <div style={{position:'absolute', right:'0px'}}>Subtotal: ${subTotal.toFixed(2)}</div>;
}