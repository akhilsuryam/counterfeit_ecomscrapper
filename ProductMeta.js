const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');


class ProductMeta{

        static getproductdata = async ()=> {
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
              names = await Helper.getProductmeta(page,config);
              console.log("names",names);
           
          } catch (error) {
              
        }
          console.log("scrape2")
          // console.log("names",names);
                   
            // return [page,browser]      
            }       
      }


 module.exports = ProductMeta

 