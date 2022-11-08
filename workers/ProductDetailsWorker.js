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
              
                 const query = `UPDATE ngodetails SET  
                 company_id = ?, 
                 id int AI PK 
                 product_id int 
                 url varchar(700) 
                 status varchar(3) 
                 title varchar(100) 
                 description longtext 
                 selling_price int 
                 mrp int 
                 overall_rating int 
                 overall_reveiw int 
                 5_star_rating int 
                 4_star_rating int 
                 3_star_rating int 
                 2_star_rating int 
                 1_star_rating int 
                 5_star_review int 
                 4_star_review int 
                 3_star_review int 
                 2_star_review int 
                 1_star_review int  
                 assurance int 
                 review_link varchar(100) 
                 platform_id int
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


    

    static async insertDetailsBulk(mainArr) {
        let result
        try {
            if(mainArr.length > 0){

                const query = 'INSERT IGNORE INTO `product_details` ( `id`, `product_id`, `url`, `status`, `title`, `description`, `selling_price`, `mrp`, `overall_rating`, `overall_reveiw`, `5_star_rating`, `4_star_rating`, `3_star_rating`, `2_star_rating`, `1_star_rating`, `5_star_review`, `4_star_review`, `3_star_review`, `2_star_review`, `1_star_review`, `assurance`, `review_link`, `platform_id`)VALUES ?;'

                
                result = await pool.query(query,[mainArr]);
                
            }
            
        } catch (error) {
            console.log('error',error.stack);
            
        }
        return result;
    }




}

module.exports = ProductDetailsWorker