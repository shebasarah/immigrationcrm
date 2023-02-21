import React, { useEffect, useState,useRef } from 'react'; 
import axios from 'axios';  
import {useNavigate, useParams} from "react-router-dom";


function EditClient(){
    let navigate=useNavigate();
    const {id}=useParams();
    
    
    const [data, setData]=useState({
        ID:"",
        First_name:"",
        Middle_name:"",
        Surname:"",
        Email:"",
        Contact_num:"",
        Case_notes:"",
        Appln_status:"",
        Visa_type:"",
        Agr_form_status:""

    })
  
    useEffect(()=>{
        loadClient();
    },[]);
    
    const {First_name,Middle_name,Surname,Email,Contact_num,
            Case_notes,Appln_status,Visa_type,Agr_form_status}=data;
    const handleChange=(e)=>{
             setData({...data,[e.target.name]: e.target.value});
            
         }
      
    const loadClient=async()=>{
            const result=await axios.get("http://localhost/immigrationcrm_react-php/getclientdetails.php?id="+id);
            setData(result.data);
            //console.log(result);
        }

    const updateForm=async (e)=>{
        e.preventDefault();
        //console.log(data);
     await axios.post('http://localhost/immigrationcrm_react-php/updateclientdetails.php',data)
        .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('Client details updated!'); 
                navigate(`/listall`);
                    
            }
        else  {
            alert('Details not updated!');  
        }
        });
    }

    return(
        <div style={{
            backgroundColor: 'lightblue',height: '700px'
           
          }}>
            <form onSubmit={e=>updateForm(e)}>
           <div className="main-box">
        <div className="row">
            <div className="col-md-12 text-center"><h1>Edit and Update Details</h1></div>
        </div>
        <div className="row">
            <div className="col-md-6">First Name</div>
            <div className="col-md-6">
                <input type="text" name="First_name" className="form-control"
                onChange={e=>handleChange(e)} value={First_name}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Middle Name</div>
            <div className="col-md-6">
                <input type="text" name="Middle_name" className="form-control"
                onChange={e=>handleChange(e)} value={Middle_name}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Surname</div>
            <div className="col-md-6">
                <input type="text" name="Surname" className="form-control"
                onChange={e=>handleChange(e)} value={Surname}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Visa Type</div>
            <div className="col-md-6">
                <select id="Visa_type" name="Visa_type" className="form-control" 
                onChange={e=>handleChange(e)} value={Visa_type}>
                    <option selected>Click to select</option>
                    <option value="Student Visa" >Student Visa</option>
                    <option value="Visitor Visa">Visitor Visa</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Residence Visa">Residence Visa</option>
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Email</div>
            <div className="col-md-6">
                <input type="email" name="Email" className="form-control"
                onChange={e=>handleChange(e)} value={Email}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Contact Number</div>
            <div className="col-md-6">  
            <input type="tel" id="Contact_num" name="Contact_num"
       pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder="10 digits" 
       className="form-control"
       onChange={e=>handleChange(e)} value={Contact_num}/>   
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Case Notes</div>
            <div className="col-md-6">
                <textarea name="Case_notes" className="form-control" onChange={e=>handleChange(e)} 
                value={Case_notes}>
                </textarea>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Agreement Form Status</div>
            <div className="col-md-6">
                <select id="Agr_form_status" name="Agr_form_status" className="form-control" 
                onChange={e=>handleChange(e)} value={Agr_form_status}>
                    <option selected>Click to select</option>
                    <option value="Upload Pending" >Upload Pending</option>
                    <option value="Uploaded">Uploaded</option>
                    <option value="Signed">Signed</option>   
                </select>
            </div>
        </div>
       
        <div className="row">
            <div className="col-md-6">Application Status</div>
            <div className="col-md-6">
                <select id="Appln_status" name="Appln_status" className="form-control" 
                onChange={e=>handleChange(e)} value={Appln_status}>
                    <option selected>Click to select status</option>
                    <option value="Enquiry" >Enquiry</option>
                    <option value="Application In Progress">Application In Progress</option>
                    <option value="Application Submitted">Application Submitted</option>
                    <option value="Application Completed">Application Completed</option>
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center" >
                <input type="submit" name="submit" value="Update" className="btn btn-success button2"/>
            </div>
        </div>
        </div>
        </form>
        </div>
       
        
    )
}
export default EditClient;