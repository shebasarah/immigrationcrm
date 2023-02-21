import {useState} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';

const Dashboard_admin=()=>{
    const navigate = useNavigate();
    const location=useLocation();
   
  const navigateToRegister = () => {
    // 👇️ navigate to /Register_client
    navigate('/register-client');
  };

  const navigateTolistall = () => {
    // 👇️ navigate to /Register_client
    navigate('/listall');
  };
  const navigatetoChangepw = () => {
     //console.log(location.state.id);   
    navigate('/changepwadmin',{state:{id:location.state.id}});
  };
  const navigatetouploadinvoicereceipt = () => {
    //alert(location.state.id);
        
    navigate('/listallinvoicereceipt');
  };
  const Logout = () => {
        
    navigate('/login-admin');
  };
  const navigatetouploadagrform=()=>{
    navigate('/listallagr');
  };
  const navigatetoarchive=()=>{
    navigate('/archive');
  };
    return(
      <div style={{
        backgroundColor: 'lightblue',width: '1275px',height: '700px' }}>
        <div className="main-box" >
            <div className="row">
                <div className="col-md-12 text-center"> <h1>Admin Dashboard</h1></div>
           </div>
           <div className="row">
           <div className="col-md-12 text-center" >
                <input type="submit" name="submit" value="Register New Client" className="form-control btn btn-outline-success"
                onClick={navigateToRegister}/>
            </div>
            </div>

            <div className="row">
            <div className="col-md-12 text-center" >
                <input type="submit" name="submit" value="View All Clients" className="form-control btn btn-outline-success"
                onClick={navigateTolistall}/>
            </div>
            </div>
            <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Upload Agreement Form" className="form-control btn btn-outline-success"
            onClick={navigatetouploadagrform}/>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Upload Invoice and Receipt" className="form-control btn btn-outline-success"
            onClick={navigatetouploadinvoicereceipt}/>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Archive" className="form-control btn btn-outline-success"
            onClick={navigatetoarchive}/>
        </div>
        </div>
            
            <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Change Password" className="form-control btn btn-outline-success"
            onClick={navigatetoChangepw}/>
        </div>
        </div>
        
        <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Logout" className="form-control btn btn-outline-success"
        onClick={Logout}/>
        </div>
        </div>

            </div>
            </div>

    )
}



export default Dashboard_admin;