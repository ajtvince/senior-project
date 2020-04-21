import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../stylesheets/home.css";
import "../stylesheets/browse.css";
import banner from '../images/homebanner.png';


const ProductPopular = props => (
    <div>
        <div className="prdContainer">
            <div className="prdImg"><img alt="Product Image" src={props.product.productThumb}></img></div>
            <div className="prdName">{props.product.productName}</div>
            <div className="prdPrice">${props.product.productPrice}</div>
        </div>
    </div>
)

export default class Home extends Component {
    
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
                console.log("THIS IS AN ERROR: " + error)
            })
    }

    productList() {
            let counter = 0;
            return this.state.products.map(product => {
                counter++;
                if (product.inStock == true && counter < 5) {
                    return <ProductPopular product={product}/>
                }
            })

    }
    
    render() {
        return (

            <div className="container">
                
                <div id="homeBanner"><img src={banner}></img></div>
                <br/>

                <h2>Most Popular</h2>
                    <div className='browseContainer'>
                    {this.productList()}
                    </div>
                <div><Link to="/products">View All -></Link></div>

            </div>

        );
    }
    
}
