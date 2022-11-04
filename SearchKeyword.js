const puppeteer = require('puppeteer');
const Helper = require('./utils/helper');
const config = require('./config/config');
const bConfig = require('./config/browserConfig');
const res = require('./config/Res');



class SearchKeyword{
    static  getKeydata = async (keyword) => {
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
                    
                    // let productinfo =  await page.evaluate((config,seltor) =>{
                    //   let detarray = []
                    //   let parent = document.getElementsByClassName(config.SCRAPE.amazon.parentclass);
                    //   console.log('parent.length:',parent.length);
                    //   let productnamejson
                    //   for (let scrapeindex = 0; scrapeindex < parent.length; scrapeindex++) {
                    //     try {
                    //       productnamejson =  parent[scrapeindex].getElementsByClassName(seltor)[0].textContent; 
                    //       console.log('p1',productnamejson) 
                    //     } catch (error) {console.log(error);}
                    //     try{
                    //       pricejson =  parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.mrp)[0].textContent;  
                    //       console.log('price',pricejson);
                    //     }catch(e){}
                    //     try{
                    //       ogprice = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.sale_price)[0].innerText;
                    //     }catch(e){
                    //       console.log('eee',e)
                    //     }
                        
                    //     try{
                    //       imagelink = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.Img)[0].srcset;
                    //       imagelinkarray = imagelink.split(' ')
                    //       imagelink = imagelinkarray[imagelinkarray.length-2]
                    //     }catch(e){console.log("error in images",e);}
            
                    //     let reviewscore
                    //     try {
                    //       reviewscore = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.rate_score)[0].innerText;
                    //     } catch (error) {
                    //         console.log('rs',reviewscore)
                    //     }
                    //     let rnos;
                    //     try{
                    //       rnos = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.revnos)[0].innerText
                    //     }catch(e){
                    //       console.log("rnos",rnos);
                    //     }
            
                    //     console.log('IMG',imagelink)
                    //     console.log('r',reviewscore)
                        
                    //     detjson = {
                    //       price:pricejson,
                    //       ogprice:ogprice,
                    //       imagelink:imagelink,
                    //       reviewscore:reviewscore,
                    //       reviewnos:rnos,
                    //       productname:productnamejson,
                    //       prod_link:"product link",
                    //     }
                    //     detarray.push(detjson)
                    //   }
                    //   console.log("detarray",detarray)
                    //   return detarray
                    // },config,seltor)
                    let productinfo = await Helper.getmetaData(page,config)
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

      }




module.exports = SearchKeyword;
