const pool = require("../database.js")

const company = 'company'
class EcomWorker { 
    static async getpage() {
        try {
            const query = `select name from ${company} ;`;
            
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


module.exports = EcomWorker; 