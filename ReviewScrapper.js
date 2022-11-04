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
    [reviews,nextpage] = await page.evaluate( (page,config)=>{
      //let r = await page.$$('review')
      //console.log("r",r);
      //console.log("rlen",r.length);
      try {
        np = document.getElementsByClassName('a-disabled')[0].textContent;  
      } catch (error) {
        np = undefined; 
        
      }

      let reviewarray =[];
      let reviewlist =[];
      console.log('config.SCRAPE.amazon.review: ',config.SCRAPE.amazon.review)
      //reviewlist = document.getElementsByClassName(config.SCRAPE.amazon.review);
      reviewlist = document.getElementsByClassName('review')

      console.log('reviewlist: ',reviewlist);
      console.log('reviewlist.length : ',reviewlist.length);
      console.log('reviewlist[3] : ',reviewlist[3]);
      let reviewtext;
      let reviewdate;
      let reviewtitle;
      let profilename;
      for (let reviewindex = 0; reviewindex < reviewlist.length; reviewindex++) {
        console.log('reviewindex: ',reviewindex)
        reviewcomponent = document.getElementsByClassName(config.SCRAPE.amazon.review_main)[reviewindex];
        console.log(reviewcomponent);
        reviewtext = reviewcomponent.getElementsByClassName(config.SCRAPE.amazon.reviewtext)[0].innerText;
        console.log("reviewtext",reviewtext)
        reviewdate = reviewcomponent.getElementsByClassName(config.SCRAPE.amazon.reviewdate)[0].innerText;
        console.log("reviewdate",reviewdate)
        reviewtitle = reviewcomponent.getElementsByClassName(config.SCRAPE.amazon.reviewtitle)[0].innerText;
        console.log("reviewtitle",reviewtitle)
        profilename = reviewcomponent.getElementsByClassName(config.SCRAPE.amazon.buyer_name)[0].innerText;
        console.log("profilename",profilename)      
        
        let reviewjson = {
          title:reviewtitle,
          text:reviewtext,
          date:reviewdate,
          user:profilename
        }
        console.log(reviewjson)
        reviewarray.push(reviewjson);
      
      }
      
      console.log('testers',np);
      if (np =='Next page→') {
        npl = false
      }else{
        npl =true;
      }
        
      
      
     return [reviewarray,npl];
   },page,config)
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