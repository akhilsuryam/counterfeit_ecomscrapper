const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');



class ReviewScrapper{

static getreviewdata=async ()=>{
    let [page,browser] = await Helper.createpage();
    page =await Helper.openurl(page,config.SCRAPE.amazon.review_url)
    console.log("scrape")

    await page.click(config.SCRAPE.amazon.button)
    console.log('Wait for 5s..')
    await page.waitForTimeout(5000)
    console.log('done wait for 5s..')
    let reviews;
    let nextpage;
   
    try {
    console.log('Before evaluate')
    do{
      try {
        await page.waitForTimeout(5000)
      } catch (error) {
      console.log('er',error);                  
      }
      // await page.waitForNavigation();
    [reviews,nextpage] = await Helper.getReviewGenA(page,config)
  console.log("revdet",reviews);
  // nextpage = document.getElementsByClassName('a-last');
  console.log(nextpage)
  await page.waitForTimeout(10000)
  // page.waitForSelector('#cm_cr-pagination_bar > ul > li.a-last > a')
  
    if (nextpage == false) {
      break
    }else{
      await page.click('#cm_cr-pagination_bar > ul > li.a-last > a')
    }
  }while ( nextpage ==true);
} catch (error) {
      console.log(error)
}
  console.log("scrape2")
  // console.log(names);
           
    // return [page,browser]      
    }   
}

module.exports = ReviewScrapper;