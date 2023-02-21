import { useState, useEffect } from 'react';
import axios from 'axios';  
import AWS from 'aws-sdk';
import {useNavigate, useParams,useLocation} from "react-router-dom";
import S3 from 'react-aws-s3'; 
const  Lists3files=()=>{
    let navigate=useNavigate();
    const location=useLocation();
    const {id}=useParams();
    const [user,setClient]=useState({ 
    ID:"",
    First_name:"",
    Middle_name:"",
    Surname:"",
    Key:""
});
//let stateData=location.state;
//let stateid=stateData["id"];

    const navigatetoListall = () => {
       // console.log(location.state.id);
        navigate('/listall');
      };
      
      const loadClients=async()=>{
        const result=await axios.get('http://localhost/immigrationcrm_react-php/getmindetails.php?id='+id);
        setClient(result.data);
        //console.log(result);   
    }
    const config = {
      bucketName: "immiclientfilesbucket",
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
      
        useEffect(() => {
            loadClients();      
        }, []);
        const loaddocuments = () => {
        
            const params = {
                Bucket: 'immiclientfilesbucket',
                Delimiter: '',
                Prefix: user.First_name+user.Surname+user.ID,
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
        axios.post('http://localhost/immigrationcrm_react-php/downloaddocs.php',user)
        
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
        <div style={{backgroundColor: 'lightblue',height: '700px'  }}>
            
           <div className="main-box" >
        <div className="row">
            <div className="col-md-12 text-center"><h1>All files of {user.First_name} {user.Middle_name} {user.Surname}</h1></div>
           
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
                    <button name="download" className="btn btn-outline-success"
            onClick={()=>downloadfiles(name.Key)}>Download</button> 
          </div>  
          
          <div className="col-md-6 text-center">
            <button name="delete" className="btn btn-outline-success"
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
            onClick={navigatetoListall}/> 
            
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
export default Lists3files;