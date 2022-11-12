const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const Thread = require('./utils/Thread');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');
const PlatformWorker =  require('./workers/PlatformWorker');
const ProductMetaWorker =  require('./workers/ProductMetaWorker');
const ProductDetailsWorker = require('./workers/ProductDetailsWorker');



class SearchKeywordF{
       
    static run = async () => {
      let runcount = 0;
      let flag = true;
      let keywords;
      let platform_id = await PlatformWorker.getPlatformId('flipkart'); // get platform_id
      console.log('platform_id', platform_id)
      while (flag) {
        runcount++;
        console.log('runcount:', runcount)
        
        try {
          keywords = await ProductMetaWorker.getkeywordsFlipkart('A');  // get keywords
          console.log("keywords:",keywords)
          if (keywords.length == 0) {
            console.log('sleeping for 1 minutes')
            Thread.sleep(60000);          
          } else {
            await this.main(platform_id,keywords); // call main
          } 
        }catch (error) {
          console.log(error.stack);
          throw error;
        }
        flag = false; // temp
      
    }
  }

    static main = async (platform_id,keywords) => {
      let key = keywords.map(({name})=>(name));
      let id = keywords.map(({id})=>(id));
      console.log("key:",key)
      console.log("id",id)

      await ProductMetaWorker.bulkupdateStatusByIdsFlipkart('O',id) // updated A to O
      // initiallizes browser
      let [page,browser] = await Helper.createpage(); 
      page = await Helper.openurl(page, config.SCRAPE.flipkart.Url)  // calling openurl
          
      console.log('before wait 5s');
      await page.waitForTimeout(5000)
      console.log('after wait 5s')
        
      console.log("before login popup")   
      await page.click(config.SCRAPE.flipkart.loginCross);
      await page.waitForTimeout(2000);
      console.log("after login popup")


      for(let i=0; i< key.length; i++){
        await this.getSearchResult(page,id[i],key[i])


    }
  }

  static getSearchResult = async (page,id,keyword) => {
    console.log("inside getSearchResult function");

    // call typeKey
    page = await Helper.typeKey(page, config.SCRAPE.flipkart, keyword);          
    
    // Get Result data
    console.log("Scrapping data..") 
    let bulkInsertArr=[]; // key data
    [bulkInsertArr,imgarr] = await Helper.getKeySearch(page,config);
    
    console.log("final array lenght:" + bulkInsertArr.length)  //added

    await ProductDetailsWorker.insertDetailsBulk(bulkInsertArr)

    await ProductDetailsWorker.updateProductStatusByIds('C',id)
    // cross function
    
  }

  
  
  
}

module.exports = SearchKeywordF;
