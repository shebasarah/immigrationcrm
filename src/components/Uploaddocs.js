import React, { useEffect, useState,useRef } from 'react'; 
import axios from 'axios';  
import {useNavigate,useLocation, useParams} from "react-router-dom";
import S3 from 'react-aws-s3';
import { SlowBuffer } from 'buffer';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

function Uploaddocs(){
    let navigate = useNavigate();
    const location=useLocation();
    const [selectedFile, setSelectedFile] = useState(null);
   
    const handleFileInput = (e) => {
        
        setSelectedFile(e.target.files[0]);
        
    }
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }
    const [Data, setData]=useState({
        ID:"",
        First_name:"",
        Middle_name:"",
        Surname:"",
        Partnership_status:"",
        Children_num:""
    })
    useEffect(()=>{
        
        loadClient();
        
    },[]);
    const {ID,First_name,Middle_name,Surname,Partnership_status,Children_num}=Data;
    const handleChange=(e)=>{
             setData({...Data,[e.target.name]: e.target.value});
            
         }
     const loadClient=async()=>{
            const result=await axios.get("http://localhost/immigrationcrm_react-php/getmindetails.php?id="+location.state.id);
            setData(result.data);
            //console.log(result);
           // const Result=await axios.get("http://localhost/immigrationcrm_react-php/getdetailsfromclientdocs.php?id="+location.state.id);
           // setData(Result.data);
        }
