const util = require('util');
const mysql = require('mysql');

const pool = require("../database/database")
let TABLE = "product_details" 
class ProductDetailsWorker {
    
    static async getProductUrl(platform_id) {
        try {
            const query = `select name from ${TABLE} where platform_id = ? limit 3;` ;
            
            const result = await pool.query(query,[platform_id]);

            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }
  
    static async updateProductData(STATEID,mResult) {
        let result;
        try {
            
            if(STATEID > 0){
                let stringmembers = JSON.stringify(mResult.members)
                let stringfunds = JSON.stringify(mResult.funds)
                //console.log("funds",stringfunds);
                
                 //const query = `UPDATE ngodetails SET uniqueid = ?, memberdetails =? , achievments = ?,contact=?, regcompany = ?,regtype=?, regno = ?,regupload=?, pancard=?, actname = ?,regcity=?, regstate=?,regdate=? ,keyissue = ?,operationstate =?,operationdistrict =? ,contactaddress =? ,contactcity =? ,contactstate =? ,contacttelephone =? ,contactmobileno =? ,contactwebsite =? ,contactemail =?  where stateid = ?;`  

                 const query = `UPDATE ngodetails SET  
                 company_id = ?, 
                 
                 achievments = ?,
                 contact=?,
                 regcompany = ?,
                 regtype=?,
                 regno = ?,
                 regupload=?,
                 pancard=?,
                 actname = ?,
                 regcity=?,
                 regstate=?,
                 regdate=?,
                 keyissue = ?,
                 operationstate =?,
                 operationdistrict =?,
                 fundinginfo = ?,  
                 contactaddress =?,
                 contactcity =?,
                 contactstate =?,
                 contacttelephone =?,
                 contactmobileno =?,
                 contactwebsite =?,
                 contactemail =?
                 where stateid =?
                 
                 

                 ;`

                 result = await pool.query(query,[
                    mResult.uniquengoid,
                    stringmembers,
                    mResult.acheivements,
                    mResult.contactdetails.phoneno,
                    mResult.registration_details.companyRegisteredWith,
                    mResult.registration_details.ngotype,
                    mResult.registration_details.registrationno,
                    mResult.registration_details.registrationupload,
                    mResult.registration_details.pancard,
                    mResult.registration_details.actname,
                    mResult.registration_details.city,
                    mResult.registration_details.state,
                    mResult.registration_details.date,
                    mResult.issues.k_issues,
                    mResult.issues.state_iss,
                    mResult.issues.district_issue,
                    mResult.contactdetails.address,
                    mResult.contactdetails.city,
                    mResult.contactdetails.state,
                    mResult.contactdetails.phoneno,
                    mResult.contactdetails.mobileno,
                    mResult.contactdetails.website,
                    mResult.contactdetails.email,
                    stringfunds,
                    STATEID

                ])
                 
                 //result = await pool.query(query,[mResult.uniquengoid, stringmembers, mResult.acheivements ,mResult.contactdetails.phoneno ,mResult.registration_details.companyRegisteredWith ,mResult.registration_details.companyRegisteredWith ,mResult.registration_details.ngotype ,mResult.issues.k_issues ,mResult.registration_details.registrationno ,mResult.registration_details.registrationupload ,mResult.registration_details.pancard ,mResult.registration_details.actname ,mResult.registration_details.city ,mResult.registration_details.state ,mResult.registration_details.date,mResult.issues.k_issues,mResult.issues.state_iss,mResult.issues.district_issue,mResult.contactdetails.address,mResult.contactdetails.city,mResult.contactdetails.state,mResult.contactdetails.phoneno,mResult.contactdetails.mobileno,mResult.contactdetails.website,mResult.contactdetails.email,STATEID]);
                
                // const query = `UPDATE ngodetails SET status='C', uniqueid = ?, memberdetails =? , achievments = ? where stateid =?;`
                //result = await pool.query(query,[mResult.uniquengoid, stringmembers, mResult.acheivements,  STATEID])

                
              
            }
                     
        } catch (error) {
            console.log(error.stack);
            
        }
        return result; 
  
    }




}

module.exports = ProductDetailsWorker