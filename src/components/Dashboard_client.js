import {useState} from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';

function Dashboard_client(props){
    const navigate = useNavigate();
    const location=useLocation();
    //const [user,setClient]=useState([]);
    const navigatetoChangepw = () => {
        
        navigate('/changepwclient',{state:{id:location.state.id}});
      };
      const navigatetoUploaddocs = () => {
        
        navigate('/uploaddocs',{state:{id:location.state.id}});
      };
      const Logout = () => {
        
        navigate('/login-client');
      };
      const navigatetoTrackApplication = () => {
        
        navigate('/trackapplication',{state:{id:location.state.id}});
      };
      //console.log(location.state.id);
      const navigatetolists3clientfiles = () => {
        
        navigate('/lists3clientfiles',{state:{id:location.state.id}});
      };
    return(
        <div style={{
            backgroundColor: 'lightblue',
            width: '1275px',height: '700px' 
          }}>
        <div className="main-box" >
        <div>
            <div className="col-md-12 text-center"><h1>Client Dashboard</h1></div>
        </div>
        
       <div className="row">
       <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Upload Documents" className="form-control btn btn-outline-success"
            onClick={navigatetoUploaddocs}/>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Download Documents" className="form-control btn btn-outline-success"
            onClick={navigatetolists3clientfiles}/>
        </div>
        </div>
        

        <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Track Application" className="form-control btn btn-outline-success"
            onClick={navigatetoTrackApplication}/>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="submit" value="Change Username and Password" className="form-control btn btn-outline-success"
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

export default Dashboard_client;