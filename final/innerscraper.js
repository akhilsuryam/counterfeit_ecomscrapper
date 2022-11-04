const puppeteer = require('puppeteer');
const Helper = require('../utils/helper');
const config = require('../config/config');
const bConfig = require('../config/browserConfig');
const res = require('../config/Res');


class innerscraper{

        static getpagedata = async ()=> {
            let [page,browser] = await Helper.createpage();
            let url = 'https://www.amazon.in/Ferrero-78205-Rocher-16-Pieces/dp/B00BYQEIL6/ref=sr_1_5?keywords=ferrero+rocher+chocolates&qid=1666678394&qu=eyJxc2MiOiI0LjM4IiwicXNhIjoiNC4xNiIsInFzcCI6IjMuMzkifQ%3D%3D&sprefix=ferer%2Caps%2C560&sr=8-5'
            page =await Helper.openurl(page,url);
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
              await page.waitForSelector('.mbcMerchantName')
            names =  await page.evaluate(async (config) =>{
            let productdetails;
            try {
                productdetails = document.getElementById(config.SCRAPE.amazon.proddetails).innerText;
                console.log(productdetails)
                  
            } catch (error) {
             console.log(error);   
            }
              // console.log (productdetails)
              sellselector = 'bylineInfo'
              sellor = [document.getElementById("bylineInfo").href,
              document.getElementById("bylineInfo").innerHTML]
              console.log(sellor)
              let sellerarray = []
              let sellers = document.getElementsByClassName(config.SCRAPE.amazon.merc)
              console.log('sellers:ss ',sellers)
              console.log("before")
              // await page.waitForTimeout(5000);
              console.log("after")
          
              //await page.waitForSelector('.mbcMerchantName')
              console.log("after 3")
              console.log('sl',sellers.length);
              let seller;
              for (let index = 0; index < sellers.length; index++) {
                try{
                  console.log('index: ',index)
                  seller = document.getElementsByClassName('mbcMerchantName')[index].textContent
                  console.log(seller);
                  sellerarray.push(seller)
                }catch(e){
                  console.log('Error: ',e)
                }
                
                
              }
        
              console.log('SA',sellerarray)
              console.log("before")
              // page.waitForTimeout(5000);
              console.log("after")
              revgraph = document.getElementsByClassName("a-histogram-row")
              console.log(revgraph);
              let revarray = []
              for (let index = 0; index < revgraph.length; index++) {
                revarray.push(document.getElementsByClassName("a-histogram-row")[index].innerText)
                // console.log(revarray)
              }
              
              console.log(revarray)
              // page.waitForTimeout(5000);
              console.log("after")
        
             images = document.querySelectorAll("#altImages img")
             let imagearray = [] 
             for (let index = 0; index < images.length; index++) {
             imagearray.push(images[index].src);     
             }  
             console.log("imgs",imagearray);
             console.log("before")
            //  page.waitForTimeout(5000);
             console.log("after")
            let moresellers = document.querySelectorAll("#aod-offer");
            // let seller;
            let moresellerlength = moresellers.length;
            console.log(moresellerlength)
            let price;
            let ratings;
            let othersellers;
            // page.waitForTimeout(5000);
            let sellerlinklist;
            let sellerlink;
            let sellerstar;
            let othersellerdetailsjson;
            let othersellerarray=[]
            let shippername
            let sellername
            try{
            for (let sellerindex = 0; sellerindex < moresellerlength; sellerindex++) {
              othersellers = document.querySelectorAll("#aod-offer")[sellerindex];
              console.log(seller);
              price = othersellers.getElementsByClassName("a-offscreen")[0].textContent;
              console.log(price);
              ratings  = othersellers.querySelectorAll("#aod-offer-seller-rating")[0].textContent
              console.log(ratings);
              details = othersellers.innerText;
              shippername = othersellers.querySelectorAll('#aod-offer-shipsFrom')[0].textContent
              console.log("det",details);
              sellerlinklist = othersellers.getElementsByClassName("a-link-normal");
              sellerlink = sellerlinklist[sellerlinklist.length-1].href
              console.log("sl",sellerlink)
              sellerstar = othersellers.querySelectorAll("#aod-offer-seller-rating i ")[0].outerHTML
              sellerrname = othersellers.querySelectorAll('#aod-offer-soldBy')[0].textContent
              console.log(sellerstar)
              othersellerdetailsjson={
                price:price,
                ratings:ratings,
                details:details,
                sellerlink:sellerlink,
                sellerstar:sellerstar,
                shippername:shippername,
                sellername:sellername
              }
              othersellerarray.push(othersellerdetailsjson);
            }}catch(e){
              console.log("error",e)
            }
            let mainrating
            let mainseller
            let mainsellerlink
            let mainstar
            let mainsellername
            let shipinfo
            
            try{
              
                mainseller = document.querySelectorAll("#aod-pinned-offer-additional-content")[0];
                shipinfo =mainseller.querySelector("#aod-offer-shipsFrom").textContent;
                mainsellername =mainseller.querySelector(".a-link-normal").textContent;
                mainsellerlink =mainseller.querySelector(".a-link-normal").href;
                mainrating = mainseller.querySelector("#aod-offer-seller-rating").textContent;
                mainstar = mainseller.querySelector("#aod-offer-seller-rating i").outerHTML;
                console.log(mainstar);
                mainsellerdetailsjson = {
                  shipinfo:shipinfo,
                  mainsellername:mainsellername,
                  mainsellerlink:mainsellerlink,
                  mainrating:mainrating,
                  mainstar:mainstar
                }
                
              }catch(e){
                console.log("error",e)
              }
        
            let  totalreviews={  
             productdetails:productdetails,
             sellers:sellerarray,
             reviews:revarray,
             images:imagearray,
             mainseller:mainsellerdetailsjson,
             othersellerarray:othersellerarray
        
            }
        
            // page.goto(reviewlink);
            
            // page.click(button);
            return totalreviews;
            },config)
            // console.log("names",names);
        } catch (error) {
              
        }
          console.log("scrape2")
          console.log("names",names);
                   
            // return [page,browser]      
            }       
      }


 module.exports = innerscraper

 