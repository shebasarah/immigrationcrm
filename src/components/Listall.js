import axios from 'axios';  
import {useNavigate,useLocation,Link} from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react'  


function Listall(){
    let navigate = useNavigate();
const location=useLocation();
    const [user,setClient]=useState([]);
    const [client,setClientdetail]=useState({ 
        ID:"",
  
    });

    useEffect(()=>{
        loadClients();
    },[]);
    const loadClients=async()=>{
        const result=await axios.get('http://localhost/immigrationcrm_react-php/listall.php');
        setClient(result.data.records);
        //console.log(result);
    }
    const deleteclient=(ID)=>{
        axios.delete('http://localhost/immigrationcrm_react-php/deleteclient.php',{data:{ID:ID}})
        .then((result)=>{
            loadClients();
        }).catch(()=>{
            alert("Error");
        });
    }
   
    const archiveclient=(ID)=>{
        client.ID=ID;
        axios.post('http://localhost/immigrationcrm_react-php/archiveclient.php',client)
        .then((result)=>{
            loadClients();
        }).catch(()=>{
            alert("Error");
        });
    }
  

    const navigatetoDashboard = () => {
        
        navigate('/dashboard-admin');
      };
      
    /*const handleChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value}); 
    }
*/
    


    return(
        <div style={{
            backgroundColor: 'lightblue',
            width: '1300px',height: '700px' 
          }}>
        <div className="maincontainer">
            <div className="row">
                <div className="col-md-12 text-center"><h1>All clients</h1></div>       
        </div>
        <hr/>
        <div className="container mb-5 mt-5 text-left">
        <table class="table table-hover fixed">
            <thead>
                <tr>
                    <td>Index</td>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Surame</th>
                    <th>Email</th>
                    <th>Enroll Date</th>
                    <th>Contact Number</th>
                    <th>Visa Type</th>
                    <th style={{wordWrap:'break-word'}}>Application Status</th>
                    <th>Case Notes</th>                  
                    <th>Agreement Form Status</th>
                    <th>Edit</th>
                    <th>View Documents</th>
                    <th>Archive</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {user.map((user,index)=>(
                <tr>
                    <td>{index+1}</td>
                    <td style={{wordWrap:'break-word'}}>{user.First_name}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Middle_name}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Surname}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Email}</td>
                    <td>{user.Enroll_date}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Contact_num}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Visa_type}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Appln_status}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Case_notes}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Agr_form_status}</td>
                    <td><Link to={`/editclient/${user.ID}`}>Edit</Link></td>
                    <td><Link to={`/lists3files/${user.ID}`}>&nbsp;View</Link></td>
                    <td><Link to="" onClick={()=>archiveclient(user.ID)}>&nbsp;Archive</Link></td>
                    <td><Link to="" onClick={()=>deleteclient(user.ID)}>&nbsp;Delete</Link></td>
                    
                </tr>))}
            </tbody>
        </table>
        </div>
        
        <div className="row">
        <div className="col-md-12 text-center" >
        <input type="reset" name="back" value="Back" className="btn btn-success button2"
            onClick={navigatetoDashboard}/> 
            
        </div>
        </div>
        
        </div>
        </div>
        
    
        
        
        
    )
}

export default Listall;



