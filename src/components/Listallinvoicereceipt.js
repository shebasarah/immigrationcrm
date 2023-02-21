import axios from 'axios';  
import {useNavigate,useLocation,Link} from "react-router-dom";
import React, { useEffect, useState, useParams } from 'react' ;
import S3 from 'react-aws-s3'; 


function Listallinvoicereceipt(){
    let navigate = useNavigate();
const location=useLocation();

    const [user,setClient]=useState([]);
    const [data, setData]=useState({
        ID:"",
        First_name:"",
        Surname:"",
        Agr_file_name:"",
        id:""
    })
   
    const handleChange=(e)=>{
        setData({...data,[e.target.name]: e.target.value});
       
    }
    const sendData = {
        id:data.ID

    }

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }

    useEffect(()=>{
        loadClients();
    },[]);
    const loadClients=async()=>{
        const result=await axios.get('http://localhost/immigrationcrm_react-php/listallinvoice.php');
        setClient(result.data.records);
        //console.log(result);
        
    }
    const navigatetogenerateinvoice = (clientID) => {
        
        navigate('/generateinvoice',
        {state:{clientID:clientID}});
      };
      const navigatetogeneratereceipt = (clientID) => {
        
        navigate('/generatereceipt',
        {state:{clientID:clientID}});
      };
    const navigatetoDashboard = () => {
        
        navigate('/dashboard-admin');
      };

    return(
        <div  style={{
            backgroundColor: 'lightblue',
           
          }}>
        <div>
            <div className="row">
                <div className="col-md-12 text-center"><h1>All Invoices and Receipts</h1></div>
        </div>
        <hr/>
        <div className="maincontainer mb-5 mt-5 text-center">
        <table class="table table-hover fixed" style={{}}>
            <thead>
                <tr>
                    <td>Index</td>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Surame</th>
                    <th>Payment Status</th>          
                    <th>Invoice 1</th>
                    <th>Invoice 2</th>
                    <th>Receipt 1</th>
                    <th>Receipt 2</th>
                    <th>Generate Invoice</th>
                    <th>Generate Receipt</th>
                    <th>Upload</th>
                    
                </tr>
            </thead>
            <tbody>
                {user.map((user,index)=>(
                <tr>
                    <td>{index+1}</td>
                    <td>{user.First_name}</td>
                    <td>{user.Middle_name}</td>
                    <td>{user.Surname}</td>
                    <td>{user.Payment_status}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Invoice1}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Invoice2}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Receipt1}</td>
                    <td style={{wordWrap:'break-word'}}>{user.Receipt2}</td>
                    <td><button type="button" class="btn btn-link" onClick={()=>navigatetogenerateinvoice(user.ID)}>Generate Invoice</button></td>
                    <td><button type="button" class="btn btn-link" onClick={()=>navigatetogeneratereceipt(user.ID)}>Generate Receipt</button></td>
                    <td><Link to={`/uploadinvoicereceipt/${user.ID}`}>Upload</Link></td>
                    
                    
                    
                </tr>))}
            </tbody>
        </table>
        </div>
        <div className="row">
        <div className="col-md-12 text-center" >
        <input type="reset" name="back" value="Go Back To Dashboard" className="btn btn-success form-control"
            onClick={navigatetoDashboard}/> 
            
        </div>
        
        </div>
        
        </div>
        
        </div>
        
        
        
    )
}

export default Listallinvoicereceipt;



