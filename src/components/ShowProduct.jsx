import React from 'react';

function ShowProduct(props) {
  return (
    <div className="Show">
      <h1>{props.product.name}</h1>
      <img src={props.product.img} />
      <table>
        <tr>
          <th>Description</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>{ props.product.description }</td>
          <td>{ props.product.price }</td>
        </tr>
      </table>
      {
        props.currentUser 
        ? props.product.qty
          ? <button type="button" onClick={() => props.addToCart(props.product)}>Add To Cart</button>
          : <button type="button">Sold Out</button>
        : <></>
      }
    </div>
  );
};

export default ShowProduct;
