import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../stylesheets/browse.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

/* filters
<div onClick={this.filterList()} className="sortBox"><div>Filter<div><FontAwesomeIcon icon={faFilter} /></div></div></div>
<div className="sortBox"><div>Sort<div><FontAwesomeIcon icon={faSort} /></div></div></div>
 */

let cartArray;

if (localStorage.getItem("cart") != null) {
    cartArray = JSON.parse(localStorage.getItem("cart"));
} else {
    cartArray = [];
}

const Product = props => (
    <div>
        <div className="prdContainer">
            <div className="prdImg"><img alt="Product Image" src={props.product.productThumb}></img><div onClick={() => {
                console.log('clicked');
                let cartItem = { name: props.product.productName, price: props.product.productPrice, thumb: props.product.productThumb};
                cartArray.push(cartItem);
                localStorage.setItem("cart", JSON.stringify(cartArray));
                console.log(cartArray);
                ReactDOM.render(<div id="cartAdded" style={{padding:'14px', textAlign:'center', backgroundColor:'rgba(0,0,0,0.8)', color:'white', width:'auto' }}>{cartItem.name} has been added to the cart <FontAwesomeIcon icon={faShoppingCart} /><div onClick={() => document.getElementById('cartAdded').style.display = 'none'} style={{cursor:'pointer', padding:'4px', position:'absolute', top:'0px', right:'2px'}}>x</div></div>, document.getElementById('addedToCart'));
                document.getElementById('cartAdded').style.display = 'block';
        }} className="prdAddToCart">+</div></div>
            <div className="prdName">{props.product.productName}</div>
            <div className="prdPrice">${props.product.productPrice}</div>

        </div>
    </div>
)

const ProductOutStock = props => (
    <div>
        <div className="prdContainer">
            <div className="prdImg"><img alt="Product Image" src={props.product.productThumb}></img></div>
            <div className="prdName">{props.product.productName}</div>
            <div className="prdPrice">${props.product.productPrice}</div>
            <div className="prdOutStock">Unavailable</div>
        </div>
    </div>
)

const SortBox = props => (
    <div style={{backgroundColor:"red", width:"100px", height:"100px"}}>test</div>
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
                console.log("THIS IS AN ERROR: " + error)
            })
    }

    productList() {

            return this.state.products.map(product => {
                if (product.inStock == true) {
                    return <Product product={product}/>
                } else {
                    return <ProductOutStock product={product} />
                }
            })

    }

    filterList() {
        return <SortBox />
    }
    
    render() {
        return (

            <div className="container">
                <h2 style={{textAlign:"center", paddingTop:"1rem"}}>Browse Our Products</h2>
                <p style={{textAlign:"center", paddingBottom:"2rem"}}>All of our products are made with genuine material in the U.S.A.</p>
                <div className="browseContainer">
                {this.productList()}
                </div>
                <div style={{position:'fixed', left:'0px', right:'0px', bottom:'24px', width:'100%', maxWidth:'400px', margin:'auto'}} id='addedToCart'></div>
            </div>

        );
    }
    
}
