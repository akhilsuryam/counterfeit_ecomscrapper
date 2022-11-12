const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');
const PlatformWorker =  require('./workers/PlatformWorker');
const ProductMetaWorker =  require('./workers/ProductMetaWorker');




class SearchKeywordF{
    static getKeydataflipkart = async (platform,keyword) => {
          console.log("inside getKeydataflipkart function")
          let [page,browser] = await Helper.createpage(); 
          page = await Helper.openurl(page, config.SCRAPE.flipkart.Url)  // calling openurl
          console.log('before wait 5s');
          await page.waitForTimeout(5000)
          console.log('after wait 5s')
          console.log("before login popup")   
          await page.click(config.SCRAPE.flipkart.loginCross);
          await page.waitForTimeout(2000);
          console.log("after login popup")    
          await page.type(config.SCRAPE.flipkart.searchBar, keyword , {delay: 100});  
          try {
              await page.click(config.SCRAPE.flipkart.searchBtn) 
              await page.waitForTimeout(2000);
          } catch (error) {
              console.log(error)
          }       
          
          // Get Result data
          console.log("Scrapping data..")
          let flag = true;
          let page_count = 0;
          let metadata;
          let data_array=[];
          while (flag) {
              page_count++;
              console.log("PAGE NUMBER:", page_count);
              metadata = await Helper.getmetaDataF(page, config);
              console.log("DATA OF PAGE:",page_count,metadata);
              data_array.push(metadata);
              console.log("==========================");
              
              if(page_count > 1){
                  flag = false;
              }
              else{
                  console.log("next page..");
                  console.log(config.SCRAPE.flipkart.nextbtn);            
                  
                  try {   
                      await page.click(config.SCRAPE.flipkart.nextbtn);
                      console.log('Before wait')
                      await page.waitForTimeout(8000)
                      console.log('After wait')
                      
                  } catch (error) {
                      console.log(error);
                  }
  
              }          
          }
          console.log("final array lenght:" + data_array.length)  //added
      }
    
    static run = async () => {
      let platform_id = await PlatformWorker.getPlatformId('flipkart');
      let keywords = await ProductMetaWorker.getkeywordsFlipkart('A');
      console.log("keywords:",keywords)
      // console.log("id:",Object.values(keywords[0]))
      let key = keywords.map(({name})=>(name));
      let id = keywords.map(({id})=>(id));
      console.log("key:",key)
      console.log("id",id)
      await ProductMetaWorker.bulkupdateStatusByIdsAmazon('O',id)
      for(let i=0; i< key.length; i++){
        await this.getKeydataflipkart(platform_id,key[i]) 
      }
      
      
    }      

  }




module.exports = SearchKeywordF;
