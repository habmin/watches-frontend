import React from 'react';
import './ShowProducts.css'

function ShowProduct(props) {
  return (


    <div className="show">
      <div className="left">
        <h1 className="showHeader">{props.product.name}</h1>
        <h3 className="showPrice" >${ props.product.price }.00</h3>
        <p>
        <strong> Color: </strong>{ props.product.color } |
        <strong> Material: </strong> { props.product.material }
        </p>
          {
            props.currentUser && props.product.qty
            ? <button className="showButton" type="button" onClick={() => props.addToCart(props.product)}>Add To Cart</button>
            : <button className="showButton" type="button">Sold Out</button>
          }
          </div>
        <div className="right">
          <img className="showImg"src={props.product.img} />
        </div>
    </div>

  );
};

export default ShowProduct;
