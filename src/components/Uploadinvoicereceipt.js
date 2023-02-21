import React, { useEffect, useState,useRef } from 'react'; 
import axios from 'axios';  
import {useNavigate,useLocation, useParams} from "react-router-dom";
import S3 from 'react-aws-s3';
import { SlowBuffer } from 'buffer';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

function Uploadinvoicereceipt(){
    let navigate=useNavigate();
    const location=useLocation();
    const {id}=useParams();
  
    const [selectedInvoice1, setSelectedInvoice1] = useState(null);
    const [selectedInvoice2, setSelectedInvoice2] = useState(null);
    const [selectedReceipt1, setSelectedReceipt1] = useState(null);
    const [selectedReceipt2, setSelectedReceipt2] = useState(null);
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }
    const handleInvoice1Input = (e) => {
        
        setSelectedInvoice1(e.target.files[0]);
    }
    const handleInvoice2Input = (e) => {
        setSelectedInvoice2(e.target.files[0]);

    }
    const handleReceipt1Input = (e) => {

        setSelectedReceipt1(e.target.files[0]);
 
    }
    const handleReceipt2Input = (e) => {
        
        setSelectedReceipt2(e.target.files[0]);
    }
    const loadClient=async()=>{
        const result=await axios.get("http://localhost/immigrationcrm_react-php/getinvoicedetails.php?id="+id);
        setData(result.data);
        //console.log(result);
    }

    const [Data, setData]=useState({
        ID:"",
        First_name:"",
        Middle_name:"",
        Surname:"",
   Payment_status:"",
   Invoice1:"",
   Invoice2:"",
   Receipt1:"",
   Receipt2:""
    })
  
    useEffect(()=>{
        loadClient();
    },[]);
    
    const {ID,First_name,Middle_name,Surname,Payment_status,Invoice1,Invoice2,Receipt1,Receipt2}=Data;
    const handleChange=(e)=>{
             setData({...Data,[e.target.name]: e.target.value});
            
         }
   //upload invoice 1   
         const uploadInvoice1 = async (file) => {
            if(file==null){
                alert("No File Chosen!");
            }else{
                let filename=file.name;
                let extension=filename.split(".").pop();
                let newfilename=Data.First_name+Data.Surname+Data.ID+"_Invoice1"+"."+extension;
                const ReactS3Client = new S3(config);
            // the name of the file uploaded is used to upload it to S3
            ReactS3Client
            .uploadFile(file, newfilename)
            .then((data)=>{
              Data.File_name=newfilename;
              Data.Doctype="Invoice1";
              axios.post('http://localhost/immigrationcrm_react-php/uploadinvoicedetails.php',Data)
              .then((result)=>{
                if (result.data.status === 'Valid') { 
                    alert('Invoice 1 uploaded successfully!');                      
                }
                else  {
                alert('Invoice 1 not uploaded!');  
                }
             });
            })
            .catch(err => console.error(err)) } }   
        
   //upload invoice 2
   const uploadInvoice2 = async (file) => {
    if(file==null){
        alert("No File Chosen!");
    }else{
        let filename=file.name;
        let extension=filename.split(".").pop();
        let newfilename=Data.First_name+Data.Surname+Data.ID+"_Invoice2"+"."+extension;
        const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, newfilename)
    .then((data)=>{
      Data.File_name=newfilename;
      Data.Doctype="Invoice2";
      axios.post('http://localhost/immigrationcrm_react-php/uploadinvoicedetails.php',Data)
      .then((result)=>{
        if (result.data.status === 'Valid') { 
            alert('Invoice 2 uploaded successfully!');                      
        }
        else  {
        alert('Invoice 2 not uploaded!');  
        }
     });
    })
    .catch(err => console.error(err)) } }   

   //upload receipt 1
   const uploadReceipt1 = async (file) => {
    if(file==null){
        alert("No File Chosen!");
    }else{
        let filename=file.name;
        let extension=filename.split(".").pop();
        let newfilename=Data.First_name+Data.Surname+Data.ID+"_Receipt1"+"."+extension;
        const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3
    ReactS3Client
    .uploadFile(file, newfilename)
    .then((data)=>{
      Data.File_name=newfilename;
      Data.Doctype="Receipt1";
      axios.post('http://localhost/immigrationcrm_react-php/uploadinvoicedetails.php',Data)
      .then((result)=>{
        if (result.data.status === 'Valid') { 
            alert('Receipt 1 uploaded successfully!');                      
        }
        else  {
        alert('Receipt 1 not uploaded!');  
        }
     });
    })
    .catch(err => console.error(err)) } }   

    //upload receipt 2
    const uploadReceipt2 = async (file) => {
        if(file==null){
            alert("No File Chosen!");
        }else{
            let filename=file.name;
            let extension=filename.split(".").pop();
            let newfilename=Data.First_name+Data.Surname+Data.ID+"_Receipt2"+"."+extension;
            const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, newfilename)
        .then((data)=>{
          Data.File_name=newfilename;
          Data.Doctype="Receipt2";
          axios.post('http://localhost/immigrationcrm_react-php/uploadinvoicedetails.php',Data)
          .then((result)=>{
            if (result.data.status === 'Valid') { 
                alert('Receipt 2 uploaded successfully!');                      
            }
            else  {
            alert('Receipt 2 not uploaded!');  
            }
         });
        })
        .catch(err => console.error(err)) } }   
    
        const finishupload = () => {
    
            Data.Payment_status=Payment_status;
            Data.Doctype="finish";
            //console.log(Data);   
            axios.post('http://localhost/immigrationcrm_react-php/uploadinvoicedetails.php',Data)
                  .then((result)=>{
                    console.log(result);
                    if (result.data.status === 'Valid') { 
                        alert('Upload complete!');   
                        navigate('/listallinvoicereceipt');                   
                    }
                    else  {
                    alert('Upload not complete!');  
                    }
                 });
            
          };
        
        const navigatetoListallinvoicereceipt = () => {
        
            navigate('/listallinvoicereceipt');
          };

    return(
        <div style={{
            backgroundColor: 'lightblue',height: '700px' 
           
          }}>
            
           <div className="main-box">
        <div className="row">
            <div className="col-md-12 text-center"><h1>Upload Invoices and Receipts</h1></div>
        </div>
        <div className="row">
            <div className="col-md-4">ID</div>
            <div className="col-md-4">
                <input type="text" name="id" className="form-control"
                onChange={e=>handleChange(e)} value={ID}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">First Name</div>
            <div className="col-md-4">
                <input type="text" name="first_name" className="form-control"
                onChange={e=>handleChange(e)} value={First_name}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Middle Name</div>
            <div className="col-md-4">
                <input type="text" name="middle_name" className="form-control"
                onChange={e=>handleChange(e)} value={Middle_name}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Surname</div>
            <div className="col-md-4">
                <input type="text" name="surname" className="form-control"
                onChange={e=>handleChange(e)} value={Surname}/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Payment Status</div>
            <div className="col-md-4">
            <select id="Payment_status" name="Payment_status" className="form-control" 
                onChange={e=>handleChange(e)} value={Payment_status}>
                    <option selected>Click to select</option>
                    <option value="Payment Pending" >Payment Pending</option>
                    <option value="1st Installment Paid">1st Installment Paid</option>
                    <option value="2nd Installment Paid">2nd Installment Paid</option> 
                    <option value="Payment Complete">Payment Complete</option>  
                </select>
                
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">Upload Invoice 1</div>
            <div className="col-md-4">
                <input type="file" name="Invoice1" className="form-control"
                onChange={e=>handleInvoice1Input(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadInvoice1(selectedInvoice1)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Upload Invoice 2</div>
            <div className="col-md-4">
                <input type="file" name="Invoice2" className="form-control" 
                onChange={e=>handleInvoice2Input(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadInvoice2(selectedInvoice2)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Upload Receipt 1</div>
            <div className="col-md-4">
                <input type="file" name="Receipt1" className="form-control" 
                onChange={e=>handleReceipt1Input(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadReceipt1(selectedReceipt1)}/>
        </div>
        </div>
        <div className="row">
            <div className="col-md-4">Upload Receipt 2</div>
            <div className="col-md-4">
                <input type="file" name="Receipt2" className="form-control" 
                onChange={e=>handleReceipt2Input(e)}/>
            </div>
            <div className="col-md-4 text-center" >
            <input type="submit" name="Upload" value="Upload" className="btn btn-success"
            onClick={() => uploadReceipt2(selectedReceipt2)}/>
        </div>
        </div>
        
        <div className="row">
        <div className="col-md-12 text-center" >
            <input type="submit" name="Finish" value="Finish" className="btn btn-success button2"
            onClick={finishupload}/>
        </div>

       
        
        </div>
        </div>
       
        </div>
       
        
    )
}
export default Uploadinvoicereceipt;