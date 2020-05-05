import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../stylesheets/nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/crossed1.png';


export default class Navbar extends Component {
    render() {
        return (

            <div id="nav">
                <Link style={{textDecoration:'none'}} onClick={navAnim} id="logo" to="/"><img style={{width:'100px', paddingTop:'16px'}} alt='logo' src={logo}></img></Link>
                <div id="menu" onClick={navAnim}>
                    <div></div>
                    <div id="opacity-bar" style={{opacity:1}}></div>
                    <div></div>
                </div>
                <div id="cart-btn"><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link></div>
                
                <div id="menu-options">
                    <div><Link to="/" onClick={navAnim}>Home</Link></div>
                    <div><Link to="/products" onClick={navAnim}>Browse</Link></div>
                    <div><Link to="/cart" onClick={navAnim}>Cart</Link></div>
                    <div><Link to="/login" onClick={navAnim}>{this.getAccStatus()}</Link></div>
                    <div><span>support@store.com</span></div>
                </div>
            </div>

        );
    }

    getAccStatus() {
        if (localStorage.getItem('user') != null) {
            return 'Account';
        } else {
            return 'Sign In';
        }
    }
    
}



function navAnim() {

    if (document.getElementById("opacity-bar").style.opacity === '1') {
        //bur to x
        document.getElementById("menu").getElementsByTagName('div')[0].classList.remove("menu_anim_1_c");
        document.getElementById("menu").getElementsByTagName('div')[2].classList.remove("menu_anim_3_c");

        document.getElementById("menu").getElementsByTagName('div')[0].classList.add("menu_anim_1_o");
        document.getElementById("menu").getElementsByTagName('div')[2].classList.add("menu_anim_3_o");
        document.getElementById("opacity-bar").style.transition = '.15s';
        document.getElementById("opacity-bar").style.opacity = 0;

        //open submenu
        document.getElementById("nav").style.height = "100vh";


    } else if (document.getElementById("opacity-bar").style.opacity === '0') {
        //x to bur
        document.getElementById("menu").getElementsByTagName('div')[0].classList.remove("menu_anim_1_o");
        document.getElementById("menu").getElementsByTagName('div')[2].classList.remove("menu_anim_3_o");

        document.getElementById("menu").getElementsByTagName('div')[0].classList.add("menu_anim_1_c");
        document.getElementById("menu").getElementsByTagName('div')[2].classList.add("menu_anim_3_c");
        document.getElementById("opacity-bar").style.transition = '.15s';
        document.getElementById("opacity-bar").style.opacity = 1;

        //close submenu
        document.getElementById("nav").style.height = "3rem";

    }
}