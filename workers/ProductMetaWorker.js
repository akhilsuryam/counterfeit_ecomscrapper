const pool = require("../database/database")
let TABLE = "product_meta" 
class ProductMetaWorker {
    
    static async getkeywordA() {
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