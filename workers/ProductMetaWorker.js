const pool = require("../database/database")

const product_meta = 'product_meta'
class ProductMetaWorker { 
    static async getkeyA() {
        try {
            const query = `select name from ${product_meta} ;`;
            
            //console.log('query ',query)
            const result =await pool.query(query);
            //console.log('result ',result)
           // console.log(result[0].stateid);
            return result;
        } catch (error) {
            console.log(error.stack);
            throw error;
        } 
    }

}


module.exports = ProductMetaWorker; 