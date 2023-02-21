import { useState, useEffect } from 'react';
import axios from 'axios';  
import AWS from 'aws-sdk';
import {useNavigate, useParams,useLocation} from "react-router-dom";
import S3 from 'react-aws-s3'; 
const  Archive=()=>{
    let navigate=useNavigate();
    const location=useLocation();
    const {id}=useParams();
    const [user,setClient]=useState({ 

    Key:""
});
//let stateData=location.state;
//let stateid=stateData["id"];

    const navigatetoDashboard = () => {
        //console.log(location.state.id);
        navigate('/dashboard-admin');
      };
      const config = {
        bucketName: "immiclientfiles-archives",
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        region: process.env.REACT_APP_REGION,
      });
      const s3 = new AWS.S3();

      const [listFiles, setListFiles] = useState([]);

        const loaddocuments = () => {
        
            const params = {
                Bucket: 'immiclientfiles-archives',
                Delimiter: '',
              }; 
              s3.listObjectsV2(params, (err, data) => {
                if (err) {
                  console.log(err, err.stack);
                } else {
                  setListFiles(data.Contents);
                  //console.log(data.Contents);
                }
              });
          };
        
      const downloadfiles=(Key)=>{
        //console.log(Key);
        user.Key=Key;
        axios.post('http://localhost/immigrationcrm_react-php/downloadfromarchives.php',user)
        
                    .then((result)=>{
                        if(result.data.status=="Success")
                        alert("Document downloaded successfully");
                        else alert("Error Downloading the file");
                    }).catch(()=>{alert("Error");});
                    

      } 
      const deletefiles=(Key)=>{
        //console.log(Key);
        const ReactS3Client = new S3(config);
                const filename=Key;
                ReactS3Client
                    .deleteFile(filename)
                    .then((response) => {console.log(response); alert("Deleted successfully");
                    
                })
                    .catch(err => console.error(err))


      } 
      
      
    
    return(
        <div   style={{backgroundColor: 'lightblue',height: '700px'  }}>
            
           <div  className="main-box">
            <div className="row">
            <div className="col-md-12 text-center"><h1>Archive</h1></div>
           
        </div>
        <div className="row">
        <ul className='list-group'>
              {listFiles &&
                listFiles.map((name, index) => (
                    <div className="col-md-12 text-center" >
                        
                  <li className='list-group-item' key={index}>
                    {name.Key} 
                    <div className="row">
                    <div className="col-md-6 text-center">
                    <button name="download" className="btn btn-success button1"
            onClick={()=>downloadfiles(name.Key)}>Download</button> 
            </div>
            <div className="col-md-6 text-center">
            <button name="delete" className="btn btn-success button1"
            onClick={()=>deletefiles(name.Key)}>Delete</button>   
          </div> 
          </div>
                   
                  </li> 
                  </div>
                ))}
                
            </ul>
        </div>
        <div className="row">
        <div className="col-md-6 text-center" >
        <input type="reset" name="back" value="Back" className="btn btn-success button2"
            onClick={navigatetoDashboard}/> 
            
        </div>
        
          <div className="col-md-6 text-center" >
        <input type="reset" name="refresh" value="Refresh" className="btn btn-success button2"
            onClick={loaddocuments}/> 
            
        </div>
        


         </div> 
       
        </div>
        </div>
        
        
        
    )
}
export default Archive;