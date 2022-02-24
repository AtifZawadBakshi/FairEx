import React,{Component} from "react";
import axios from "axios";
import * as Helper from '../Utility/Helper';
import { Route , withRouter} from 'react-router-dom';
import {ADMIN_LOGIN} from './../../axios/Api';

class Login extends Component {
     
     constructor(props){
          super(props)
          this.state={
               email :"",
               password :"",
          }
          this.changeFormField =  this.changeFormField.bind(this); 
          this.formSubmit = this.formSubmit.bind(this);
     }

     changeFormField(e) {
          this.setState({
              [e.target.name]: e.target.value
          });
     }

     formSubmit(e){
        e.preventDefault();
         let props = this.props;
         axios.post(ADMIN_LOGIN, {
               email: this.state.email,
               password: this.state.password
               
          }).then(function (response) {
               console.log(response)

          if (response.data.access_token) {
               localStorage.setItem("user", JSON.stringify(response.data));
               Helper.alertMessage('success','Login has been successfully!');
               //let history = useHistory();
               props.history.push("/dashboard");
               window.location.reload();
               //console.log(this.state.history)
               //this.state.history.push("/dashboard")
              // history.push("/dashboard");
          }
          })
          .catch(function (error) {
               Helper.alertMessage('error','Something went wrong!');
               console.log(error)
          });
      }

     render(){
          return (
               <div className="container-fluid">
                    <div className="row justify-content-center mt-5">
                         <div className="col-lg-4">
                              
                              <div className="card" id="loginform">
                                   <div className="card-body">
                                   {/* <h2>Welcome to Ample Admin</h2> */}
                                   
                                   <form 
                                   
                                   className="form-horizontal mt-4 pt-4 needs-validation" 
                                   onSubmit={this.formSubmit}
                                   
                                   >
                                        <div className="form-floating mb-3">

                                             <input type="email" 
                                             className="form-control form-input-bg" 
                                             id="tb-email" 
                                             placeholder="name@example.com" 
                                             required 
                                             name="email"
                                             onChange={
                                                  this.changeFormField
                                                  }
                                             />
                                             <label 
                                                  htmlFor="tb-email">Email
                                             </label>
                                        </div>

                                        <div className="form-floating mb-3">
                                             <input type="password" 
                                             className="form-control form-input-bg" 
                                             id="text-password" 
                                             placeholder="*****" 
                                             required 
                                             name="password"
                                             onChange={
                                                  this.changeFormField
                                                  }
                                             />
                                             <label 
                                                  htmlFor="text-password">Password
                                             </label>
                                             <div className="invalid-feedback">Password is required</div>
                                        </div>

                                        
                                        <div className="d-flex align-items-stretch button-group mt-4 pt-2">
                                             <button type="submit" className="btn btn-info btn-lg px-4">
                                             Sign in
                                             </button>
                                        
                                        </div>
                                   </form>
                                   </div>
                              </div>
                              
                         </div>
                    </div>
               </div>
          )
     }
}

export default withRouter(Login);

