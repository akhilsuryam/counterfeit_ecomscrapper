const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');
const PlatformWorker =  require('./workers/PlatformWorker');
const ProductMetaWorker =  require('./workers/ProductMetaWorker');




class SearchKeywordA{
    static  getSearchResult = async (platform,keyword) => {
      let [page,browser] = await Helper.createpage();
                // await page.goto(config.SCRAPE.amazon.URL);
                page =await Helper.openurl(page,config.SCRAPE.amazon.Url);
                try {
                  await page.type(config.SCRAPE.amazon.searchbar,String(keyword),{delay: 1000});  
                } catch (error) {
                  
                }
                console.log('Before wait')
                await page.waitForTimeout (5000);
                console.log('after wait')
                try {
                  await page.click(config.SCRAPE.amazon.searchBtn)  
                } catch (error) {
                  console.log("error in clicking search button",error);
                }
                try {
                    await page.waitForNavigation         
                } catch (error) {
                    console.log("nav error")
                }

                let itr=0;
                let itrLimit =3;
                let itrFlag = true;
                let ogprice
                while(itrFlag){
                  try {
                    await page.waitForTimeout(5000);
                    console.log('####################################')
                    console.log('Page No: ',itr)
                    console.log('####################################')
                    let productinfo = await Helper.getmetaDataA(page,config)
                    console.log('productinfo: ',productinfo);

                    itr++;
                    if(itr==itrLimit){
                      itrFlag=false;
                      console.log("changing to false",itrFlag);
                    }else{
                      try{
                        console.log("nextpage");
                        await page.click(config.SCRAPE.amazon.nextbtn);
                        
                      }catch(e){
                        console.log('Error in next click');
                        itrFlag=false;
                      }
                    }
                    
                    
                    
                  } catch (error) {
                    console.log(error);
                  }

                }
        }
    
  
    static run = async () => {
      let platform_id = await PlatformWorker.getPlatformId('amazon');
      let keywords = await ProductMetaWorker.getkeywordsAmazon('A');
      console.log("keywords:",keywords)
      // console.log("id:",Object.values(keywords[0]))
      let key = keywords.map(({id,name})=>(name));
      let id = keywords.map(({id,name})=>(id));
      console.log(id)
      await ProductMetaWorker.bulkupdateStatusByIdsAmazon('O',id)
      let keyidarr = []
      for(let i=0; i< key.length; i++){
        // let key = key[i].name
        console.log("key:",key)
        // let id = keywords[i].id
        // keyidarr.push(id)
        await this.getSearchResult(platform_id,key[i])
      }
      // await ProductMetaWorker.bulkupdateStatusByIdsAmazon(O,keyidarr)
      
    }//main file create and run willl call it 
    
  }




module.exports = SearchKeywordA;
