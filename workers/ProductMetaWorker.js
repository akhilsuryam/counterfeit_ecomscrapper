const util = require('util');
const mysql = require('mysql');

const pool = require("../database/database")
let TABLE = "product_meta" 
class ProductMetaWorker {
    
    static async getpage() {
        try {
            const query = `select name from ${TABLE} ;`;
            
            const result = await pool.query(query);

            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }



}

module.exports = ProductMetaWorker