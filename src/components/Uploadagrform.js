import React, { useEffect, useState,useRef } from 'react'; 
import axios from 'axios';  
import {useNavigate, useParams,useLocation} from "react-router-dom";
import S3 from 'react-aws-s3';
import { SlowBuffer } from 'buffer';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

function Uploadagrform(){
    let navigate=useNavigate();
    const location=useLocation;
    //console.log(location.state.id);
    const {id}=useParams();
    //trial
    const [selectedFile, setSelectedFile] = useState(null);
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }
    const handleFileInput = (e) => {
        
        setSelectedFile(e.target.files[0]);
    }

    const [Data, setData]=useState({
        ID:"",
        First_name:"",
        Middle_name:"",
        Surname:"",
        Visa_type:"",
        File_location:"",
        File_name:""
    })
  
    useEffect(()=>{
        loadClient();
    },[]);
    
    const {ID,First_name,Middle_name,Surname,Visa_type,File_location}=Data;
    const handleChange=(e)=>{
             setData({...Data,[e.target.name]: e.target.value});
            
         }
      
    const loadClient=async()=>{
            const result=await axios.get("http://localhost/immigrationcrm_react-php/getmindetails.php?id="+id);
            setData(result.data);
            //console.log(result);
        }

        const uploadFile = async (file) => {
            if(file==null){
                alert("No File Chosen!");
            }else{
                let filename=file.name;
                let extension=filename.split(".").pop();
                //console.log(extension);
                let newfilename=Data.First_name+Data.Surname+Data.ID+"_AgreementForm"+"."+extension;
                //console.log(newfilename);
                const ReactS3Client = new S3(config);

            // the name of the file uploaded is used to upload it to S3
            ReactS3Client
            .uploadFile(file, newfilename)
            .then((data)=>{alert("Upload Successful");
            Data.File_name=newfilename;
            Data.File_location=data.location;
            axios.post('http://localhost/immigrationcrm_react-php/updateagrformstatus.php',Data);
            navigate(`/listallagr`);})
            .catch(err => console.error(err))
    
            }
            
            
        }
        
        const navigatetoListallagr = () => {
        
            navigate('/listallagr');
          };


    return(
        <div style={{
            backgroundColor: 'lightblue',height: '700px'
           
          }}>
            
           <div className="main-box">
        <div className="row">
            <div className="col-md-12 text-center"><h1>Upload Agreement Form</h1></div>
        </div>
        <div className="row">
            <div className="col-md-6">ID</div>
            <div className="col-md-6">
                <input type="text" name="id" className="form-control"
                onChange={e=>handleChange(e)} value={ID}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">First Name</div>
            <div className="col-md-6">
                <input type="text" name="first_name" className="form-control"
                onChange={e=>handleChange(e)} value={First_name}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Middle Name</div>
            <div className="col-md-6">
                <input type="text" name="middle_name" className="form-control"
                onChange={e=>handleChange(e)} value={Middle_name}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Surname</div>
            <div className="col-md-6">
                <input type="text" name="surname" className="form-control"
                onChange={e=>handleChange(e)} value={Surname}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Visa Type</div>
            <div className="col-md-6">
            <input type="text" name="visa_type" className="form-control"
                onChange={e=>handleChange(e)} value={Visa_type}/>
                
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Upload Agreement Form</div>
            <div className="col-md-6">
                <input type="file" name="Agrform" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
        </div>
        
        <div className="row">
            <div className="col-md-6 text-center" >
                <button className="btn btn-success button2" onClick={() => uploadFile(selectedFile)}>
                    Upload</button>
            </div>
            <div className="col-md-6 text-center" >
                <button className="btn btn-success button2" onClick={navigatetoListallagr}>
                    Back</button>
            </div>
        </div>
        </div>
       
        </div>
       
        
    )
}
export default Uploadagrform;