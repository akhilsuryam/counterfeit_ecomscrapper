const Helper = require('../utils/helper');
(async () => {
    const ProductDetailsWorker = require("./ProductDetailsWorker")
    
    await ProductDetailsWorker.insertDetailsBulk([['1','2222','33333333333', 'A', '555555555555', '666666666666666', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','1'],['2','28222','3838333333333', 'A', '5555555558555', '6666666668666666', '887', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','1'],['3','62222','333366666663333333', 'A', '555555566655555','6666666', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','1']])
    console.log('inserted')
    let [id,urls] = await ProductDetailsWorker.getProductUrl(1)
    console.log('id', id)
    console.log('urls', urls)
    // ProductMetaWorker.updateFlipkartStatusById('C','3')

    let arr =[1,2,3];
    let para = Helper.stringConcat(arr)
    console.log('para',para)
    ProductDetailsWorker.bulkupdateStatusByIds('O', para) // '1,3,4'
    console.log('bulk updated')
  })();
