import API, {BASE_URL} from "./Api";
import * as Helper from '../../src/components/Utility/Helper';

/**
 * all Item gets
 * @param {string} url  api url.
 */

export const allItem = async(url) => {
    return await API({
      method: 'get',
      url:url,
    }).then(res => {
        return res.data;
    })
    .catch((res)=>{
      Helper.alertMessage('error','Something went wrong!');
    });
  }

/**
 * add Item
 * 
 * @param {string} url  api url.
 * @param {json} formData   form input field data
 */


  export const addItem = async(url,formData) => {
    return  await API({
      method: 'POST',
      url: url,
      data:formData,
    }).then(res => {
         if(res.data.status==false){
              let errors = Object.values(res.data.errors);
               Helper.alertMessage('validation',errors);
                return false;
         }else if(res.data.status == true){
             Helper.alertMessage('success', 'Added Successfully')
             return res.data;
         }
 
    })
    .catch(function (res) {
          Helper.alertMessage('error','Something went wrong!');
    });
  }

/**
 * edit Item
 * 
 * @param {string} url  api url.
 * @param {int} id 
 */
   export const editItem = async( url, id) =>{

    return await API({
      method: 'get',
      url: url+"/"+id
    }).then(res => {
        return res.data;
    })
      .catch((res)=>{
        Helper.alertMessage('error','Something went wrong!');
      })
   }

/**
 * update Item
 * 
 * @param {string} url  api url.
 * @param {json} formData  form input field data
 */

   export const updateItem = async(url,formData) =>{
    return await API({
      method: 'PUT',
      url: url,
      data: formData,
    }).then(res => {
      if(res.data.status==false){
        let errors = Object.values(res.data.errors);
         Helper.alertMessage('validation',errors);
              return false;
      }else if(res.data.status == true){
          Helper.alertMessage('success', 'Updated Successfully')
          return res.data;
      }
    })

   }

  /**
 * delete Item
 * @param {string} url  api url.
 * @param {int} id 
 */

   export const deleteItem = async( url, id) =>{

    return await API({
      method: 'get',
      url: url+"/"+id
    }).then(res => {
      if(res.data.status==false){
        Helper.alertMessage('error', ' Sorry! Data not found')
      }else if(res.data.status == true){
          Helper.alertMessage('success', 'Delete Successfully')
          return res.data;
      }
    })
      .catch((res)=>{
         console.log(res);
        Helper.alertMessage('error','Something went wrong!');
      })
   }


/**
 * pagination Item
 * 
 * @param {string} url  api url.
 */

   export const paginationItem = async(url)=>{
    return await API({
      method: 'get',
      url: url,
    }).then(res => {
        return res.data;
    })
    .catch((res)=>{
      Helper.alertMessage('error','Something went wrong!');
    })
   }

/**
 * searching Item
 * @param {string} url  api url.
 * @param {string} value 
 */
  export const searchingItem = async(url,value) =>{
    return await API({
      method: 'get',
      url: url+'/'+value,
    }).then(res => {
        return res.data;
    }).catch((res)=>{
      Helper.alertMessage('error','Something went wrong!');
    })
  }

