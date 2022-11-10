const util = require('util');
const mysql = require('mysql');

const pool = require("../database/database")
let TABLE = "product_details" 
class ReviewWorker {
    
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
     

    static async insertReviewBulk(mainArr) {
        let result
        try {
            if(mainArr.length > 0){

                const query = 'INSERT IGNORE INTO `review` (`id`, `product_details_id`, `url`, `review_title`, `review_desc`, `user`, `star`, `date`, `is_verified`)VALUES ?;'

                
                result = await pool.query(query,[mainArr]);
                
            }
            
        } catch (error) {
            console.log('error',error.stack);
            
        }
        return result;
    }
    






}

module.exports = ReviewWorker