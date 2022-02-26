import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import { DELIVERYMAN, EDITPARCEL } from "../../axios/Api";
import Swal from "sweetalert2";
import DeliveryDetails from "./DeliveryDetails";
import ParcelDetails from "./ParcelDetails";

export default function Deliveryman() {
  const [deliverydetails, setDeliverydetails] = useState([]);
  const [parceldetails, setParceldetails] = useState([]);
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  let orderdetails = [];
  let pickupwarehouse = [];
  let pickuplocation = [];
  let deliverywarehouse = [];
  let deliverylocation = [];
  let product = [];
  useEffect(() => {
    console.log(status);

    axios.patch("https://10.100.17.47/FairEx/api/v1/admin/parcel/" + id, {
      status: status,
    });
  }, [status]);
  useEffect(() => {
    axios
      .get(DELIVERYMAN)
      .then((response) => {
        setDeliverydetails(response.data);
      })
      .catch(function (error) {
        Helper.alertMessage("error", "Something went wrong!");
      });
  }, [status]);
  if (deliverydetails != "") {
    // console.log(deliverydetails);
    orderdetails = deliverydetails.data;
  }

  function showDetails(details) {
    console.log(details);
    setParceldetails(details);
  }
  if (parceldetails != "") {
    // console.log(deliverydetails);
    pickupwarehouse = parceldetails.pickup_warehouse;
    deliverylocation = parceldetails.delivery_location;
    product = parceldetails.product;
  }

  return (
    <div>
      <div className="container-fluid p-0">
        <h1 className="h3">Order List for Delivery</h1>
        <div className="card">
          <div className="card-body">
            <div className="row"></div>
            <div className="table-responsive">
              <table id="myTable" className="display table table-striped">
                <thead>
                  <tr>
                    <th>Serial #</th>
                    <th>Order No.</th>
                    <th>Priority Level</th>
                    <th>Pickup Warehouse</th>
                    <th>Delivery Location</th>
                    <th>Order Status</th>
                    <th>Change Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderdetails.map((val, index) => (
                    <tr>
                      <td> {index + 1}</td>
                      <td> {val.parcel.order_no}</td>
                      <td> {}</td>
                      <td> {val.parcel.pickup_warehouse.name}</td>
                      <td> {val.parcel.delivery_location.area}</td>
                      <td> {val.parcel.status}</td>
                      <td>
                        <select
                          className="btn btn-sm btn-info"
                          onChange={(event) => {
                            setStatus(event.target.value);
                            setId(val.parcel.id);
                          }}
                        >
                          <option>Choose from Here</option>
                          return (<option value="Picked">Picked</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          ); )
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => showDetails(val.parcel)}
                          className="btn btn-success btn-sm me-2"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {console.log(parceldetails)}
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
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.qty}</td>
              <td>{product.price}</td>
              <td>{product.status}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <div className="row">
          <div className="col-lg-6">
            <div className="special-box">
              <div className="heading-area">
                <h4 className="title">Pickup Details</h4>
              </div>
              <div className="table-responsive-sm">
                <table className="table">
                  <tbody>
                    <tr>
                      <th width="45%">Warehouse ID</th>
                      <th width="10%">:</th>
                      <td width="65%">{pickupwarehouse.id}</td>
                    </tr>
                    <tr>
                      <th width="45%">Warehouse Name</th>
                      <th width="10%">:</th>
                      <td width="65%">{pickupwarehouse.name}</td>
                    </tr>
                    <tr>
                      <th width="35%">Address</th>
                      <th width="10%">:</th>
                      <td width="65%"></td>
                    </tr>
                    <tr>
                      <th width="35%">Area</th>
                      <th width="10%">:</th>
                      <td width="65%">{pickupwarehouse.area}</td>
                    </tr>
                    <tr>
                      <th width="35%">City</th>
                      <th width="10%">:</th>
                      <td width="65%">{pickupwarehouse.district}</td>
                    </tr>
                    <tr>
                      <th width="45%">Postal Code</th>
                      <th width="10%">:</th>
                      <td width="65%">{pickupwarehouse.post_code}</td>
                    </tr>
                    <tr>
                      <th width="35%">Country</th>
                      <th width="10%">:</th>
                      <td width="65%">{pickupwarehouse.country}</td>
                    </tr>
                    <tr>
                      <th width="45%">Pickup Status</th>
                      <th width="10%">:</th>
                      <td width="65%">{parceldetails.status}</td>
                    </tr>
                  </tbody>
                  <br />
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="special-box">
              <div className="heading-area">
                <h4 className="title">Delivery Details</h4>
              </div>
              <div className="table-responsive-sm">
                <table className="table">
                  <tbody>
                    <tr>
                      <th width="40%">
                        <strong>Name</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%">{parceldetails.customer_name}</td>
                    </tr>
                    <tr>
                      <th width="35%">
                        <strong>Phone</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%">{parceldetails.customer_number}</td>
                    </tr>
                    <tr>
                      <th width="35%">
                        <strong>Address</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%"></td>
                    </tr>
                    <tr>
                      <th width="35%">
                        <strong>Area</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%">{parceldetails.customer_address}</td>
                    </tr>
                    <tr>
                      <th width="35%">
                        <strong>City</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%">{parceldetails.customer_city}</td>
                    </tr>
                    <tr>
                      <th width="35%">
                        <strong>Postal Code</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%">{parceldetails.zip_code}</td>
                    </tr>
                    <tr>
                      <th width="35%">
                        <strong>Country</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%"></td>
                    </tr>
                    <tr>
                      <th width="35%">
                        <strong>Delivery Status</strong>
                      </th>
                      <th width="10%">:</th>
                      <td width="65%">{parceldetails.status}</td>
                    </tr>
                  </tbody>
                  <br />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
