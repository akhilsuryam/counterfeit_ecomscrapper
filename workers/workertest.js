// const ProductMetaWorker = require("./ProductMetaWorker")
(async () => {
    const ProductMetaWorker = require("./ProductMetaWorker")
    let namesA = await ProductMetaWorker.getkeywordAmazon('A')
    console.log('namesA',namesA)
    
    let namesF = await ProductMetaWorker.getkeywordFlipkart('A')
    console.log('namesF',namesF)
    // let arr =[1,3,4];
    ProductMetaWorker.bulkupdateStatusByIdsAmazon('O',[]) // [[1],[2],[3]]
    console.log('bulk updated')
    // ProductMetaWorker.updateAmazonStatusById('C','1')
    // ProductMetaWorker.updateFlipkartStatusById('C','2')
  })();
