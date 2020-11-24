import React from 'react';
import { Button, Image, } from 'semantic-ui-react';
import './ShowProducts.css'

function ShowProduct(props) {
  return (
    <div className="show">
      <div className="left">
        <h1 className="showHeader">{props.product.name}</h1>
        <h3 className="showPrice" >${ props.product.price }.00</h3>
        <h4>{ props.product.description }</h4>
        <p><strong> Color: </strong>{ props.product.color }</p>
        <p><strong> Material: </strong> { props.product.material }</p>
        <p><strong> Strap: </strong> { props.product.strap}</p>
        <p><strong> Quantity: </strong> { props.product.qty}</p>
          {
            props.currentUser
            ? props.product.qty
              ? <Button color="black" className="showButton" type="button" onClick={() => props.addToCart(props.product)}>Add To Cart</Button>
              : <Button color="gray" className="showButton" type="button">Sold Out</Button>
            : <Button color="gray" type="button" content="SIGN IN TO ADD" />
          }
          </div>
        <div className="right">
          <Image size="large" className="showImg"src={props.product.img} />
        </div>
    </div>

  );
};

export default ShowProduct;
