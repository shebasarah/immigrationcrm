import React, { useEffect, useState,useRef } from 'react'; 
import axios from 'axios';  
import {useNavigate, useParams,useLocation} from "react-router-dom";
function TrackApplication(){
    //const {id}=useParams();
    let navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        loadClient();
    },[]);
    const [data, setData]=useState({
        First_name:"",
        Middle_name:"",
        Surname:"",
        Appln_status:""
    })
    const {First_name,Middle_name,Surname,Appln_status}=data;
    
    const loadClient=async()=>{
        const result=await axios.get("http://localhost/immigrationcrm_react-php/getapplicationstatus.php?id="+location.state.id);
        setData(result.data);
        //console.log(result);
    }
    const navigatetoDashboard = () => {
        
        navigate('/dashboard-client',{state:{id:location.state.id}});
      };

    return(
        <div >
            
           <div className="main-box" style={{
            backgroundColor: 'lightblue',height: '700px' 
          }}>
        <div className="row">
            
        </div>
        <div className="row">
            <div className="col-md-12"align="center"><h2>Application Status</h2></div>
            <div className="col-md-12"align="center"><h3>Name: {First_name} {Middle_name} {Surname}</h3></div>
        </div>
        <hr/>
        <div className="row">
        <div className="col-md-12" align="center">
                <h3><strong>Status: {Appln_status}</strong></h3>
            </div>
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

export default TrackApplication;