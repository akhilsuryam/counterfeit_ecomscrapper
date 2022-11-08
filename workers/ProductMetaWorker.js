const util = require('util');
const mysql = require('mysql');

const pool = require("../database/database")
let TABLE = "product_meta" 
class ProductMetaWorker {
    
    static async getkeywordAmazon(status) {
        try {
            const query = `select name from ${TABLE} where crawl_status_amazon = ? limit 3;` ;
            
            const result = await pool.query(query,[status]);

            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }
    static async getkeywordFlipkart(status) {
        try {
            const query = `select name from ${TABLE} where crawl_status_flipkart = ? limit 3;`;
            
            const result = await pool.query(query,[status]);

            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }
    static async updateAmazonStatusById(status,id) { // amazon 
        try {
            let query = `update ${TABLE} set crawl_status_amazon = ? where id =? limit 3`;
            console.log('query ',query[status, id])
            const result = await pool.query(query,[status, id]);
            //console.log('result ',result)
           // console.log(result[0].stateid);
            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }
    static async updateFlipkartStatusById(status,id) { // flipkart
        try {
            let query = `update ${TABLE} set crawl_status_flipkart = ? where id =? limit 3`;
            console.log('query ',query[status, id])
            const result = await pool.query(query,[status, id]);
            //console.log('result ',result)
           // console.log(result[0].stateid);
            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }





}

module.exports = ProductMetaWorker