// ['3', '33', '33', '333', '33', '3333', '333', '333', '3333', '3333', '3333', '3333', '3333', '333', '3', '3', '3', '3', '3', '3']
// const ProductMetaWorker = require("./ProductMetaWorker")
const Helper = require('../utils/helper');
(async () => {
    const ProductDetailsWorker = require("./ProductDetailsWorker")
    
    // ProductDetailsWorker.insertDetailsBulk([['122','2222','33333333333', '4444444444444444', '555555555555', '666666666666666', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','23'],['888888888122','28222','3838333333333', '44448444444444444', '5555555558555', '6666666668666666', '887', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','23'],['1622','62222','333366666663333333', '44444444444444644', '555555566655555','6666666', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22','23']])
    // ProductDetailsWorker.updateReviewStatusByIds('A',4)
    
    // let arr =[1,2,3];
    // let para = Helper.stringConcat(arr)
    // console.log('para',para)
    let review_link = await ProductDetailsWorker.getReviewUrls('A', 1);
    console.log('review_links', review_link)
    
    // let prod_id =[1,2];
    // let para = Helper.stringConcat(prod_id)
    // console.log('para',para)
    
    // let updatearr= ['345','333', '22', '34', '44', '3', '2', '1', '6', '3','1'] 
    // ProductDetailsWorker.updateDetailsBulk(updatearr)
    // console.log('done')
  })();
