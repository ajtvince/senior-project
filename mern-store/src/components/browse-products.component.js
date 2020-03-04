import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../stylesheets/browse.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const Product = props => (
    <div>
        <div className="prdContainer">
            <div className="prdImg">{props.product.productThumb}</div>
            <div className="prdName">{props.product.productName}</div>
            <div className="prdDesc">{props.product.productDescription}</div>
            <div className="prdPrice">{props.product.productPrice}</div>
            <div className="goToPrd"><FontAwesomeIcon icon={faArrowCircleRight} /></div>
        </div>
    </div>
)

export default class BrowseProducts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/')
            .then(response => {
                console.log(response);
                this.setState({
                    products: response.data
                })
            })
            .catch((error) => {
                console.log("THIS IS AN ERRROR" + error)
            })
    }

    productList() {
        return this.state.products.map(product => {
            return <Product product={product} />
        })
    }
    
    render() {
        return (

            <div className="container">
                <h2>Browse</h2>
                <div className="browseContainer">
                {this.productList()}
                </div>
            </div>

        );
    }
    
}
