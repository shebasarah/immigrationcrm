import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Login_client=()=>{
    let navigate = useNavigate();
    
    const [user,setUser]=useState({id:'',username:'',password:''})

    const handleChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value}); 
    }


    const submitForm=(e)=>{
        e.preventDefault(); 
       const sendData = {
            id:user.id,
            username:user.username,
            password:user.password

        }

       // console.log(sendData);

        axios.post('http://localhost/immigrationcrm_react-php/clientlogin.php',sendData)
        .then((result)=>{
            //console.log(result);
            if (result.data.status === 'Valid') { 
                alert("Welcome!");
              navigate(`/dashboard-client`,{state:{id:user.id}});  
            }
        else  {
            alert('Oops, There was an error!');  
        }
      })  
    }
    

    return(
        <form onSubmit={e=>submitForm(e)} style={{
            backgroundColor: 'lightblue',
            width: '1275px',
            height: '600px'
          }}>
        <div className="main-box">
        <div className="row">
            <div className="col-md-12 text-center"><h1>Client Login Page</h1></div>
    </div>
    
    <div className="row">
    <div className="col-md-6">ID</div>
    <div className="col-md-6">
        <input type="text" name="id" className="form-control"
        onChange={handleChange} value={user.id} required
        />
    </div>
</div>
    <div className="row">
    <div className="col-md-6">Username</div>
    <div className="col-md-6">
        <input type="text" name="username" className="form-control"
        onChange={handleChange} value={user.username} required
        />
    </div>
</div>
<div className="row">
    <div className="col-md-6">Password</div>
    <div className="col-md-6">
        <input type="password" name="password" className="form-control"
        onChange={handleChange} value={user.password} required
        />
    </div>
</div>
<div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Login" className="btn btn-success button2"/>
        </div>
    </div>
    </div>
    </form>
    )
}

export default Login_client;