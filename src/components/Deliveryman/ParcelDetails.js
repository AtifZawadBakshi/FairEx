import React from "react";

export default function ParcelDetails(props) {
  const products = props.product;
  return (
    <div>
      <h4 className="title">Parcel Details</h4>
      <table className="table caption-top">
        <thead>
          <tr>
            <th scope="col">Parcel ID</th>
            <th scope="col">Parcel Details</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{products.id}</td>
            <td>{products.name}</td>
            <td>{products.qty}</td>
            <td>{products.price}</td>
            <td>{products.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
