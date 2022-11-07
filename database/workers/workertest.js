const workertest = require("./EcomWorker")
let companies=await workertest.getpage()
console.log(companies)