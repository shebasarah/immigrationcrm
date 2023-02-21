import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
const Home=()=>{
    let navigate = useNavigate();
    
    
    const navigatetoclientlogin = () => {
        
        navigate('/login-client');
      };
      const navigatetoadminlogin = () => {
        
        navigate('/login-admin');
      };
      

    return(
        <div style={{
            backgroundColor: 'lightblue',height: '1000px'}}>
        <div className="main-container">
        <div className="row">
    </div>
      <div className="img-container"><img src={process.env.PUBLIC_URL+"slide1.jpg"}/></div>
      <div class="clr"></div>
      <div class="main-box">
    <div class="content_resize">
      <div class="mainbar">
        <div class="article">
          <h2><span>About</span> Immigration CRM</h2>
          <div class="clr"></div>
          <p><strong>Immigration CRM is a customer relationship Management software to help develop a more efficient relationship between the immigration advisor and the client.</strong></p>
          <p>This software is curated to meet all the needs of an immigration advisor making both ethe client and the advisor to share the documents efficiently and easy management of various agreement files. It also helps the client to trcak their application status and upload their documents in an efficient manner and reduce the number of unnecessary communication between them.</p>
        </div>

      </div>
      <div class="sidebar">
  
        <div class="clr"></div>
        <div class="gadget">
          <h2 class="star"><span>Client Login</span></h2>
          <div class="clr"></div>
          <p><strong>Clients can login to their account set up by the advisor to upload all their required documents and download the aggreement form uploaded by the advisor.</strong></p>
          <p>Clients can login to their account set up by the advisor to upload all their required documents and download the aggreement form uploaded by the advisor. Clients can also download their invoices and receipts from this platform and track theri application status.</p>
          <button name="login1" className="btn btn-outline-primary" onClick={navigatetoclientlogin}>Login Here</button> 
        </div>
        <div class="clr"></div>
        <div class="gadget">
          <h2 class="star"><span>Admin Login</span></h2>
          <div class="clr"></div>
          <p><strong>This application helps an admnistrator to keep track of the client details from a single platform.</strong></p>
          <p>Advisor can upload documents like aggreement forms, invoices and reciepts specific for each client and download the documents uploaded by the client with respect to their visa requirements.</p>
         
          <button name="login2" className="btn btn-outline-primary" onClick={navigatetoadminlogin}>Login Here</button> 
        </div>
      </div>
      <div class="clr"></div>
    </div>
  </div>
    </div>
    </div>
   
    )
}

export default Home;