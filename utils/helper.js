const puppeteer = require('puppeteer');
const bConfig = require('../config/browserConfig');
const userAgents = require('../config/userAgents')
const res = require('../config/Res')
class Helper {

    static getResolution = () => {
        let maxlengthres = res.length
        // function randomIntFromInterval(min, max) { return Math.floor(Math.random() * (max - min + 1) + min)}
        let randomresindex = this.randomIntFromInterval(0,maxlengthres);
        let resolution = res[randomresindex]
        return resolution
    }
    
    
    static openurl = async(page,url) => {
        try {
            
            await page.goto(url,{
                waitUntil: 'networkidle2',
            });
            // await page.waitForNavigation()
        } catch (error) {
            console.log(error.message)
        }
        return page
    }



    static getuseragent = () => {
        let maxlengthua = userAgents.length
        let randomuserindex = this.randomIntFromInterval(0,maxlengthua);          
        let UA = userAgents[randomuserindex];
        return UA
    }

    static  createpage = async () =>{
        let LoopCondition = true;
        let executablePath =bConfig.executablePath;
        // let useDataDir = bConfig.useDataDir;
        let browser = await this.getProfiledBrowser(executablePath);
        let userAgent = await this.getuseragent();
        console.log("res",userAgent);
        let res = await this.getResolution();
        console.log("res",res);
        let page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.setViewport(res);
        let tabs = await browser.pages();
            if (tabs.length > 1) {
                tabs[0].close()
            }
        //await page.goto(config.SCRAPE.amazon.URL);
        return [page,browser];
      
      
      }