//upload Education certificates
        const uploadEducert = async (file) => {
            if(file==null){
                alert("No File Chosen!");
            }else{
                let filename=file.name;
                let extension=filename.split(".").pop();
                //console.log(extension);
                let newfilename=Data.First_name+Data.Surname+Data.ID+"_EducationCertificates"+"."+extension;
                //console.log(newfilename);
                const ReactS3Client = new S3(config);

            // the name of the file uploaded is used to upload it to S3
            ReactS3Client
            .uploadFile(file, newfilename)
            .then((data)=>{
              Data.File_name=newfilename;
            //Data.File_location=data.location;
              Data.Doctype="Edu_cert";
              axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
              .then((result)=>{
                if (result.data.status === 'Valid') { 
                    alert('Education certificates uploaded successfully!'); 
                    //loadClient();                       
                }
                else  {
                alert('Education certificates not uploaded!');  
                }
             });
            })
            .catch(err => console.error(err)) } }
  //upload experience certifictaes
  const uploadExpcert = async (file) => {
    if(file==null){
        alert("No File Chosen!");
    }else{
        let filename=file.name;
        let extension=filename.split(".").pop();
        //console.log(extension);
        let newfilename=Data.First_name+Data.Surname+Data.ID+"_ExperienceCertificates"+"."+extension;
        //console.log(newfilename);
        const ReactS3Client = new S3(config);

    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, newfilename)
    .then((data)=>{
      Data.File_name=newfilename;
    //Data.File_location=data.location;
      Data.Doctype="Exp_cert";
      axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
      .then((result)=>{
        if (result.data.status === 'Valid') { 
            alert('Experience certificates uploaded successfully!'); 
            //loadClient();                       
        }
        else  {
        alert('Experience certificates not uploaded!');  
        }
     });
    })
    .catch(err => console.error(err)) } }          
            
 //upload CV
 const uploadCV = async (file) => {
    if(file==null){
        alert("No File Chosen!");
    }else{
        let filename=file.name;
        let extension=filename.split(".").pop();
        let newfilename=Data.First_name+Data.Surname+Data.ID+"_CV"+"."+extension;
        const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, newfilename)
    .then((data)=>{
      Data.File_name=newfilename;
      Data.Doctype="CV";
      axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
      .then((result)=>{
        if (result.data.status === 'Valid') { 
            alert('CV uploaded successfully!');                      
        }
        else  {
        alert('CV not uploaded!');  
        }
     });
    })
    .catch(err => console.error(err)) } }  
 //upload SOP
 const uploadSOP = async (file) => {
    if(file==null){
        alert("No File Chosen!");
    }else{
        let filename=file.name;
        let extension=filename.split(".").pop();
        let newfilename=Data.First_name+Data.Surname+Data.ID+"_SOP"+"."+extension;
        const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, newfilename)
    .then((data)=>{
      Data.File_name=newfilename;
      Data.Doctype="SOP";
      axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
      .then((result)=>{
        if (result.data.status === 'Valid') { 
            alert('SOP uploaded successfully!');                      
        }
        else  {
        alert('SOP not uploaded!');  
        }
     });
    })
    .catch(err => console.error(err)) } }   
    
    //upload Passport
    const uploadPassport = async (file) => {
        if(file==null){
            alert("No File Chosen!");
        }else{
            let filename=file.name;
            let extension=filename.split(".").pop();
            let newfilename=Data.First_name+Data.Surname+Data.ID+"_Passport"+"."+extension;
            const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, newfilename)
        .then((data)=>{
          Data.File_name=newfilename;
          Data.Doctype="Passport";
          axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
          .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('Passport uploaded successfully!');                      
            }
            else  {
            alert('Passport not uploaded!');  
            }
         });
        })
        .catch(err => console.error(err)) } }  

   //upload D proof
   const uploadIDproof = async (file) => {
    if(file==null){
        alert("No File Chosen!");
    }else{
        let filename=file.name;
        let extension=filename.split(".").pop();
        let newfilename=Data.First_name+Data.Surname+Data.ID+"_IDProof"+"."+extension;
        const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, newfilename)
    .then((data)=>{
      Data.File_name=newfilename;
      Data.Doctype="ID_proof";
      axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
      .then((result)=>{
        if (result.data.status === 'Valid') { 
            alert('ID Proof uploaded successfully!');                      
        }
        else  {
        alert('ID Proof not uploaded!');  
        }
     });
    })
    .catch(err => console.error(err)) } }       

    //upload PCC
    const uploadPCC = async (file) => {
        if(file==null){
            alert("No File Chosen!");
        }else{
            let filename=file.name;
            let extension=filename.split(".").pop();
            let newfilename=Data.First_name+Data.Surname+Data.ID+"_PCC"+"."+extension;
            const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, newfilename)
        .then((data)=>{
          Data.File_name=newfilename;
          Data.Doctype="PCC";
          axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
          .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('PCC uploaded successfully!');                      
            }
            else  {
            alert('PCC not uploaded!');  
            }
         });
        })
        .catch(err => console.error(err)) } }  

    //upload partnership proof
    const uploadPartnershipproof = async (file) => {
        if(file==null){
            alert("No File Chosen!");
        }else{
            let filename=file.name;
            let extension=filename.split(".").pop();
            let newfilename=Data.First_name+Data.Surname+Data.ID+"_Partnershipproof"+"."+extension;
            const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, newfilename)
        .then((data)=>{
          Data.File_name=newfilename;
          Data.Doctype="Partnership_proof";
          axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
          .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('Partnership proof uploaded successfully!');                      
            }
            else  {
            alert('Partnership proof not uploaded!');  
            }
         });
        })
        .catch(err => console.error(err)) } }  

       //upload children docs
       
       const uploadChildrendoc = async (file) => {
        if(file==null){
            alert("No File Chosen!");
        }else{
            let filename=file.name;
            let extension=filename.split(".").pop();
            let newfilename=Data.First_name+Data.Surname+Data.ID+"_Childrendoc"+"."+extension;
            const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, newfilename)
        .then((data)=>{
          Data.File_name=newfilename;
          Data.Doctype="Children_doc";
          axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
          .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('Documents uploaded successfully!');                      
            }
            else  {
            alert('Documents not uploaded!');  
            }
         });
        })
        .catch(err => console.error(err)) } }   

    //upload cover letter
    const uploadCoverletter = async (file) => {
        if(file==null){
            alert("No File Chosen!");
        }else{
            let filename=file.name;
            let extension=filename.split(".").pop();
            let newfilename=Data.First_name+Data.Surname+Data.ID+"_Childrendoc"+"."+extension;
            const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, newfilename)
        .then((data)=>{
          Data.File_name=newfilename;
          Data.Doctype="Cover_letter";
          axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
          .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('Cover Letter uploaded successfully!');                      
            }
            else  {
            alert('Cover Letter not uploaded!');  
            }
         });
        })
        .catch(err => console.error(err)) } }   
        
       //upload Emed receipt
       const uploadEmedreceipt = async (file) => {
        if(file==null){
            alert("No File Chosen!");
        }else{
            let filename=file.name;
            let extension=filename.split(".").pop();
            let newfilename=Data.First_name+Data.Surname+Data.ID+"_Emedreceipt"+"."+extension;
            const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, newfilename)
        .then((data)=>{
          Data.File_name=newfilename;
          Data.Doctype="Emed_receipt";
          axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
          .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('Emed Receipt uploaded successfully!');                      
            }
            else  {
            alert('Emed Receipt not uploaded!');  
            }
         });
        })
        .catch(err => console.error(err)) } }   

