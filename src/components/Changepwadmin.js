import React, { useEffect, useState,useRef } from 'react'; 
import axios from 'axios';  
import {useNavigate,useLocation,Link, useParams} from "react-router-dom";
const Changepwadmin=()=>{
    let navigate = useNavigate();
    const location=useLocation();


    const [data,setData]=useState({ID:'',id:'',oldusername:'',newusername:'',oldpassword:'',newpassword:''})
    const [input,setInput]=useState({
        retypenewpassword:''
    });
    const [error,setError]=useState({
        
        retypenewpassword:''
    })
    const onInputChange=e=>{
        const {name,value}=e.target;
        setInput(prev=>({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }
    const validateInput=e=>{
        let {name,value}=e.target;
        setError(prev=>{
            const stateObj={...prev,[name]:""};
            switch(name){
               
                case "retypenewpassword":
                 if (!value) {
                    stateObj[name] = "Please retype the new password.";
                } else if (data.newpassword && value !== data.newpassword) {
                    stateObj[name] = "New Password and Confirm New Password does not match.";
                }
                break;
 
                default:
                break;

                }
                return stateObj;
        })
    }

    const handleChange=(e)=>{
        setData({...data, [e.target.name]: e.target.value}); 
    }
    const navigatetoDashboard = () => {
        
        navigate('/dashboard-admin',{state:{id:location.state.id}});
      };

    //console.log(location.state.id);
    const submitForm=(e)=>{
        e.preventDefault(); 
       const sendData = {
        ID:location.state.id,    
        id:data.id,
        oldusername:data.oldusername,
        newusername:data.newusername,
        oldpassword:data.oldpassword,
        newpassword:data.newpassword,
        }

        //console.log(sendData);

        axios.post('http://localhost/immigrationcrm_react-php/changepwadmin.php',sendData)
        .then((result)=>{
            console.log(result);
            if (result.data.status === 'Valid') { 
                alert("Password Changed!");
              navigate(`/dashboard-admin`,{state:{id:location.state.id}});  
            }
        else  {
            if (result.data.status === 'Invalid') { 
            alert('There was an error!');  
            }
        }
      })  
    }

    return(
        <div style={{
            backgroundColor: 'lightblue',height: '700px' 
           
          }}>
        <form onSubmit={e=>submitForm(e)}>
        <div className="main-box">
        <div className="row">
            <div className="col-md-12 text-center"><h1>Change Username and Password</h1></div>
    </div>
    
    <div className="row">
    <div className="col-md-6">ID</div>
    <div className="col-md-6">
        <input type="text" name="id" className="form-control"
        onChange={handleChange} value={data.id}
        />
    </div>
</div>
    <div className="row">
    <div className="col-md-6">Old Username</div>
    <div className="col-md-6">
        <input type="text" name="oldusername" className="form-control"
        onChange={handleChange} value={data.oldusername}
        />
    </div>
</div>
<div className="row">
    <div className="col-md-6">New Username</div>
    <div className="col-md-6">
        <input type="text" name="newusername" className="form-control"
        onChange={handleChange} value={data.newusername}
        />
    </div>
</div>
<div className="row">
    <div className="col-md-6">Old Password</div>
    <div className="col-md-6">
        <input type="password" name="oldpassword" className="form-control"
        onChange={handleChange} value={data.oldpassword}
        />
    </div>
</div>
<div className="row">
    <div className="col-md-6">New Password</div>
    <div className="col-md-6">
        <input type="password" name="newpassword" className="form-control"
        onChange={handleChange} value={data.newpassword} 
        />
    </div>
</div>
<div className="row">
    <div className="col-md-6">Confirm New Password</div>
    <div className="col-md-6">
        <input type="password" name="retypenewpassword" className="form-control"
        onChange={onInputChange} onBlur={validateInput} value={input.retypenewpassword} 
        />
        {error.retypenewpassword && <span className='err'>{error.retypenewpassword}</span>}
    </div>
    
</div>
<div className="row">
        <div className="col-md-6 text-center" >
        <input type="reset" name="back" value="Back" className="btn btn-success button2"
            onClick={navigatetoDashboard}/> 
            
        </div>
 
        <div className="col-md-6 text-center" >
            <input type="submit" name="submit" value="Submit" className="btn btn-success button2"/>
        </div>
        
        </div>
    </div>
    </form>
    </div>
    )
}

export default Changepwadmin;