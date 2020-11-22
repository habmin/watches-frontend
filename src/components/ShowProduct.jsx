import React from 'react';

function ShowProduct(props) {
  return (
    <div className="show">
      <h1 className="name">{props.product.name}</h1>
      <img className="image"src={props.product.img} />
      <table className="ShowProductTable">
        <tr className="ShowProductContainer">
          <th className="ShowProductDescription">Description</th>
          <th className="ShowProductPrice">Price</th>
        </tr>
        <tr>

          <td>{ props.product.description }</td>
          <td>{ props.product.price }</td>
        </tr>
      </table>
    </div>
  );
};

export default ShowProduct;
