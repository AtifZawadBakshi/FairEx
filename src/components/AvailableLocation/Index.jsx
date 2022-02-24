import axios from "axios";
import React, {useState, useEffect} from "react";
import * as Helper from '../Utility/Helper';
import Loader from "../Utility/Loader";
import Select from 'react-select';
import {LOCATION_LIST, WAREHOUSE, WAREHOUSE_AVAILABLE} from './../../axios/Api';
import {AVAILABLE} from './../../axios/Api';
import { paginationItem} from "../../axios/ServerRequest";
import Pagination from "../Pagination/Pagination";

export default function AvailableLocation() {
  var defaultData = {};
  const [availableLocations, setAvailableLocations] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  let [formData, setFormData] = useState(defaultData);
  const [isAddItem, setIsAddItem] = useState(true);
  const [selectedValue, setSelectedValue] = useState(1);


  const onSelectChangeInput = (e, action) => {
    formData[action.name] =e.value;
    setFormData(formData)
    setSelectedValue(e.value);
  }

  const onChangeInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    warehouseLists()
    locationLists()
    AvailableLocationLists()
  }, []);

  function openModal(){
    setIsAddItem(true);
    resetForm();
  }

  function refresh(){
    AvailableLocationLists();
  }

  function  resetForm(){
    formData = {};
    setFormData (formData);
  }


  function warehouseLists() {
    axios.get(WAREHOUSE).then((response) => {
        setWarehouses(response.data);
    })
    .catch(function (error) {
      Helper.alertMessage('error','Something went wrong!');
    });
  }

  function locationLists() {
    axios.get(LOCATION_LIST).then((response) => {
      setLocations(response.data);
    })
    .catch(function (error) {
      Helper.alertMessage('error','Something went wrong!');
    });
  }

  function AvailableLocationLists() {
    axios.get(AVAILABLE).then((response) => {
      setAvailableLocations(response.data);
    })
    .catch(function (error) {
      Helper.alertMessage('error','Something went wrong!');
    });
  }


  function filter(event){
    event.preventDefault();
    axios.post(WAREHOUSE_AVAILABLE, formData)
    .then(response => {
        setAvailableLocations(response.data);
    })
    .catch(function (error) {
      Helper.alertMessage('error','Something went wrong!');
    });
  }

  function addItem(event){
    event.preventDefault();
    axios.post(AVAILABLE, formData)
    .then(response => {
        if(response.data.status == true){
          resetForm();
          AvailableLocationLists();
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
    //resetForm();
    setIsAddItem(false);
    console.log(isAddItem)
    axios.get(AVAILABLE +'/'+ id)
    .then(response => {
      setFormData (response.data);
      console.log(formData)
    })
    .catch(error => {
        Helper.alertMessage('error',error);
    })
    
  }

  function updateItem(event){
    event.preventDefault();
    axios.put(AVAILABLE + '/' + formData.id, formData)
    .then(response => {
      resetForm();
      AvailableLocationLists();
      Helper.alertMessage('success','Successfully Updated');
    })
    .catch(error => {
        Helper.alertMessage('error', error);
    })
  }

  function deleteItem(id){
    setIsAddItem(false);
    axios.delete(AVAILABLE +'/' + id)
    .then(response => {
      AvailableLocationLists();
      Helper.alertMessage('success','Successfully Deleted');
    })
    .catch(error => {
        Helper.alertMessage('error',error);
    })
    
  }

  let paginateData =  async (link) =>{
    let result= await paginationItem(link)
    console.log(result)
    setAvailableLocations(result);
  }

  // if (!availableLocations) {
  //   return <Loader />;
  // }

  return (
    <div className="container-fluid p-0">
      <h1 className="h3">Available Location</h1>
      <div className="card">
        <div className="card-body">
        <form onSubmit= {filter}>
          <div className="row">
              <div className="col-md-3">
                <select class="form-select mb-3" name="warehouse_id" onChange={onChangeInput} required>
                  <option selected="">Select Warehouse</option>
                  {
                    warehouses.map((val, index) => (
                      <option value={val.id}>{val.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="col-md-3 pb-2">

                    <Select
                      name="location_id"
                      options={locations}
                      getOptionValue={(option) => option.value}
                      getOptionLabel={(option) => option.label}
                      onChange={onSelectChangeInput}    
                      placeholder={"Select Location"}  
                     // value={{ value: formData.value, label: formData.label }}                                   
                    />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary me-2"><i class="fas fa-search"></i></button>
                <button type="button" className="btn btn-primary" onClick={refresh}><i class="fas fa-retweet"></i></button>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-primary" onClick={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Create
                </button>
              </div>
          </div>
          </form>

          {
            availableLocations ? 
            <div className="table-responsive">
              <table id="myTable" className="display table table-striped">
              <thead>
                  <tr>
                      <th>SL.</th>
                      <th>Warehouse Name</th>
                      <th>Location</th>
                      <th>Country</th>
                      <th>District</th>
                      <th>Action</th>

                  </tr>
              </thead>
              <tbody>
                { 
                  availableLocations.data && 
                    availableLocations.data.map((val, index) => (
                    <tr>
                        <td> {index+1}</td>
                        <td> {val.warehouse.name }</td>
                        <td> {val.location.area }</td>
                        <td> { val.warehouse.country }</td>
                        <td> {val.location.district}</td>
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

              <Pagination links={availableLocations.links} onChangePaginate={paginateData} />

            </div> : 
            <h1 className="h3 text-center">No Data Found</h1>
          }
          
        </div>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit= {isAddItem ? addItem : updateItem}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel"> {isAddItem ? 'Add' : 'Edit'} Available Location</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                      <div className="mb-3">
                        <div>
                          <label htmlFor="name" className="form-label">Warehouse *</label>
                          <select class="form-select mb-3" value={formData.warehouse_id || ''} name="warehouse_id" onChange={onChangeInput} required>
                            <option selected="">Select Warehouse</option>
                            {
                              warehouses.map((val, index) => (
                                <option value={val.id}>{val.name}</option>
                              ))
                            }
                          </select>

                          <div className="mb-3">
                            <label htmlFor="location_id" className="form-label">Location</label>
                            {/* <Select
                                name="location_id"
                                defaultValue={{value: formData.location_id, label: formData.location_area}}
                                options={locations}
                                onChange={onSelectChangeInput}    
                                
                               // value={locations.value}
                                
                               // value={{ value: formData.location_id, label: formData.location_area }} 
                                 
                            /> */}
                            <Select
                              name='location_id'
                              value={locations.filter(obj => obj.value === formData.location_id)} // set selected value
                              onChange={onSelectChangeInput}
                              options={locations}
                            />
                            

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


