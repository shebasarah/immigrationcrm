import { useState, useEffect } from 'react';
import axios from 'axios';  
import AWS from 'aws-sdk';
import {useNavigate, useParams,useLocation} from "react-router-dom";
const  Lists3clientfiles=()=>{
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
    const navigatetoclientdashboard = () => {
        
        navigate('/dashboard-client',{state:{id:location.state.id}});
      };
      
      const loadClients=async()=>{
        const result=await axios.get('http://localhost/immigrationcrm_react-php/getmindetails.php?id='+location.state.id);
        setClient(result.data);
        //console.log(result);   
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
    return(
        <div  style={{backgroundColor: 'lightblue',height: '700px'  }}>
            
           <div className="main-box">
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
                    <div>
                    <button name="download" className="btn btn-outline-success"
            onClick={()=>downloadfiles(name.Key)}>Download</button> 
          </div> 
                   
                  </li> 
                  </div>
                ))}
                
            </ul>
        </div>
        <div className="row">
        <div className="col-md-6 text-center" >
        <input type="reset" name="back" value="Back" className="btn btn-success button2"
            onClick={navigatetoclientdashboard}/> 
            
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
export default Lists3clientfiles;