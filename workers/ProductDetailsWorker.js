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
    
    static async updateProductStatusByIds(status,ids){
        try {
            const query = `UPDATE ${TABLE} SET status= ? WHERE id IN ('${ids}');`;
            const result = await pool.query(query,[status]);
            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        }
    }


    static async updateReviewStatusByIds(status,ids){ // O to C
        try {
            const query = `UPDATE ${TABLE} SET review_status= ? WHERE id IN ('${ids}');`;
            const result = await pool.query(query,[status]);
            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        }
    }
    static async bulkupdateStatusByIds(status,ids){ // bulk A to O
        try {
            const query = `UPDATE ${TABLE} SET status= ? WHERE id IN (${ids});`; //  IN (${ids})= '1,3,4
            const result = await pool.query(query,[status]);
            return result;
        }catch{
            console.log(error.stack);
            throw error;
        }
    }
    static async bulkupdateReviewStatusByIds(status,ids){ // bulk A to O
        try {
            const query = `UPDATE ${TABLE} SET review_status= ? WHERE id IN (${ids});`; //  IN (${ids})= '1,3,4
            const result = await pool.query(query,[status]);
            return result;
        }catch{
            console.log(error.stack);
            throw error;
        }
    }





}

module.exports = ProductDetailsWorker