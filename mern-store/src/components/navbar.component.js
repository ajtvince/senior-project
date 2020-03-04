import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../stylesheets/nav.css";


export default class Navbar extends Component {
    render() {
        return (

            <div id="nav">
                <img src="" id="logo" alt="logo"></img>
                <div id="menu" onClick={navAnim}>
                    <div></div>
                    <div id="opacity-bar" style={{opacity:1}}></div>
                    <div></div>
                </div>
                
                <div id="menu-options">
                    <div><Link to="/" onClick={navAnim}>Home</Link></div>
                    <div><Link to="/products" onClick={navAnim}>Browse</Link></div>
                    <div><a href="/cart">Cart</a></div>
                    <div><span>support@hollowbay.com</span></div>
                </div>
            </div>

        );
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