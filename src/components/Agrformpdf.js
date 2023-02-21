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
    width: window.innerWidth / 1.135,
    height: window.innerHeight / 1,
  },
  heading:{
    fontSize:25,textAlign:"center",fontWeight:"bold"
    
  }
});

// Create Document Component
function Receiptpdf() {
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
            <Text style={{ fontFamily: 'Times-Bold' }}>AGREEMENT FOR MIGRATION SERVICES</Text>
            
          </View>
          
          <hr/>
          <View style={styles.section}>
          <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>ADVISOR DETAILS</Text>
            <Text style={{fontFamily: 'Times-Bold',fontSize:15  }}>Jeslyn George Edacheril </Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>NZ Licensed Immigration Advisor</Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>Licence Number: 202000816</Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>Phone: 1232361567</Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>Email: jeslyngeorge-lia@immigrationcrm.nz </Text>
            <Text>--------------------------------------------------------------------------------------</Text>
           
            <Text style={{fontFamily: 'Times-Bold',fontSize:10    }}>CLIENT DETAILS </Text>
            <Text style={{fontFamily: 'Times-Bold' ,fontSize:15  }}>Name:{location.state.first_name} {location.state.middle_name} {location.state.surname} </Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>ID: {location.state.ID}</Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>Email: {location.state.email}</Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>Phone: {location.state.phone}</Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>Visa Type: {location.state.visatype}</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <Text style={{fontFamily: 'Times-Roman',fontSize:15  }}>It is hereby agreed by and between the parties as follows:</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <Text style={{fontFamily: 'Times-Bold' ,fontSize:10}}>Whereas:</Text>
            <Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>A: ImmigrationCRM Consulting is incorporated in NZ under the Companies Act 2013.
B. ImmigrationCRM Consulting provides an adviser as permitted by law for advice, guidance and assistance with immigration related services under various categories.
C. The client wishes to engage ImmigrationCRM Consulting for the purpose of securing a visa or special appeals under various categories.
D. ImmigrationCRM Consulting agrees to get the client’s instructions subject to the terms and conditions mentioned herein below:
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>It is hereby agreed by and between the parties as follows:</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>“Client”, the Client means the person named above and such other eligible members of the client’s immediate family included in this agreement.</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>“Application”, the Application made to the Immigration New Zealand under various categories including appeals and review of the decisions.</Text>
INTERPRETATIONS:
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>“New Zealand” referred to as NZ</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>“Immigration New Zealand” referred to as INZ</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>“ImmigrationCRM Consulting” referred to as ImmigrationCRM Consulting</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>1.	RESPONSIBLE ADVISERS AND AUTHORITY TO ACT</Text>

The following licensed immigration adviser is responsible for providing You with the immigration advice services set out in this agreement: Mr Jeslyn George Edacheril of ImmigrationCRM Consulting (License number 202000816). 

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>2.	SUPERVISION</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>2.1 	Mr Jeslyn George Edacheril of Olive Consulting is a Licensed Immigration Adviser which allows him to provide immigration advice in relation to all immigration matters. </Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>3.	TERMS:</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
3.1	This agreement is effective from the date of signing by both the parties hereto and shall be in force till the outcome of the application unless terminated earlier pursuant to paragraph 4.2
3.2	This agreement may be terminated:
a.	By either party at any time during its currency by giving 14 days written notice to the other party; or
b.	By ImmigrationCRM Consulting with immediate effect by written notice to the client in the event of breach of any material term(s) of this agreement.
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>4.	CLIENT’S OBLIGATIONS:</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>The client</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
4.1	Agrees to authorize and empower ImmigrationCRM Consulting and its representative Mr Jeslyn George Edacheril ImmigrationCRM Consulting (License number 202000816) to represent the client and act on its behalf in relation to the immigration matter(s) identified in this agreement.
4.2	Shall at all times provide true, accurate and complete information to ImmigrationCRM Consulting.
4.3	Warrants that it has disclosed all material information to ImmigrationCRM Consulting.
4.4	Confirms that it shall submit all original documents requested by ImmigrationCRM Consulting.
4.5	Affirms that the documents, certificates and testimonials submitted to ImmigrationCRM Consulting are true, correct and genuine and are not falsified, forged, duplicated or altered, in any manner.
4.6	Agrees to comply with all the requests, made now or at any time hereafter until the application is processed and a decision is reached, by ImmigrationCRM Consulting or INZ.
4.7	Agrees that the employment was not offered as a result of payment made by the client (or their agent) to the employer (or their agent) in exchange for securing the offer of employment. Such practices are contrary to the principles of ImmigrationCRM Consulting, the Wages Protection Act 1983, as well as to the current immigration instructions.
4.8	Agrees to submit medical report, police clearance certificate, English Language Requirement report like IELTS, PTE, OET etc (if required) and any other information as per INZ requirements.
4.9	Agrees that the onus for providing evidence rests with the client in order to satisfy any concerns raised by INZ directly.
4.10	Agrees that ImmigrationCRM Consulting may take up to 4 weeks to lodge an application to INZ from the time all necessary documents and payments have been submitted.
4.11	Agrees to consult with ImmigrationCRM Consulting prior to contacting INZ directly.
4.12	Authorizes ImmigrationCRM Consulting to refer all relevant details to a debt collection agency if any invoices are not paid after 30 days from the invoice date. All debt collection and legal costs will be borne by the client.
4.13	Agrees to keep ImmigrationCRM Consulting informed at all times of changes or new developments related to the application, if any.
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>5.	IMMIGRATIONCRM CONSULTING’S OBLIGATIONS: </Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
ImmigrationCRM Consulting shall</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
5.1	Protect and promote your interests and act for you free from compromising influences or loyalties.
5.2	Disclose any financial and non-financial interests in goods or services recommended or supplied to you.
5.3	Discuss with you your objectives and how they should best be achieved.
5.4	Provide you with information about the work to be done, who will do it and the way services will be provided.
5.5	Provide you with an adviser as permitted by law to provide immigration advice.
5.6	Protect your privacy and ensure appropriate confidentiality.
5.7	Treat you fairly, respectfully and without discrimination.
5.8	Keep you informed about the work been done and advise you when it is completed.
5.9	Let you know how to make a complaint and deal with any complaint promptly and fairly.
5.10	Encourage you to seek independent legal advice on terms and conditions of this agreement before signing it.
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>6.	PROFESSIONAL FEES:</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
6.1	The professional fees are payable in full at the time an invoice has been raised unless otherwise stated in writing.
6.2	INZ fees are payable in full at the time an invoice has been raised. ImmigrationCRM Consulting is unable to lodge any application to INZ unless INZ fees are received in full.
6.3	ImmigrationCRM Consulting may approve installment payments for the professional fees at discretion and such installment arrangement will be indicated on this agreement at the time of signup.
6.4	The Professional fees stated in this agreement are an estimate and doesn’t include unforeseen additional work that may arise due to potential prejudicial information raised by INZ.
6.5	The professional fees do not include official government fees for the applications, medical examination, police clearance, English Language requirement report fees, photocopying, translation of documents, courier charges, toll calls, fax etc. These have to be borne by the client.
6.6	Any additional fees will be discussed with you at the beginning of the transaction.
6.7	All fees quoted are inclusive of Goods and Service Tax (GST), unless otherwise specified.
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>7.	REFUND:</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
ImmigrationCRM Consulting will refund only the professional fees paid by the client without any deduction, in the event the application is declined due to any reason attributable to ImmigrationCRM Consulting.

The client will not be eligible for refund of professional fees if the application is declined due to non-compliance or any reason attributable to the client.

Without limiting the generality of the foregoing paragraph, the client shall not be eligible for refund of professional fees in the following event:
7.1	The client fails to comply or satisfy any request for additional documents, certificates, testimonials, evidence or clarification and explanation as sought by INZ.
7.2	The client or any eligible member of his family fails to clear health, character or English language requirements.
7.3	Client’s application for work visa fails the labor market check.
7.4	Any documents, certificates or testimonials submitted by the client are found to be misleading, falsified, forged, altered, duplicated or contrary to the current Immigration policies in the opinion of INZ.
7.5	The client becomes ineligible for that application due to retrospective changes in the immigration instructions announced by INZ at any time during the currency of the application but before a decision is finalized by INZ.
7.6	Initial consultation fee is nonrefundable.
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>8.	JURISDICTION:</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>This agreement shall be governed by applicable New Zealand laws and subject to the jurisdiction of courts in New Zealand.</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>9.	DISCLOSURE:</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>ImmigrationCRM Consulting will or may receive commissions, bonuses, etc. from external providers that we may recommend.</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>10.	NOTICES:</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>Notices shall be in writing and shall be served if sent to the following:
ImmigrationCRM Consulting’s postal address
Client’s postal address</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>11.	COMPLAINTS:</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>It is our goal to ensure that we provide you with premium service. If you have any concerns with services provided by Olive Consulting, please take the following steps to make sure the issue is resolved:</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>In an event of a complaint, it shall be in writing to the following:</Text>

<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>Jeslyn George, C/o ImmigrationCRM COnsulting, NZ - 682025</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>Phone: +91 123456788</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>Email: complaints@immigrationcrm.nz</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
Olive Consulting will endeavor to respond in writing to the complaint within 20 working days.  In case you are not satisfied with our response please feel free to contact:
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
The Registrar of Immigration Advisers 
Immigration Advisers Authority 
PO Box 6222, Victoria Street West
Auckland 1142 , NEW ZEALAND
Tel: +64 9 925 3838 (outside NZ); Freephone: 0508 422 422 (NZ only) 
email: info@iaa.govt.nz; www.iaa.govt.nz 
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
12.	NO GUARANTEE OF OUTCOME
We are unable to guarantee the outcome of your application or its validity as this is an immigration matter and in case of changes of INZ policies or your circumstances. We will, however, undertake to use our professional skills for your benefit to the best of our ability at all times. 
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
13.	SERVICES PROVIDED UNDER THIS AGREEMENT
Consultation on: {location.state.visatype}
Documents preparation help
Lodging of the visa application
Post INZ follow-up
</Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
14.	CONFLICT OF INTEREST:
 We are not aware of any conflicts of interest that currently exist. However, in the event that Your relationship breaks down, then this will create a potential conflict of interest and it is likely we will no longer be able to continue to represent you both. If a conflict arises during the course Our services, we will discuss this with You and determine the best way to proceed
 </Text>
<Text style={{fontFamily: 'Times-Roman' ,fontSize:10}}>
15.	CONFIDENTIALITY:
We will treat any personal information You give Us as confidential and keep and maintain such information in accordance with the provisions of the Privacy Act 1993. 
We will not disclose Your personal information without Your prior consent, except in the following circumstances: 
15.1  if making a complaint to the Immigration Advisers Authority relating to another adviser or reporting an alleged offence under the Immigration Advisers Licensing Act 2007; 
15.2  for the administration of the Immigration Advisers Licensing Act 2007;
15.3  as required by law. 

•	Any employees or other persons engaged by Us are also required to preserve Your confidentiality. 
•	Your personal information will be retained for a period of seven years and will be made available to the Immigration Advisers Authority if requested. You have the right to have access to, and have corrected, any of Your personal information held by Us. 



</Text>
<Text style={{fontFamily: 'Times-Bold',fontSize:10    }}>TOTAL FEE IN AGREEMENT </Text>
<Text style={{fontFamily: 'Times-Bold',fontSize:12    }}>Advisor Fee (NZD): {location.state.advisorfee}</Text>
            <Text style={{fontFamily: 'Times-Bold',fontSize:12    }}>INZ Visa application fee and levy (NZD): {location.state.immigrationfee}</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <Text style={{fontFamily: 'Times-Bold' ,fontSize:12}}>Total amount to be paid (NZD): {location.state.total}</Text>
            <Text>--------------------------------------------------------------------------------------</Text>
           
            
             <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>CLIENT SIGNATURE: </Text>
            <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>DATE: </Text>
            <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>ADVISOR SIGNATURE: </Text>
            <Text style={{fontFamily: 'Times-Bold',fontSize:10  }}>DATE: </Text>
          
          </View>
         
         
        </Page>
      </Document>
    </PDFViewer>
    </div>
  );
}
export default Receiptpdf;
