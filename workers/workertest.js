// const ProductMetaWorker = require("./ProductMetaWorker")
(async () => {
    const ProductMetaWorker = require("./ProductMetaWorker")
    let namesA = await ProductMetaWorker.getkeywordA()
    console.log('namesA',namesA)
    
    let namesF = await ProductMetaWorker.getkeywordF()
    console.log('namesF',namesF)

    keyAmazonupdateC(1)
  })();
