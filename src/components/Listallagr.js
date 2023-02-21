import axios from 'axios';  
import {useNavigate,useLocation,Link} from "react-router-dom";
import React, { useEffect, useState, useParams } from 'react' ;
import S3 from 'react-aws-s3'; 
//import AWS from 'aws-sdk';


function Listallagr(){
    let navigate = useNavigate();
const location=useLocation();

//console.log(location.state.id);
//const {id}=useParams();
    const [user,setClient]=useState([]);
    const [data, setData]=useState({
        ID:"",
        First_name:"",
        Surname:"",
        Agr_file_name:""
    })
    //const {ID,First_name,Surname}=data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name]: e.target.value});
       
    }
    const sendData = {
        id:data.ID,
        filename:data.filename

    }
    //console.log(sendData);
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }
    /*
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      });
*/
    useEffect(()=>{
        loadClients();
    },[]);
    const loadClients=async()=>{
        const result=await axios.get('http://localhost/immigrationcrm_react-php/listallagr.php');
        setClient(result.data.records);
        //console.log(result);
        
    }
    
    const deleteagrform=(ID,First_name,Surname)=>{
        
        data.ID=ID;
        data.First_name=First_name;
        data.Surname=Surname;
        //console.log(data);
        axios.post("http://localhost/immigrationcrm_react-php/getagrfilename.php",sendData)
        .then((result)=>{
            //console.log(result.data.Agr_file_name);
            
            if (result.data.Agr_file_name === 'NULL') { 
                alert("No Agreement file found!"); 
            }
            else{
                const ReactS3Client = new S3(config);
                const filename=result.data.Agr_file_name;
                ReactS3Client
                    .deleteFile(filename)
                    .then((response) => {console.log(response);
                    axios.delete('http://localhost/immigrationcrm_react-php/deleteagrform.php',{data:{ID:ID}})
                    .then((result)=>{
                        alert("Agreement file deleted successfully");
                        loadClients();
                    }).catch(()=>{alert("Error");});
                })
                    .catch(err => console.error(err))

                

            }
       
      })
      .catch(err => console.error(err));  
           
        
    }

 

    
    const downloadagrform=(ID,First_name,Surname)=>{
        
        data.ID=ID;
        data.First_name=First_name;
        data.Surname=Surname;
        //console.log(data);
        axios.post("http://localhost/immigrationcrm_react-php/getagrfilename.php",sendData)
        .then((result)=>{
            //console.log(result.data.Agr_file_name);
            
            if (result.data.Agr_file_name === 'null') { 
                alert("No Agreement file found!"); 
            }
            else{
                
                const filename=result.data.Agr_file_name;
                data.filename=filename;
               
                    axios.post('http://localhost/immigrationcrm_react-php/downloadagrform.php',sendData)
                    .then((result)=>{
                        if(result.data.status=="Error")
                        alert("Error Downloading the file");
                        else  alert("Agreement file downloaded successfully");
                    }).catch(()=>{alert("Error");});
                
            }
       
      })
      .catch(err => console.error(err));  
           
        
    }
    
  

    const navigatetoDashboard = () => {
        //console.log(location.state.id);
        navigate('/dashboard-admin');
      };
      const navigatetogenerateagrform = (clientID) => {
        
        navigate('/generateagreement',
        {state:{clientID:clientID}});
      };

    return(
        
        <div className="maincontainer" style={{
            backgroundColor: 'lightblue',
           
          }}>
            <div className="row">
                <div className="col-md-12 text-center"><h1>All Agreement Forms</h1></div>
        </div>
        <div className="container mb-5 mt-5 text-left">
        <table class="table table-hover">
            <thead>
                <tr>
                    <td>Index</td>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Surame</th>
                    <th>Email</th>          
                    <th>Agreement Form Status</th>
                    <th>Generate Agreement Form</th>
                    <th>Upload Form</th>
                    <th>Download Form</th>
                    <th>Delete Form</th>
                </tr>
            </thead>
            <tbody>
                {user.map((user,index)=>(
                <tr>
                    <td>{index+1}</td>
                    <td>{user.First_name}</td>
                    <td>{user.Middle_name}</td>
                    <td>{user.Surname}</td>
                    <td>{user.Email}</td>
                    <td>{user.Agr_form_status}</td>
                    <td><button type="button" class="btn btn-link" onClick={()=>navigatetogenerateagrform(user.ID)}>Generate</button></td>
                    <td><Link to={`/uploadagrform/${user.ID}`}>Upload</Link></td>
                    <td><Link to="" onClick={()=>downloadagrform(user.ID,user.First_name,user.Surname)} >&nbsp;Download</Link></td>
                    <td><Link to="" onClick={()=>deleteagrform(user.ID,user.First_name,user.Surname)}>&nbsp;Delete</Link></td>
                    
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
        
    
        
        
        
    )
}

export default Listallagr;



