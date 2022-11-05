const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');



class SearchKeyword{
    static  getKeydataamazon = async (keyword) => {
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
    
    static getKeydataflipkart = async (keyword) => {
          console.log("inside getKeydata function")
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
              console.log("DATA OF PAGE: "+ page_count +" "+ metadata);
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
      

      }




module.exports = SearchKeyword;
