import React from 'react';

function ShowProduct(props) {
  return (
    <div className="Show">
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
    </div>
  );
};

export default ShowProduct;
