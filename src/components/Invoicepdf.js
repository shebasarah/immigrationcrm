import {Document,Page,Text,View,StyleSheet,PDFViewer} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
const current=new Date();
const date=`${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: "black",
    margin:10,
    border:"all"
  },
  section: {
    margin: 20,
    padding: 10,
  },

  viewer: {
    width: window.innerWidth / 1.130,
    height: window.innerHeight / 1,
  },
  heading:{
    fontSize:25,textAlign:"center",fontWeight:"bold"
    
  }
});

// Create Document Component
function Invoicepdf() {
    const location=useLocation();
    //console.log(location.state.first_name); 
  return (
    <div> 
     
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
        <View style={styles.heading}>
            <Text style={{ fontFamily: 'Times-Bold' }}>INVOICE</Text>
            
          </View>
          
          <hr/>
          <View style={styles.section}>
          <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>PAYEE </Text>
            <Text style={{fontFamily: 'Times-Bold' }}>Jeslyn George E </Text>
            <Text>NZ Licensed Immigration Advisor</Text>
            <Text>Licence Number: 12334567</Text>
            <Text>Phone: 1232361567</Text>
            <Text>Email: invoices@immigrationcrm </Text>
            <Text>--------------------------------------------------------------------------------------</Text>
           <Text style={{fontFamily:'Times-Bold',fontSize:10   }}>PAYMENT DETAILS </Text>
            <Text>Bank Name: ABC Bank</Text>
            <Text>Bank Address: ABC Bank,XYZ</Text>
            <Text>Bank Account Name: ImmigrationCRM</Text>
            <Text>Bank Account Number: 58658658659754</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            
            <Text style={{fontFamily: 'Times-Bold',fontSize:10    }}>PAYER </Text>
            <Text style={{fontFamily: 'Times-Bold' }}>Name:{location.state.first_name} {location.state.middle_name} {location.state.surname} </Text>
            <Text>ID: {location.state.ID}</Text>
            <Text>Email: {location.state.email}</Text>
            <Text>Phone: {location.state.phone}</Text>
            <Text>Visa Type: {location.state.visatype}</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>INVOICE DETAILS </Text>
            <Text>Invoice name:{location.state.invoicenumber}</Text>
            <Text>Invoice number:645378ADG</Text>
            <Text>Invoice date: {date}</Text>
            <Text>Due date: Within 7 days of the invoice date</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            
            <Text>Advisor Fee (NZD): {location.state.advisorfee}</Text>
            <Text>Government Immigration Fee (NZD): {location.state.immigrationfee}</Text>
            <Text>Government Border Exemption Fee (NZD): {location.state.tax}</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <Text style={{fontFamily: 'Times-Bold' }}>Total amount to be paid (NZD): {location.state.total}</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>SIGNATURE </Text>
          </View>
         
         
        </Page>
      </Document>
    </PDFViewer>
    </div>
  );
}
export default Invoicepdf;
