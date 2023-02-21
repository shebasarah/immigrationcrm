import React, {useState} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
//import 'react-phone-input-2/lib/style.css'



const Register_client=()=>{
    let navigate=useNavigate();
    const location=useLocation();
    const [data, setData]=useState({
        first_name:"",
        middle_name:"",
        surname:"",
        email:"",
        phone:"",
        case_notes:"",
        application_status:"",
        visatype:"",
        agrstatus:""

    })
    const {first_name,middle_name,surname,email,phone,
       case_notes,application_status,visatype,agrstatus}=data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name]: e.target.value});
    }
    const navigatetoDashboard = () => {
        
        navigate('/dashboard-admin');
      };
    const submitForm=async (e)=>{
        e.preventDefault();
     await axios.post('http://localhost/immigrationcrm_react-php/new_client_insert.php',data)
        .then((result)=>{
            //console.log(result);
            if (result.data.status === 'Valid') { 
                alert("New Client Registered!!!\nNote down the below details:-\nID: "+result.data.ID+"\nUsername: "+result.data.username+"\nTemporary Password: "+result.data.pw+"\nAdvice your client to change their credentials immediately!!!");
              navigate(`/dashboard-admin`);  
            }
        else  {
            alert('Registration Failed');  
        }
        });
    }
    return(
        <form onSubmit={e=>submitForm(e)} style={{
            backgroundColor: 'lightblue',height: '800px'
           
          }}>
        <div className="main-box">
           
        <div className="row">
            <div className="col-md-12 text-center"><h1>Register New Client</h1></div>
        </div>
<hr/>
        <div className="row">
            <div className="col-md-6">First Name</div>
            <div className="col-md-6">
                <input type="text" name="first_name" className="form-control"
                onChange={e=>handleChange(e)} value={first_name} required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Middle Name</div>
            <div className="col-md-6">
                <input type="text" name="middle_name" className="form-control"
                onChange={e=>handleChange(e)} value={middle_name} required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Surname</div>
            <div className="col-md-6">
                <input type="text" name="surname" className="form-control"
                onChange={e=>handleChange(e)} value={surname} required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Email</div>
            <div className="col-md-6">
                <input type="email" name="email" className="form-control"
                onChange={e=>handleChange(e)} value={email} required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Contact Number</div>
            <div className="col-md-6">  
            <input type="tel" id="phone" name="phone"
       pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder="1234567890" required 
       className="form-control"
       onChange={e=>handleChange(e)} value={phone}/>   
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Case Notes</div>
            <div className="col-md-6">
                <textarea name="case_notes" className="form-control" onChange={e=>handleChange(e)} 
                value={case_notes}>
                </textarea>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Visa Type</div>
            <div className="col-md-6">
                <select id="visatype" name="visatype" className="form-control" 
                onChange={e=>handleChange(e)} value={visatype}>
                    <option selected>Click to select</option>
                    <option value="Student Visa" >Student Visa</option>
                    <option value="Visitor Visa">Visitor Visa</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Residence Visa">Residence Visa</option>
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Application Status</div>
            <div className="col-md-6">
                <select id="application_status" name="application_status" className="form-control" 
                onChange={e=>handleChange(e)} value={application_status}>
                    <option selected>Click to select status</option>
                    <option value="Enquiry" >Enquiry</option>
                    <option value="Application Pending">Application Pending</option>
                    <option value="Application In Progress">Application In Progress</option>
                    <option value="Application Submitted">Application Submitted</option>
                    <option value="Application Completed">Application Completed</option>
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Agreement Form Status</div>
            <div className="col-md-6">
                <select id="agrstatus" name="agrstatus" className="form-control" 
                onChange={e=>handleChange(e)} value={agrstatus}>
                    <option selected>Click to select status</option>
                    <option value="Upload Pending" >Upload Pending</option>
                    <option value="Uploaded">Uploaded</option>
                    <option value="Signed">Signed</option>   
                </select>
            </div>
        </div>
        <hr/>
        <div className="row">
        <div className="col-md-6 text-center" >
        <input type="reset" name="back" value="Back" className="btn btn-success button2"
            onClick={navigatetoDashboard}/> 
            
        </div>
            <div className="col-md-6 text-center" >
                <input type="submit" name="submit" value="Register" className="btn btn-success button2"/>
            </div>
        </div>
        </div> 
        </form>
        
    )
}

export default Register_client;