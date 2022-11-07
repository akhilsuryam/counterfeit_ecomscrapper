const util = require('util');
const mysql = require('mysql');

const pool = require("../database/database")
let TABLE = "product_meta" 
class ProductMetaWorker {
    
    static async getkeywordA() {
        try {
            const query = `select name from ${TABLE} where crawl_status_amazon = 'A' ;` ;
            
            const result = await pool.query(query);

            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }
    static async getkeywordF() {
        try {
            const query = `select name from ${TABLE} where crawl_status_flipkart = 'A' ;`;
            
            const result = await pool.query(query);

            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }
    static async keyAupdateO(id) { // amazon // flipkart pending 
        try {
            let query = `update ${TABLE} set crawl_status_amazon = 'O' where id in(${id})`;
            console.log('query ',query)
            const result = await pool.query(query);
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