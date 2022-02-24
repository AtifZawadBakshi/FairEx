import axios from "axios";
import React, {useState, useEffect} from "react";
import * as Helper from '../Utility/Helper';
import Loader from "../Utility/Loader";
import {WAREHOUSE} from '../../axios/Api';
import Swal from 'sweetalert2';

export default function Warehouse() {
  const [warehouses, setWarehouses] = useState(null);
  const [isAddItem, setIsAddItem] = useState(true);

  let [formData, setFormData] = useState({});

  const onChangeInput = (e) => {
   setFormData({...formData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    warehouseLists(); 
  }, []);

  function warehouseLists() {
    // wareHouseLists().then((res)=>{
    //   setWarehouses(res);
    // })
    // .catch(function (error) {
    //   Helper.alertMessage('error','Something went wrong!');
    //   console.log(error);
    // });

    axios.get(WAREHOUSE).then((response) => {
        setWarehouses(response.data);
    })
    .catch(function (error) {
      Helper.alertMessage('error','Something went wrong!');
    });
  }

  function openModal(){
    setIsAddItem(true);
    resetForm();
  }

  function resetForm(){
    formData = {};
    setFormData (formData);
  }

  function addItem(event){
    event.preventDefault();
    axios.post(WAREHOUSE, formData)
    .then(response => {
        if(response.data.status == true){
          resetForm();
          warehouseLists();
          Helper.alertMessage('success', 'Successfully Added');
        }else if(response.data.status == false){
           var errors = Object.values(response.data.errors);
           Helper.alertMessage('validation', errors);
        }
    })
    .catch(function (error) {
      Helper.alertMessage('error', error);
    });
  }

  function editItem(id){
    setIsAddItem(false);
    console.log(isAddItem)
    axios.get(WAREHOUSE +'/'+ id)
    .then(response => {
      setFormData (response.data);
    })
    .catch(error => {
        Helper.alertMessage('error',error);
    })
    
  }

  function updateItem(event){
    event.preventDefault();
    axios.put(WAREHOUSE + '/' + formData.id, formData)
    .then(response => {
      resetForm();
      warehouseLists();
      Helper.alertMessage('success','Successfully Updated');
    })
    .catch(error => {
        Helper.alertMessage('error', error);
    })
  }

  function deleteItem(id){
    setIsAddItem(false);
    axios.delete(WAREHOUSE +'/' + id)
    .then(response => {
      warehouseLists();
      Helper.alertMessage('success','Successfully Deleted');
    })
    .catch(error => {
        Helper.alertMessage('error',error);
    })
    
  }

  if (!warehouses) {
    return <Loader />;
  }

  return (
    <div className="container-fluid p-0">
      <h1 className="h3">Warehouse</h1>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
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
            </div>
          </div>
          <div className="table-responsive">
            <table id="myTable" className="display table table-striped">
            <thead>
                <tr>
                    <th>SL.</th>
                    <th>Name</th>
                    <th>Area</th>
                    <th>Country</th>
                    <th>District</th>
                    <th>Action</th>

                </tr>
            </thead>
            <tbody>
              {
                warehouses.map((val, index) => (
                <tr>
                    <td> {index+1}</td>
                    <td> {val.name}</td>
                    <td> {val.area}</td>
                    <td> {val.country}</td>
                    <td> {val.district}</td>
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
          </div>
        </div>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
          </div>
      </div>
      
    </div>
  );
}
