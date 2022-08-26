import React from "react";
import axios from "axios";


  // THIS IS GOING TO RUN THE MOMENT THE APP LOADS 
    const handleRequestClientData = async ()=> { 
      const  {REACT_APP_USERNAME, REACT_APP_PASSWORD} = process.env
      console.log("process.env", process.env)

      // POST /AdminUsers/Login endpoint to retrieve an authorization token for ADMIN API 
      let adminAccess;
      let authToken;
      let leadInquiryReports;
      try {
        const envVariables = {
          Username: REACT_APP_USERNAME,
          Password: REACT_APP_PASSWORD
        }
        console.log('envVariables', envVariables)
        adminAccess = await axios.post('https://adminapi.doctorgenius.com/prod/AdminUsers/Login',envVariables)
       if(adminAccess){
          const config = {
            headers: { Authorization: `Bearer ${adminAccess.data}` }
          };
          // TODO: BODYPARAMETERS WILL BE ARRAY OF OBJECTS TO ITERATE OVER MULTIPLE EMAILS
          const bodyParameters = {
          Username: "kwdentalcare@gmail.com"
          };
          // POST /AdminUsers/Impersonate endpoint to retrieve an authorization token for PORTAL API
          authToken = await axios.post('https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate',bodyParameters,config);
          console.log('authToken made : ', authToken)
       }
       // GET /LeadInquiryReports endpoint to retrieve all Lead Inquiry Reports for a specific account
       if(authToken){
        console.log('leadInquiryReports is here: ',authToken)
        const leadInquiryReportsToken = {
          headers: { Authorization: `Bearer ${authToken.data}` }
        };
        leadInquiryReports = await axios.get('https://portalapi.doctorgenius.com/prod/LeadInquiryReports' , leadInquiryReportsToken)
        .then(res => {console.log('res :',res);})
        .catch((error) => {
          console.log(error)
        });
      }
      }
      catch (err) {
        console.log('error: ', err);
      }
  
    }

  handleRequestClientData();

return (
    <div className="App">
      <h2>IM ACCOUNT DATA</h2>
      {tableRows.map((row) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <p>{row.accountName}</p>
          <p>{row.totalCalls}</p>
          <p>{row.totalWebforms}</p>
          <p>{row.totalNewPatients}</p>
        </div>
      ))}
    </div>
  );
 export default AccountTable; 