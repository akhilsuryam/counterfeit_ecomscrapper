const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');


class ProductMeta{

        static getproductdataA = async ()=> {
            let [page,browser] = await Helper.createpage();
            page =await Helper.openurl(page,config.SCRAPE.amazon.product_url);
            // page.waitForNavigation()
            console.log("scrape")
            await page.click(config.SCRAPE.amazon.widget);
            await page.waitForSelector(config.SCRAPE.amazon.showmore);
            await page.click(config.SCRAPE.amazon.showmore);
            await page.waitForNavigation;
            let names;
              console.log("before")
              await page.waitForTimeout(5000);
              console.log("after")
            try {
              await page.waitForNavigation;
              console.log("before")
              await page.waitForTimeout(5000);
              console.log("after")
              await page.waitForSelector(config.SCRAPE.amazon.merchantselector)
              names = await Helper.getProductmetaA(page,config);
              console.log("names",names);
           
          } catch (error) {
              
        }
          console.log("scrape2")
          // console.log("names",names);
                   
            // return [page,browser]      
        }
        static getproductdataF = async () => {
          console.log("inside getKeydata function")
          let [page,browser] = await Helper.createpage(); 
          page = await Helper.openurl(page, config.SCRAPE.flipkart.product_urlspec)  // calling openurl
  
          console.log('before wait 5s');
          await page.waitForTimeout(5000)
          console.log('after wait 5s')
  
          console.log("Scrapping data..");
          let product_data = await Helper.getProductmetaF(page, config); // calling function getProductmeta
          console.log("PRODUCT DATA :", product_data)
          // await Helper.getSeller(page, config);
          console.log('before wait 5s');
          await page.waitForTimeout(5000)
          console.log('after wait 5s')
          /* OTHER SELLER DETAILS */
          let seller_data = await Helper.getSellerF(page, config); // calling function
          console.log("done seller_data :", seller_data)
          }
               
      }

 module.exports = ProductMeta

 