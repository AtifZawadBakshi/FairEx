
import React, {useState, useEffect, memo,Fragment} from "react";
import { allItem,addItem,editItem,updateItem,deleteItem,paginationItem,searchingItem} from "../../axios/ServerRequest";
import Pagination from "../Pagination/Pagination";

const Locations = ()=>{
    const [location ,setLocation] = useState(null);
    const [itemEdit ,setitemEdit] = useState(null);
    let [formData, setFormData] = useState({})
    useEffect( ()=>{
        allLocation();
    },[formData]);

   let allLocation= async ()=>{
       let result=  await allItem('admin/location');
        setLocation(result) 
     }

    let formHandleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        })
   }

   let AddBtn=()=>{
     setFormData ({});
     setitemEdit(null);
    }

    let store = async (e)=>{
        e.preventDefault();
        let result=  await addItem('admin/location',formData);
        if(result !=false){
            document.getElementById("modalClass").click();
            allLocation();
            setFormData({});
        }
    }
   
    let locationEdit = async (id)=>{
        setitemEdit(true);
        let result= await editItem("admin/location",id);
        console.log(result);
        setFormData(result);
    }
    
    let update = async (e)=>{
        e.preventDefault();
        let result= await updateItem('admin/location',formData);
        if(result !=false){
            allLocation();
            setFormData({});
            document.getElementById("modalClass").click();
        }
    }

   let destroy = async (id) =>{
     let result= await deleteItem('admin/location',id);
     if(result !=false)
     allLocation();
   }

    let paginateData =  async (link) =>{
        let result= await paginationItem(link)
        setLocation (result);
    }
 
    let seach = async (e)=>{
         let value = e.target.value.trim();
         if(value !=""){
            let result=await searchingItem('admin/location-search',value)
            setLocation (result);
         }
    }

    if (!location) return "No location!";
    const {name,guard_name} = formData;
    return (
       
        <Fragment>
           
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                             <div className="row">
                                 <div className="col-7">
                                    <h5 className="card-title">Location      
                                    </h5>

                                 </div>
                                 <div className="col-5">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onKeyUp={seach} placeholder="Search for..." autoComplete="off" />
                                        <button className="btn btn-info" type="button"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search align-middle me-2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
                                    </div>

                                 </div>
                             </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                <th style={{width: '40%'}}>Division</th>
                                <th style={{width: '25%'}}> District</th>
                                <th style={{width: '25%'}}> Area</th>
                                <th style={{textAlign: "right"}} >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    location.data.map((value , index)=>(
                                        <tr  key={index}>
                                            <td>{value.division}</td>
                                            <td>{value.district}</td>
                                            <td>{value.area}</td>
                                            <td class="table-action" style={{textAlign: "right"}}>
                                            <button type="button" 
                                                 style={{margin:"0px 3px"}}
                                                class="btn btn-sm btn-info" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#locationAdd"
                                                onClick={locationEdit.bind(this, value.id)}
                                            >

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        
                                            </button>  
                                            
                                                <button 
                                                

                                                  
                                                
                                                type="button"
                                                    className="btn btn-sm btn-danger" 
                                                    onClick={()=> 
                                                        { window.confirm('Delete the item?')
                                                          {destroy(value.id)}
                                                        } 
                                                    }
                                                    
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination links={location.links} onChangePaginate={paginateData} />
                    </div>
                </div>
            </div>
        </div>

      <div className="modal fade" id="locationAdd" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel"> {itemEdit? "Edit location" :"Add location" } </h5>
                       <button type="button" id="modalClass" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" />

                    </div>
                    <div className="modal-body m-3">

                        <form  onSubmit={itemEdit ? update: store}>  
                            <div className="mb-3 row">
                                <label className="col-form-label col-sm-2 text-sm-end">Name</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="form-control"
                                        value={name?name:""}
                                        onChange={formHandleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-form-label col-sm-2 text-sm-end">Guard</label>
                                <div className="col-sm-10">
                                <input 
                                   type="text" 
                                   name="guard_name" 
                                   className="form-control"  
                                   value={guard_name?guard_name:""} 
                                   onChange={formHandleChange} />
                              
                                </div>
                            </div>
                
                            <div className="mb-3 row">
                                <div className="col-sm-10 ms-sm-auto">
                              
                                   <button type="submit" className={ itemEdit? "btn btn-sm btn-info" :"btn btn-sm btn-success" }> { itemEdit? "Update" :"Save" }  </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        </Fragment>
    )
}

export default memo(Locations);