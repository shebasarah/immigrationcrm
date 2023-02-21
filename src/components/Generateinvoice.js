import {useEffect,useState} from "react";
import { useNavigate,useLocation,Link } from "react-router-dom";
import axios from 'axios';

const Generateinvoice=()=>{
    const navigate = useNavigate();
    const location=useLocation();
    const [data, setData]=useState({
        ID:"",
        First_name:"",
        Middle_name:"",
        Surname:"",
        Email:"",
        Contact_num:"",
        invoicenumber:"",
        advisorfee:"",
        immigrationfee:"",
        tax:"",
        total:"",
        Visa_type:""

    })
    const {ID,First_name,Middle_name,Surname,Email,Contact_num,Visa_type,
       invoicenumber,advisorfee,immigrationfee,tax,total}=data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name]: e.target.value});
    }
   // console.log(location.state.clientID);
    
    useEffect(()=>{
        loadClient();
    },[]);
    const loadClient=async()=>{
        const result=await axios.get("http://localhost/immigrationcrm_react-php/getclientdetails.php?id="+location.state.clientID);
        setData(result.data);
        //console.log(result);
    }
    const navigatetoDashboard = () => {
        
        navigate('/dashboard-admin');
      };
      const navigatetoinvoicepdf = () => {
        
        navigate('/invoicepdf',
        {state:{ID:ID,first_name:First_name,middle_name:Middle_name,surname:Surname,email:Email,phone:Contact_num,visatype:Visa_type,
        invoicenumber:invoicenumber,advisorfee:advisorfee,immigrationfee:immigrationfee,tax:tax,total:total}});
      };
 
    return(
      <div style={{
        backgroundColor: 'lightblue',width: '1275px',height: '900px' }}>
        <div className="main-box" >
            <div className="row">
                <div className="col-md-12 text-center"> <h1>Invoice Generator</h1></div>
           </div>
           <hr/>
           <div className="row">
            <div className="col-md-6">Client ID</div>
            <div className="col-md-6">
                <input type="text" name="ID" className="form-control"
                onChange={e=>handleChange(e)} value={ID} disabled/>
            </div>
        </div>
           <div className="row">
            <div className="col-md-6">First Name</div>
            <div className="col-md-6">
                <input type="text" name="first_name" className="form-control"
                onChange={e=>handleChange(e)} value={First_name} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Middle Name</div>
            <div className="col-md-6">
                <input type="text" name="middle_name" className="form-control"
                onChange={e=>handleChange(e)} value={Middle_name} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Surname</div>
            <div className="col-md-6">
                <input type="text" name="surname" className="form-control"
                onChange={e=>handleChange(e)} value={Surname} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Email</div>
            <div className="col-md-6">
                <input type="email" name="email" className="form-control"
                onChange={e=>handleChange(e)} value={Email} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Visa Type</div>
            <div className="col-md-6">
                <input type="visa type" name="visa type" className="form-control"
                onChange={e=>handleChange(e)} value={Visa_type} disabled/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Contact Number</div>
            <div className="col-md-6">  
            <input type="tel" id="phone" name="phone"
       pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder="1234567890" disabled 
       className="form-control"
       onChange={e=>handleChange(e)} value={Contact_num}/>   
            </div>
        </div>
       
        <div className="row">
            <div className="col-md-6">Invoice Number</div>
            <div className="col-md-6">
                <select id="invoicenumber" name="invoicenumber" className="form-control" 
                onChange={e=>handleChange(e)} value={invoicenumber}>
                    <option selected>Click to select</option>
                    <option value="Invoice 1" >Invoice 1</option>
                    <option value="Invoice 2">Invoice 2</option>
                   
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Advisor Fee (NZD)</div>
            <div className="col-md-6">
                <input type="text" name="advisorfee" className="form-control"
                onChange={e=>handleChange(e)} value={advisorfee} required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Immigration Fee (NZD)</div>
            <div className="col-md-6">
                <input type="number" name="immigrationfee" className="form-control"
                onChange={e=>handleChange(e)} value={immigrationfee} required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Border Exemption Fee (NZD)</div>
            <div className="col-md-6">
                <input type="number" name="tax" className="form-control"
                onChange={e=>handleChange(e)} value={tax} required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">Total to be paid (NZD)</div>
            <div className="col-md-6">
                <input type="number" name="total" className="form-control"
                onChange={e=>handleChange(e)} value={total} required/>
            </div>
        </div>
       
        <hr/>
        <div className="row">
        <div className="col-md-6 text-center" >
        <input type="reset" name="back" value="Back" className="btn btn-success button2"
            onClick={navigatetoDashboard}/> 
            
        </div>
            <div className="col-md-6 text-center" >
               
            <input type="submit" name="submit" value="Generate" className="btn btn-success button2"
                onClick={navigatetoinvoicepdf}/>

            </div>
            </div>
            </div>
            </div>

    )
}



export default Generateinvoice;