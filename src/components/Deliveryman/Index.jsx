import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Helper from "../Utility/Helper";
import Loader from "../Utility/Loader";
import { DELIVERYMAN } from "../../axios/Api";
import Swal from "sweetalert2";
import Details from "./Details";

export default function Deliveryman() {
  const [deliverydetails, setDeliverydetails] = useState([]);
  let parceldetails = [];
  let orderdetails = [];
  let pickupwarehouse = [];
  let pickuplocation = [];
  let deliverywarehouse = [];
  let deliverylocation = [];
  let product = [];

  useEffect(() => {
    axios
      .get("https://10.100.17.47/FairEx/api/v1/admin/pickup-assign")
      .then((response) => {
        setDeliverydetails(response.data);
      })
      .catch(function (error) {
        Helper.alertMessage("error", "Something went wrong!");
      });
  }, []);
  if (deliverydetails != "") {
    console.log(deliverydetails);
    orderdetails = deliverydetails.data;
  }

  function showDetails(parcelid) {
    console.log(parcelid);
    // <Details details={parcelDetails} />;
    // {
    //   <div>{parcelDetails.id}</div>;
    // }
  }

  return (
    <div className="container-fluid p-0">
      <h1 className="h3">Order List for Delivery</h1>
      <div className="card">
        <div className="card-body">
          <div className="row">
            {/* <div className="col-md-8">
              <button type="button" className="btn btn-primary" onClick={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Create
              </button>
            </div>
            <div className="col-md-4 text-end pb-2">
            <input
                type="search"
                id="searchInput"
                onKeyUp={Helper.tableSearch}
                placeholder="Search Here"
                className="form-control"
            />
            </div> */}
          </div>
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
                      <button
                        onClick={() => showDetails(val.id)}
                        className="btn btn-success btn-sm me-2"
                        // data-bs-toggle="modal"
                        // data-bs-target="#staticBackdrop"
                      >
                        Details
                      </button>
                    </td>
                    {/* <td>
                      <button
                        onClick=""
                        className="btn btn-success btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick="" className="btn btn-danger btn-sm">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit= {isAddItem ? addItem : updateItem}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel"> {isAddItem ? 'Add' : 'Edit'} Warehouse</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                      <div className="mb-3">
                        <div>
                          <label htmlFor="name" className="form-label">Name *</label>
                          <input type="text" className="form-control" value={formData.name || ''} name="name" id="name" onChange={onChangeInput} aria-describedby="name" />
                          <div className="mb-3">
                            <label htmlFor="post_code" className="form-label">Post Code *</label>
                            <input type="post_code" name="post_code" value={formData.post_code || ''} className="form-control"  onChange={onChangeInput} id="post_code" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="area" className="form-label">Area *</label>
                            <input type="area" name="area" className="form-control" value={formData.area || ''} onChange={onChangeInput} id="area" />
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
      </div>
      <br />
      <br />
      <br />
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
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
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
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="45%">Warehouse Name</th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="35%">Address</th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="35%">Area</th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="35%">City</th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="45%">Postal Code</th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="35%">Country</th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="45%">Pickup Status</th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
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
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="35%">
                      <strong>Phone</strong>
                    </th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
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
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="35%">
                      <strong>City</strong>
                    </th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
                  </tr>
                  <tr>
                    <th width="35%">
                      <strong>Postal Code</strong>
                    </th>
                    <th width="10%">:</th>
                    <td width="65%"></td>
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
                    <td width="65%"></td>
                  </tr>
                  {/* <tr>
                    <td colspan="2">
                      <a> Change Shipping Address</a>
                    </td>
                  </tr> */}
                </tbody>
                <br />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