    static async getProductmetaA(page,config){
        try {
            let names =  await page.evaluate(async (config) =>{
                let productdetails;
                try {
                    productdetails = document.getElementById(config.SCRAPE.amazon.proddetails).innerText;
                    console.log(productdetails)
                      
                } catch (error) {
                  productdetails = document.querySelectorAll('#detailBullets_feature_div')[0].innerText
                  
                 console.log(error);   
                }
                  sellor = [document.getElementById(config.SCRAPE.amazon.bylineInfo).href,
                  document.getElementById(config.SCRAPE.amazon.bylineInfo).innerHTML]
                  console.log(sellor)
                  let sellerarray = []
                  let sellers = document.getElementsByClassName(config.SCRAPE.amazon.merc)
                  console.log('sellers:ss ',sellers)
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
                  revgraph = document.getElementsByClassName(config.SCRAPE.amazon.rate_distribution)
                  console.log(revgraph);
                  let revarray = []
                  for (let index = 0; index < revgraph.length; index++) {
                    revarray.push(document.getElementsByClassName(config.SCRAPE.amazon.rate_distribution)[index].innerText)
                    // console.log(revarray)
                  }
                  
                  console.log(revarray)
                  // page.waitForTimeout(5000);
                  console.log("after")
                 images = document.querySelectorAll(config.SCRAPE.amazon.img_link)
                 let imagearray = [] 
                 for (let index = 0; index < images.length; index++) {
                 imagearray.push(images[index].src);     
                 }  
                 console.log("imgs",imagearray);
                let moresellers = document.querySelectorAll(config.SCRAPE.amazon.moresellers);
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
                  othersellers = document.querySelectorAll(config.SCRAPE.amazon.moresellers)[sellerindex];
                  console.log("seller",othersellers);
                  price = othersellers.getElementsByClassName(config.SCRAPE.amazon.moresellersprice)[0].textContent;
                  console.log("price",price);
                  ratings  = othersellers.querySelectorAll(config.SCRAPE.amazon.moresellersrating)[0].textContent
                  console.log("ratings",ratings);
                  details = othersellers.innerText;
                  shippername = othersellers.querySelectorAll(config.SCRAPE.amazon.moresellersshipper)[0].textContent
                  console.log("det",details);
                  sellerlinklist = othersellers.getElementsByClassName(config.SCRAPE.amazon.moresellerslink);
                  sellerlink = sellerlinklist[sellerlinklist.length-1].href
                  console.log("sl",sellerlink)
                  sellerstar = othersellers.querySelectorAll(config.SCRAPE.amazon.seller_rate)[0].outerHTML
                  sellerstar = sellerstar.replace('<i class="a-icon a-icon-star-mini a-star-mini-','')
                  sellerstar = sellerstar.replace(' aod-seller-rating-count-class"></i>','')
                  sellerstar = sellerstar.replace('-','.')
                  sellerrname = othersellers.querySelectorAll(config.SCRAPE.amazon.moresellersname)[0].textContent
                  console.log("sellerstar",sellerstar)
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
                  
                    mainseller = document.querySelectorAll(config.SCRAPE.amazon.mainseller)[0];
                    shipinfo =mainseller.querySelector(config.SCRAPE.amazon.mainsellershipinfo).textContent;
                    mainsellername =mainseller.querySelector(config.SCRAPE.amazon.seller).textContent;
                    mainsellerlink =mainseller.querySelector(config.SCRAPE.amazon.seller).href;
                    mainrating = mainseller.querySelector(config.SCRAPE.amazon.mainsellerrating).textContent;
                    mainstar = mainseller.querySelector(config.SCRAPE.amazon.seller_rate).outerHTML;
                    console.log("ms",mainstar);
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
                 othersellerarray:othersellerarray,
                 review_link:''
            
                }
            
                // page.goto(reviewlink);
                
                // page.click(button);
                return totalreviews;
                },config)
                // console.log("names",names);
                return names;
        } catch (error) {
            console.log("error in function",error)
            
        }
    }
    static async getmetaDataF(page, config){
        try {
            // let meta_array=[];
            let metadata = await page.evaluate(async (config) => {
                let meta_array=[];
                let detail;
                let index;
                let prod_name;
                let description;
                let mrp;
                let sale_price;
                let assured;
                let img;
                let prod;
                let desc;
                let op;
                let sp;
                let asr;
                let images;
                let href_link;
                let obj;
                
                console.log("details", config.SCRAPE.flipkart.detail[0].parentclass);
                detail = document.getElementsByClassName(config.SCRAPE.flipkart.detail[0].parentclass) // specification
                if (detail.length != 0) { // SPECIFICATION
                    index = 0; 
                    
                } else {        // PRODUCT DET
                    index = 1;
                }
                try{
                    prod_name = document.getElementsByClassName(config.SCRAPE.flipkart.detail[index].prod_name);
                }catch(e){
                    console.log(error)
                }
                try{
                    description = document.getElementsByClassName(config.SCRAPE.flipkart.detail[index].description); 
                }catch(e){
                    console.log(error)
                }
                try{
                    mrp = document.getElementsByClassName(config.SCRAPE.flipkart.detail[index].mrp);
                }catch(e){
                    console.log(error)
                }
                // mrp = document.getElementsByClassName(config.SCRAPE.flipkart.mrp);
                // console.log("sel 1:", config.SCRAPE.flipkart.mrp);
                try {
                    sale_price = document.getElementsByClassName(config.SCRAPE.flipkart.detail[index].sale_price);                    
                } catch (error) {
                    console.log(error)
                }
                
                try {
                    assured = document.querySelectorAll(config.SCRAPE.flipkart.detail[index].assured);        
                } catch (error) {
                    console.log(error)
                }
                
                // assured = document.getElementsByClassName(config.SCRAPE.flipkart.assured);
                try{
                    img = document.getElementsByClassName(config.SCRAPE.flipkart.detail[index].img);
                }catch(error){
                    console.log(error)
                }
                
                console.log(prod_name);
                console.log(description);
                console.log(mrp);
                console.log(sale_price);
                console.log(assured);

                for (let i =0; i < detail.length; i++){
                    try {
                        //obj 1 till 40
                        try {
                            prod = prod_name[i].textContent;
                        } catch (error) {
                            prod = "undefined";
                        }
                        try {
                            desc = description[i].textContent;
                        } catch (error) {
                            desc = "undefined";
                        }                        
                        try {
                            op = mrp[i].textContent;
                        } catch (error) {
                            op = "undefined";
                        }
                        try {
                            sp = sale_price[i].textContent;
                        } catch (error) {
                            sp = "undefined";
                        }
                        
                        try {
                            asr = assured[i].currentSrc;
                            asr = true;
                        } catch (error) {
                            asr = false;
                        }
                        try {
                            images = img[i].src;
                        } catch (error) {
                            images = "undefined";
                        }
                        try {
                            href_link = prod_name[i].href;
                        } catch (error) {
                            href_link = "undefined";
                        }
                        // let asr = assured[i].src
                        
                        
                        // console.log("href :", href_link);
                        obj = {
                            prod_name : prod,
                            description : desc,
                            original_price : op, 
                            sale_price : sp,
                            assurance : asr,
                            images : images,
                            prod_link : href_link // new added
                        }
                        console.log(obj)
                            // console.log("meta array length: ", meta_array.length);
                        meta_array.push(obj)
                        // obj = {}

                        
                    } catch (error) {
                        console.log(error)
                    }
                }
                console.log("meta_array: ",meta_array);
                return meta_array;
            },config)
            console.log("metadata",metadata)
            return metadata;
        } catch (e) {
            console.log(e);
        }

    }//flipkart//dv/

    static async getReviewGenA(page, config){
        let reviews;
        let nextpage;
        try {
            // let meta_array=[];
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
             console.log([reviews,nextpage]);
             return [reviews,nextpage];
        } catch (e) {
            console.log(e);
        }

    }//flipkart//dv/ 


    static async getmetaDataA(page,config){
        try {
            let seltor = config.SCRAPE.amazon.prod_name;
            let productinfo =  await page.evaluate((config,seltor) =>{
                let detarray = []
                let parent = document.getElementsByClassName(config.SCRAPE.amazon.parentclass);
                console.log('parent.length:',parent.length);
                let productnamejson
                for (let scrapeindex = 0; scrapeindex < parent.length; scrapeindex++) {
                  try {
                    productnamejson =  parent[scrapeindex].getElementsByClassName(seltor)[0].textContent; 
                    console.log('p1',productnamejson) 
                  } catch (error) {console.log(error);}
                  try{
                    pricejson =  parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.mrp)[0].textContent;  
                    console.log('price',pricejson);
                  }catch(e){}
                  try{
                    ogprice = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.sale_price)[0].innerText;
                  }catch(e){
                    console.log('eee',e)
                  }
                  
                  try{
                    imagelink = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.Img)[0].srcset;
                    imagelinkarray = imagelink.split(' ')
                    imagelink = imagelinkarray[imagelinkarray.length-2]
                  }catch(e){console.log("error in images",e);}
      
                  let reviewscore
                  try {
                    reviewscore = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.rate_score)[0].innerText;
                  } catch (error) {
                      console.log('rs',reviewscore)
                  }
                  let rnos;
                  try{
                    rnos = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.revnos)[0].innerText
                  }catch(e){
                    console.log("rnos",rnos);
                  }
                  let prod_link
                  try {
                    prod_link = parent[scrapeindex].getElementsByClassName(config.SCRAPE.amazon.prod_link)[0].href
                  } catch (error) {
                    
                  }
      
                  console.log('IMG',imagelink)
                  console.log('r',reviewscore)
                  
                  detjson = {
                    price:pricejson,
                    ogprice:ogprice,
                    imagelink:imagelink,
                    reviewscore:reviewscore,
                    reviewnos:rnos,
                    productname:productnamejson,
                    prod_link:prod_link,
                  }
                  detarray.push(detjson)
                }
                console.log("detarray",detarray)
                return detarray
              },config,seltor)
              console.log('PI',productinfo)
              return productinfo;
        } catch (error) {
            console.log("error",error)
            
        }

    }
      


    static randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }





    static getProfiledBrowser = async (executabePath) => {
       
        // let bres = res[randomresindex];
        let options = {
            headless: bConfig.headless,
            timeout: 15000,
            ignoreHTTPSErrors: true,
            executablePath: executabePath,
            args: [
                "--no-sandbox",
                "--start-maximized",
                "--disable-infobars",
                "--disable-popup-blocking",
                "--disable-dev-shm-usage",
                "--disable-notifications",
                "--remote-debugging-port=9222",
                "--disable-web-security",
                // `--user-data-dir=${userDataDir}`
            ],
            ignoreDefaultArgs: ["--enable-automation"],
            //defaultViewport: null,
            // userAgent: UA


        }
        const browser = await puppeteer.launch(options);

        return browser;
    }

}







module.exports = Helper;