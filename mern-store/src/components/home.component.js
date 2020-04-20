import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../stylesheets/home.css";
import banner from '../images/homebanner.png';

export default class Home extends Component {
    render() {
        return (

            <div className="container">
                
                <div id="homeBanner"><img src={banner}></img></div>
                <br/>

                <h2>Most Popular</h2>
                <div><Link to="/products">View All -></Link></div>

            </div>

        );
    }
    
}