//alert(location.state.id);
const finishupload = () => {
   // Data.ID=ID;
   Data.Children_num=Children_num;
    Data.Partnership_status=Partnership_status;
 
    if(!Children_num){Data.Children_num=0;}
  

    Data.Doctype="finish";
    console.log(Data);   
    axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
          .then((result)=>{
            console.log(result);
            if (result.data.status === 'Valid') { 
                alert('Upload complete!');   
                navigate('/dashboard-client',{state:{id:location.state.id}});                   
            }
            else  {
            alert('Upload not complete!');  
            }
         });
    
  };

  //upload signed agreement file
  const uploadagrfile = async (file) => {
    if(file==null){
        alert("No File Chosen!");
    }else{
        let filename=file.name;
        let extension=filename.split(".").pop();
        let newfilename=Data.First_name+Data.Surname+Data.ID+"_AgreementForm"+"."+extension;
        const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, newfilename)
    .then((data)=>{
      Data.File_name=newfilename;
      Data.Doctype="Signedagrfile";
      axios.post('http://localhost/immigrationcrm_react-php/uploaddocs.php',Data)
      .then((result)=>{
        if (result.data.status === 'Valid') { 
            alert('Agreement File uploaded successfully!');                      
        }
        else  {
        alert('Agreement File not uploaded!');  
        }
     });
    })
    .catch(err => console.error(err)) } }   

    const navigatetoDashboard = () => {
        
        navigate('/dashboard-client',{state:{id:location.state.id}});
      };
    return(
        <div style={{
            backgroundColor: 'lightblue',height: '1300px' 
           
          }}>
            
           <div className="main-box">
        <div className="row">
            <div className="col-md-12 text-center"><h1>Upload Documents of <label>{Data.First_name}</label></h1></div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">Note: Upload a single pdf file against each category. Click 'Finish' once done.</div>
        </div>
        <div className="row">
            <div className="col-md-4">ID</div>
            <div className="col-md-4">
                <input type="text" name="ID" className="form-control"
                onChange={e=>handleChange(e)} value={ID} disabled/>
            </div>
            
        </div>
        <div className="row">
            <div className="col-md-4">First Name</div>
            <div className="col-md-4">
                <input type="text" name="First_name" className="form-control"
                onChange={e=>handleChange(e)} value={First_name} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Middle Name</div>
            <div className="col-md-4">
                <input type="text" name="Middle_name" className="form-control"
                onChange={e=>handleChange(e)} value={Middle_name} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Surname</div>
            <div className="col-md-4">
                <input type="text" name="Surname" className="form-control"
                onChange={e=>handleChange(e)} value={Surname} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Signed Agreement Form</div>
            <div className="col-md-4">
                <input type="file" name="Agrform" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadagrfile(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Education Certificates</div>
            <div className="col-md-4">
                <input type="file" name="Educertificate" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadEducert(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Experience Certificates</div>
            <div className="col-md-4">
                <input type="file" name="Expcertificate" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadExpcert(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">CV</div>
            <div className="col-md-4">
                <input type="file" name="CV" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadCV(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Cover Letter</div>
            <div className="col-md-4">
                <input type="file" name="Coverletter" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadCoverletter(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">SOP</div>
            <div className="col-md-4">
                <input type="file" name="SOP" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadSOP(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Passport</div>
            <div className="col-md-4">
                <input type="file" name="Passport" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadPassport(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">ID Proof</div>
            <div className="col-md-4">
                <input type="file" name="Idproof" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadIDproof(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">PCC</div>
            <div className="col-md-4">
                <input type="file" name="PCC" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadPCC(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Emed Receipt</div>
            <div className="col-md-4">
                <input type="file" name="Emedreceipt" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadEmedreceipt(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Partnership Status</div>
            <div className="col-md-4">
                <select id="Partnershipstatus" name="Partnership_status" className="form-control" 
                onChange={e=>handleChange(e)} value={Partnership_status} >
                    <option selected>Click to select</option>
                    <option value="Married" >Married</option>
                    <option value="Single">Single</option>
                    <option value="Living Together">Living Together</option>  
                </select>
            </div>
            
        </div>
        <div className="row">
            <div className="col-md-4">Partnership Proof Documents</div>
            <div className="col-md-4">
                <input type="file" name="Partnershipproof" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadPartnershipproof(selectedFile)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Number of Children</div>
            <div className="col-md-4">
            <input type="text" name="Children_num" className="form-control"
                onChange={e=>handleChange(e)} value={Children_num} />
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Supporting Documents for Children</div>
            <div className="col-md-4">
                <input type="file" name="Childrendocs" className="form-control"
                onChange={e=>handleFileInput(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadChildrendoc(selectedFile)}/>
        </div>
        </div>

        <div className="row">
        <div className="col-md-6 text-center" >
        <input type="reset" name="back" value="Back" className="btn btn-success button2"
            onClick={navigatetoDashboard}/> 
            
        </div>
        <div className="col-md-6 text-center" >
            <input type="submit" name="Finish" value="Finish" className="btn btn-success button2"
            onClick={finishupload}/>
        </div>
        
        
        </div>
   
        </div>
       
        </div>
       
        
    )
}
export default Uploaddocs;