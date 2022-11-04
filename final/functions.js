const puppeteer = require('puppeteer');
const Helper = require('../utils/helper');
const config = require('../config/config');
const bConfig = require('../config/browserConfig');
const res = require('../config/Res');



class searchkeyword{
    static  getdata = async (testinput) => {
        let [page,browser] = await Helper.createpage();
        await page.goto(config.SCRAPE.amazon.URL);
        await page.type(config.SCRAPE.amazon.searchbox,String(testinput),{delay: 1000});
        console.log('Before wait')
        await page.waitForTimeout (5000);
        console.log('after wait')
        await page.click(config.SCRAPE.amazon.searchbutton)
        try {
            await page.waitForNavigation         
        } catch (error) {
            console.log("nav error")
        }
        // await page.waitForNavigation
        // console.log('Before wait')
        // await page.waitForTimeout (5000);
        // console.log('after wait')
        let itr=0;
        let itrLimit =3;
        let itrFlag = true;
        while(itrFlag){
          try {
            await page.waitForTimeout(5000);
            console.log('####################################')
            console.log('Page No: ',itr)
            console.log('####################################')
            let seltor = config.SCRAPE.amazon.productname;
            let names =  await page.evaluate((config,seltor) =>{
              let detarray = []
              let parent = document.getElementsByClassName(config.SCRAPE.amazon.parentproducts);
              console.log('parent.length:',parent.length);
              let productnamejson
              for (let scrapeindex = 0; scrapeindex < parent.length; scrapeindex++) {
                try {
                  productnamejson =  parent[scrapeindex].getElementsByClassName(seltor)[0].textContent; 
                  console.log('p1',productnamejson) 
                } catch (error) {
                console.log(error);
                }
                try{
                  pricejson =  parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.price)[0].textContent;  
                  console.log('price',pricejson);
                }catch(e){
                }
                try{
                  ogprice = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.ogprice)[1].innerText;
                }catch(e){}
                
                try{
                  imagelink = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.Image)[0].srcset;
                  imagelinkarray = imagelink.split(' ')
                  imagelink = imagelinkarray[imagelinkarray.length-2]
                }catch(e){
                    console.log("error in images",e)
    ;            }
    
                let reviewscore
                try {
                  reviewscore = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.revscore)[0].innerText;
                } catch (error) {
                    console.log('rs',reviewscore)
                  // reviewscore = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.revscore)[0].innerText;
                }
                let rnos;
                try{
                  rnos = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.revnos)[0].innerText
                }catch(e){
                  console.log("rnos",rnos);
                }
    
                console.log('IMG',imagelink)
                console.log('r',reviewscore)
                
                detjson = {
                  price:pricejson,
                  orgprice:ogprice,
                  imagelink:imagelink,
                  reviewscore:reviewscore,
                  reviewnos:rnos,
                  productname:productnamejson
                }
                // console.log("detjson",detjson)
                detarray.push(detjson)
                // console.log("detarrays",detarray)
    
                 
              }
              // console.log("detarray",detarray)
              return detarray
            },config,seltor)
            // console.log('names.length: ',names.length);
            // console.log('names: ',names);
            itr++;
            if(itr==itrLimit){
              itrFlag=false;
            }else{
              try{
                await page.click(".s-pagination-next");
                
              }catch(e){
                console.log('Error in next click');
                itrFlag=false;
              }
            }
            
            
            
          } catch (error) {
            console.log(error);
          }
        }
        return [page,browser];
        }

      }



module.exports = searchkeyword;
