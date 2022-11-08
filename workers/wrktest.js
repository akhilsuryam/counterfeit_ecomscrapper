// ['3', '33', '33', '333', '33', '3333', '333', '333', '3333', '3333', '3333', '3333', '3333', '333', '3', '3', '3', '3', '3', '3']
// const ProductMetaWorker = require("./ProductMetaWorker")
(async () => {
    const ProductDetailsWorker = require("./ProductDetailsWorker")
    // let namesA = await ProductMetaWorker.getkeywordAmazon('A')
    // console.log('namesA',namesA)
    
    // let namesF = await ProductMetaWorker.getkeywordFlipkart('A')
    // console.log('namesF',namesF)

    ProductDetailsWorker.insertDetailsBulk([['122','2222','33333333333', '4444444444444444', '555555555555', '666666666666666', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','23'],['888888888122','28222','3838333333333', '44448444444444444', '5555555558555', '6666666668666666', '887', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','23'],['1622','62222','333366666663333333', '44444444444444644', '555555566655555','6666666', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','23']])

    // ProductMetaWorker.updateFlipkartStatusById('C','3')
  })();
