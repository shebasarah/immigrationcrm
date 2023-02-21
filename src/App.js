import logo from './logo.svg';

import './App.css';
import Header from './Header';
import Home from './components/Home';
import Login_admin from './components/Login_admin';
import Login_client from './components/Login_client';
import Register_client from './components/Register_client';
import Dashboard_admin from './components/Dashboard_admin';
import Dashboard_client from './components/Dashboard_client';
import Listall from './components/Listall';
import EditClient from './components/EditClient';
import Changepwclient from './components/Changepwclient';
import Changepwadmin from './components/Changepwadmin';
import Listallagr from './components/Listallagr';
import Uploadagrform from './components/Uploadagrform';

import Uploaddocs from './components/Uploaddocs';
import Listallinvoicereceipt from './components/Listallinvoicereceipt';
import Uploadinvoicereceipt from './components/Uploadinvoicereceipt';
import Download from './components/Download';
import TrackApplication from './components/Trackapplication';
import Lists3files from './components/Lists3files';
import Lists3clientfiles from './components/Lists3clientfiles';
import Archive from './components/Archive';
import Generateinvoice from './components/Generateinvoice';
import Generatereceipt from './components/Generatereceipt';
import Invoicepdf from './components/Invoicepdf';
import Receiptpdf from './components/Receiptpdf';
import Agrformpdf from './components/Agrformpdf';
//import './src/aws-exports';


import "bootstrap/dist/css/bootstrap.min.css";


import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Generateagreement from './components/Generateagreement';


function App() {
  
  return (
    
    <main className='container'>
    <Router>
      <div>
      <Routes>
        <Route path="/" element={[<Header/>,<Home/>]}/>
        <Route path="/login-admin" element={[<Header/>,<Login_admin/>]}/>
        <Route path="/login-client" element={[<Header/>,<Login_client/>]}/>
        <Route path="/register-client" element={<Register_client/>}/>
        <Route path="/dashboard-admin" element={<Dashboard_admin/>}/>
        <Route path="/dashboard-client" element={<Dashboard_client/>}/>
        <Route path="/listall" element={<Listall/>}/>
        <Route path="/listallinvoicereceipt" element={<Listallinvoicereceipt/>}/>
        <Route path="/editclient/:id" element={<EditClient/>}/>
        <Route path="/changepwclient" element={<Changepwclient/>}/>
        <Route path="/changepwadmin" element={<Changepwadmin/>}/>
        <Route path="/listallagr" element={<Listallagr/>}/>
        <Route path="/uploadagrform/:id" element={<Uploadagrform/>}/>
        <Route path="/uploaddocs" element={<Uploaddocs/>}/>
        <Route path="/uploadinvoicereceipt/:id" element={<Uploadinvoicereceipt/>}/>
        
        <Route path="/download" element={<Download/>}/>
        <Route path="/trackapplication" element={<TrackApplication/>}/>
        <Route path="/lists3files/:id" element={<Lists3files/>}/>
        <Route path="/lists3clientfiles" element={<Lists3clientfiles/>}/>
        <Route path="/archive" element={<Archive/>}/>
        <Route path="/generateinvoice" element={<Generateinvoice/>}/>
        <Route path="/generatereceipt" element={<Generatereceipt/>}/>
        <Route path="/generateagreement" element={<Generateagreement/>}/>
        <Route path="/invoicepdf" element={<Invoicepdf/>}/>
        <Route path="/receiptpdf" element={<Receiptpdf/>}/>
        <Route path="/agrformpdf" element={<Agrformpdf/>}/>
      </Routes>
      </div>
   
   </Router>
   </main>
  );
}

export default App;
