import axios from "axios";
import React, {useState, useEffect} from "react";
import * as Helper from '../Utility/Helper';
import Loader from "../Utility/Loader";
import Select from 'react-select';
import {MERCHANT} from './../../axios/Api';
import Pagination from "../Pagination/Pagination";
import { allItem,addItem,editItem,updateItem,deleteItem,paginationItem,searchingItem} from "../../axios/ServerRequest";

export default function Merchant() {
  const [merchants, setMerchants] = useState([]);
  const [isAddItem, setIsAddItem] = useState(true);
  let [formData, setFormData] = useState({});

  const onSelectChangeInput = (e, action) => {
    formData[action.name] = e.id;
    setFormData(formData)
  }

  const onChangeInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})

  }

  useEffect(() => {
    merchantLists()
    console.log(merchants)
   // locationLists()
  }, []);

  function refresh(){
    merchantLists();
  }

  function merchantLists() {
    axios.get(MERCHANT).then((response) => {
      setMerchants(response.data);
    })
    .catch(function (error) {
      Helper.alertMessage('error','Something went wrong!');
    });
  }

  function openModal(){
    setIsAddItem(true);
    resetForm();
  }

  function  resetForm(){
    formData = {};
    setFormData (formData);
  }

  function addItem(event){
    event.preventDefault();
    axios.post(MERCHANT, formData)
    .then(response => {
      if(response.data.status == true){
        resetForm();
        merchantLists();
        Helper.alertMessage('success', 'Successfully Added');
      }else if(response.data.status == false){
         var errors = Object.values(response.data.errors);
         Helper.alertMessage('validation', errors);
      }
    })
    .catch(function (error) {
      console.log(error)
      Helper.alertMessage('error','Something went wrong!');
    });
  }

  function editItem(id){
    setIsAddItem(false);
    console.log(isAddItem)
    axios.get(MERCHANT + '/' + id)
    .then(response => {
      setFormData (response.data);
    })
    .catch(error => {
        Helper.alertMessage('error',error);
    })
    
  }

  function updateItem(event){
    event.preventDefault();
    axios.put(MERCHANT + '/' + formData.id, formData)
    .then(response => {
      resetForm();
      merchantLists();
      Helper.alertMessage('success','Successfully Updated');
    })
    .catch(error => {
        Helper.alertMessage('error', error);
    })
  }

  function deleteItem(id){
    setIsAddItem(false);
    axios.delete(MERCHANT + '/' + id)
    .then(response => {
      merchantLists();
      Helper.alertMessage('success','Successfully Deleted');
    })
    .catch(error => {
        Helper.alertMessage('error',error);
    })
    
  }

  let paginateData =  async (link) =>{
    let result= await paginationItem(link)
    console.log(result)
    setMerchants (result);
  }

  function filter(event){
    event.preventDefault();
    axios.get('admin/merchant-search', {
      params: formData
    }
    )
    .then(response => {
      console.log(response.data);
      setMerchants(response.data);
    })
    .catch(function (error) {
      Helper.alertMessage('error','Something went wrong!');
    });
  }

  return (
    <div className="container-fluid p-0">
      <h1 className="h3">Merchant</h1>
      <div className="card">
        <div className="card-body">
        <form onSubmit= {filter}>
          <div className="row">
              <div className="col-md-2">
                <input type="text" className="form-control" name="merchant_name" placeholder="Merchant Name" id="merchant_name" onChange={onChangeInput} aria-describedby="merchant_name" />
              </div>
              <div className="col-md-2 pb-2">
                 <input type="text" className="form-control" name="merchant_email" placeholder="Email" id="merchant_email" onChange={onChangeInput} aria-describedby="merchant_email" />
              </div>
              <div className="col-md-3 pb-2">
                 <input type="text" className="form-control" name="merchant_mobile" placeholder="Mobile No" id="merchant_mobile" onChange={onChangeInput} aria-describedby="merchant_mobile" />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary me-2"><i class="fas fa-search"></i></button>
                <button type="button" className="btn btn-primary" onClick={refresh}><i class="fas fa-retweet"></i></button>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-primary" onClick={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Create
                </button>
              </div>
          </div>
          </form>

          {
            merchants ? 
            <div className="table-responsive">
              <table id="myTable" className="display table table-striped">
              <thead>
                  <tr>
                      <th>SL.</th>
                      <th>Merchant Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th>Action</th>

                  </tr>
              </thead>
              <tbody>
                { 
                  merchants.data && 
                    merchants.data.map((val, index) => (
                    <tr>
                        <td> {index+1}</td>
                        <td> {val.merchant_name}</td>
                        <td> {val.merchant_email}</td>
                        <td> {val.merchant_mobile }</td>
                        <td> {val.merchant_address}</td>
                        <td>
                            <button onClick={() => editItem(val.id)} className="btn btn-success btn-sm me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => {if(window.confirm('Delete the item?')){deleteItem(val.id)};}}  className="btn btn-danger btn-sm">
                            <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    ))
                  
                }
                </tbody>
              </table>

              <Pagination links={merchants.links} onChangePaginate={paginateData} />

            </div> : 
            <h1 className="h3 text-center">No Data Found</h1>
          }
          
        </div>
          
      </div>
      
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit= {isAddItem ? addItem : updateItem}>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel"> {isAddItem ? 'Add' : 'Edit'} Merchant</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Merchant Name *</label>
                      <input type="text" className="form-control" value={formData.merchant_name || ''} name="merchant_name" id="merchant_name" onChange={onChangeInput} aria-describedby="name" />
                      <div className="mb-3">
                        <label htmlFor="merchant_number" className="form-label">Merchant Number </label>
                        <input type="merchant_number" name="merchant_number" value={formData.merchant_number || ''} className="form-control"  onChange={onChangeInput} id="merchant_number" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="merchant_address" className="form-label">Merchant Address </label>
                        <input type="merchant_address" name="merchant_address" className="form-control" value={formData.merchant_address || ''} onChange={onChangeInput} id="merchant_address" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="merchant_email" className="form-label">Merchant Email </label>
                        <input type="merchant_email" name="merchant_email" className="form-control" value={formData.merchant_email || ''} onChange={onChangeInput} id="merchant_email" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="merchant_mobile" className="form-label">Merchant Mobile </label>
                        <input type="merchant_mobile" name="merchant_mobile" className="form-control" value={formData.merchant_mobile || ''} onChange={onChangeInput} id="merchant_mobile" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tax_no" className="form-label">Tax No</label>
                        <input type="tax_no" name="tax_no" className="form-control" value={formData.tax_no || ''} onChange={onChangeInput} id="tax_no" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bin_no" className="form-label">Bin No </label>
                        <input type="bin_no" name="bin_no" className="form-control" value={formData.bin_no || ''} onChange={onChangeInput} id="bin_no" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="agreement_copy" className="form-label">Agreement Copy </label>
                        <input type="agreement_copy" name="agreement_copy" className="form-control" value={formData.agreement_copy || ''} onChange={onChangeInput} id="agreement_copy" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status </label>
                        <select className="form-control" name="status" onChange={onChangeInput} required>
                          <option value="" disabled>Select Status</option>
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                      </div>
                  </div>

                  <div className="col-md-6 mb-3">
                      <label htmlFor="account_title" className="form-label">Account Title</label>
                      <input type="text" className="form-control" value={formData.account_title || ''} name="account_title" id="account_title" onChange={onChangeInput}/>
                      <div className="mb-3">
                        <label htmlFor="account_number" className="form-label">Account Number </label>
                        <input type="account_number" name="account_number" value={formData.account_number || ''} className="form-control"  onChange={onChangeInput} id="account_number" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bank_name" className="form-label">Bank Name </label>
                        <input type="bank_name" name="bank_name" className="form-control" value={formData.bank_name || ''} onChange={onChangeInput} id="bank_name" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="branch_name" className="form-label">Branch Name </label>
                        <input type="branch_name" name="branch_name" className="form-control" value={formData.branch_name || ''} onChange={onChangeInput} id="branch_name" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="routing_no" className="form-label">Routing No </label>
                        <input type="routing_no" name="routing_no" className="form-control" value={formData.routing_no || ''} onChange={onChangeInput} id="routing_no" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contact_name" className="form-label">Contact Name</label>
                        <input type="contact_name" name="contact_name" className="form-control" value={formData.contact_name || ''} onChange={onChangeInput} id="contact_name" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contact_mobile" className="form-label">Contact Mobile </label>
                        <input type="contact_mobile" name="contact_mobile" className="form-control" value={formData.contact_mobile || ''} onChange={onChangeInput} id="contact_mobile" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contact_email" className="form-label">Contact Email </label>
                        <input type="contact_email" name="contact_email" className="form-control" value={formData.contact_email || ''} onChange={onChangeInput} id="contact_email" />
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
      </div>

    </div>

    
  );
}
