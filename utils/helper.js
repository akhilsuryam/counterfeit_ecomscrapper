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
            await page.waitForNavigation()
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
      
                  console.log('IMG',imagelink)
                  console.log('r',reviewscore)
                  
                  detjson = {
                    price:pricejson,
                    ogprice:ogprice,
                    imagelink:imagelink,
                    reviewscore:reviewscore,
                    reviewnos:rnos,
                    productname:productnamejson,
                    prod_link:"product link",
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

    static getFormatedDate = () => {
        let todayDate = new Date().toISOString().slice(0, 10);
        let yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        let lastIso = yesterday.toISOString().slice(0, 10);

        let today = todayDate.replace(/-/g, '/');
        let yestday = lastIso.replace(/-/g, '/');
        return {
            today: today,
            yesterday: yestday
        };
    }

    static getFormatedDate2 = () => {
        let todayDate = new Date().toISOString().slice(0, 10);
        let yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        let lastIso = yesterday.toISOString().slice(0, 10);

        let today = todayDate.replace(/-/g, '');
        let yestday = lastIso.replace(/-/g, '');
        return {
            today: today,
            yesterday: yestday
        };
    }

    static getDate = (date) => {
        date = date.replace('T', " ")
        if (date.includes("CEST")) {
            date = date.replace("CEST", "")
        }
        if (date.includes("Z")) {
            date = date.replace("Z", "")
        }
        if (date.includes("+")) {
            date = date.split("+")[0]
        }
        return date;
    }

    static getUrlCategory = (url) => {
        let split = url.split('/')
        
        if(url.includes('elperiodico.com')){
            //return `/${split[4]}/`
            return split[4].replace(/-/g, ' ')
        }else{
        
            //return `/${split[3]}/`
            return split[3].replace(/-/g, ' ')
        }
    
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

    static async getData(page, url, config) {

        let configData = config;
        let data = await page.evaluate((configData, url) => {

            let title;
            let subTitle;
            let author;
            let pubDate;
            let body;
            let img;
            let currurl;
            let category;
            let pubId;

            try {
                title = document.querySelector(configData.headline).content;
            } catch (e) {
                console.log("Title not found")
            }

            try {
                subTitle = document.querySelector(configData.subtitle).content;
            } catch (e) {
                console.log("SubTitle not found")
            }
            
            try {
                if (configData.domain == 'www.lavozdegalicia.es' || configData.domain == 'www.lavanguardia.com' || configData.domain == 'www.mundodeportivo.com') {
                    author = document.querySelector(configData.author).innerText;
                } else {
                    author = document.querySelector(configData.author).content;
                }
            } catch (e) {
                console.log("author not found");
            }

            try {
                pubDate = document.querySelector(configData.pubDate).content;
                let date = pubDate.replace('T', " ")
                if (date.includes("CEST")) {
                    date = date.replace("CEST", "")
                }
                if (date.includes("Z")) {
                    date = date.replace("Z", "")
                }
                if (date.includes("+")) {
                    date = date.split("+")[0]
                }
                pubDate = date;
            } catch (e) {
                console.log("PubDate not found")
            }

            try {
                body = document.querySelector(configData.body).outerHTML;
            } catch (e) {
                console.log("body not found")
            }

            try {
                img = document.querySelector(configData.img).content;
            } catch (e) {
                console.log("img not found")
            }

            try {
                currurl = url;
            } catch (e) {
                console.log("Url not found")
            }

            try {
                category = document.querySelector(configData.category).content;
            } catch (e) {
                console.log("Category not found")
            }
            console.log('Brfore premium check')
            if (configData.domain == 'www.lavozdegalicia.es') {
                let premium = window.find(configData.premium);
                console.log(premium)
                if (premium === false) {
                    pubId = configData.digitalPublicationId
                } else {
                    pubId = configData.paywallPublicationId;
                }
            }else if (configData.domain == 'www.mundodeportivo.com') {
                console.log('Inside  premium check mundodeportivo.com')
                let premium = document.querySelector(configData.premium).content;
                console.log(premium)
                if (premium === 'locked') {          
                    pubId = configData.paywallPublicationId;
                } else {
                    pubId = configData.digitalPublicationId;
                }
            }else if (configData.domain == 'www.lavanguardia.com') {
                console.log('Inside  premium check for lavanguardia.com')
                let premium = document.querySelector(configData.premium).content;
                console.log(premium)
                if (premium === 'locked' && url.includes('.lavanguardia.com/encatala/')) {     
                    //pubId = 7614;     
                    pubId = configData.paywallPublicationId[1];
                }else if (premium === 'locked' && !url.includes('.lavanguardia.com/encatala/')) {     
                    //pubId = 7611;     
                    pubId = configData.paywallPublicationId[0];
                } else {
                    if(url.includes('.lavanguardia.com/encatala/')){
                        //7615
                        pubId = configData.digitalPublicationId[1];
                    }else{
                        //7610
                        pubId = configData.digitalPublicationId[0];
                    }
                    
                }
            }
             else {
                let premium = document.querySelector(configData.premium)
                if (premium === null) {
                    pubId = configData.digitalPublicationId
                } else {
                    pubId = configData.paywallPublicationId;
                }
            }

            let obj = {
                title: title,
                pubId: pubId,
                category: category,
                url: currurl,
                subtitle: subTitle,
                author: author,
                pubDate: pubDate,
                body: body,
                image: img,
            }

            return obj;
        }, configData, url)
        return data
    }

    static async verifyLogin(page, config) {

        let configData = config
        console.log('verify login: ',config.domain )
        if (config.domain == "www.lavozdegalicia.es") {
            const found = await page.evaluate(() => window.find("Mi cuenta"));
            if (found) {
                console.log("User Already logged in")
                return true;
            } else {
                console.log("User not logged In on https://www.lavozdegalicia.es/");
                console.log("Attempting to login to user account..")
                try {
                    //let url = configData.loginUrl;
                    // await page.screenshot({
                    //     path : "./screenshot.jpg",
                    //     fullPage : true
                    // });
                    try{
                        let data = await page.evaluate((configData) => {
                            let flag = document.querySelector(configData.loginUrl).click();
                           
                        }, configData)
                    }catch(e){
                        
                    }
                    await page.waitForTimeout(3000);
                    // await page.screenshot({
                    //     path : "./screenshot0.jpg",
                    //     fullPage : true
                    // });
                    await page.type('input[name=email]', configData.login.email, { delay: 10 });
                    // await page.screenshot({
                    //     path : "./screenshot1.jpg",
                    //     fullPage : true
                    // });
                    await page.type('input[name=password]', configData.login.password, { delay: 10 });
                    // await page.screenshot({
                    //     path : "./screenshot2.jpg",
                    //     fullPage : true
                    // });
                    await page.keyboard.press("Enter");

                    console.log("Login Success");
                    await page.waitForTimeout(5000);
                    // await page.screenshot({
                    //     path : "./screenshot3.jpg",
                    //     fullPage : true
                    // });
                    /*
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    */
                    return true;
                } catch (e) {
                    console.log("Login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }
        if (config.domain == "www.farodevigo.es") {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag);
                if (flag != null || flag != undefined) {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            if (data) {
                console.log("User Already logged in")
                return true;
            } else {
                try {
                    console.log("User not logged In On https://micuenta.farodevigo.es/tp/login");
                    console.log("Attempting to login to user account..")
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
                    
                    
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    console.log("login success");
                    await page.waitForTimeout(5000);
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    */
                 
                    
                    return true;
                } catch (e) {
                    console.log("login failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }        

        if (config.domain == "www.sport.es") {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag).textContent;
                if (flag =='JH') {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            
            console.log('flag: ',data);
            
            if (data) {
                console.log("User Already logged in")
                return true;
            } else {
                try {
                    console.log("User not logged In On ");
                    console.log("Attempting to login to user account..")
                    let url = configData.loginUrl;
                    try{
                        let data = await page.evaluate((configData) => {
                            let flag = document.querySelector(configData.loginUrl).click();
                           
                        }, configData)
                    }catch(e){
                        
                    }
                 
              
                    await page.waitForTimeout(5000);    
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");    
                    return true;
                } catch (e) {
                    console.log("login failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
            
        }
        if (config.domain == "www.elperiodico.com") {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag;
                try{
                    flag = document.querySelector(configData.loginFlag).textContent;
                }catch(e){

                }
                
                if (flag =='Juan Antonio') {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            
            console.log('flag: ',data);
            
            if (data) {
                console.log("User Already logged in")
                return true;
            } else {
                try {
                    console.log("User not logged In On ");
                    console.log("Attempting to login to user account..")
                  
                    
                    
                    
                    try{
                        console.log('before click')
                        let data = await page.evaluate((configData) => {
                            let flag = document.querySelector(configData.loginUrl).click();          
                           
                        }, configData)
                    }catch(err){
                        console.log('e: ',err)
                    }  
                    console.log('after click') 
                 
                    await page.waitForTimeout(5000);    
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
               
                    
                    
               
                    
                    
                    return true;
                } catch (e) {
                    console.log("login failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
            
        }     

        if (config.domain == "www.lne.es") {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag);
                console.log('Flag: ',flag)
                if (flag != null || flag != undefined) {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            if (data) {
                console.log("User Already logged in");
                return true;
            } else {
                console.log("User not logged In on https://micuenta.lne.es/tp/login");
                console.log("Attempting to login to user account..")
                try {
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(3000);
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    */
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(3000);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot4.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);                   
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot5.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot6.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot7.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    */
                /*
                    await page.waitForTimeout(3000);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);

                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.keyboard.down('Tab');
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    
                    await page.keyboard.press("Enter");
                    */
                    //await page.waitForNavigation(10000);
                    // await page.goto(currentUrl, {
                    //     waitUntil: 'networkidle2',
                    // })
                    console.log("Login Success");
                    await page.waitForTimeout(5000);
                    return true;
                } catch (e) {
                    console.log("login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }
                    
        if (config.domain == "www.laprovincia.es") {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag);
                console.log('Flag: ',flag)
                if (flag != null || flag != undefined) {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            if (data) {
                console.log("User Already logged in");
                return true;
            } else {
                console.log("User not logged In");
                console.log("Attempting to login to user account..")
                try {
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    console.log("login success");
                    await page.waitForTimeout(5000);
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    */
                    /*
                    await page.waitForTimeout(3000);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.keyboard.down('Tab');
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.keyboard.press("Enter");
                    console.log("Login Success");
                    await page.waitForTimeout(5000);
                    */
                    return true;
                } catch (e) {
                    console.log("login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }
        if (config.domain == "www.diaridegirona.cat") {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag);
                console.log('Flag: ',flag)
                if (flag != null || flag != undefined) {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            if (data) {
                console.log("User Already logged in");
                return true;
            } else {
                console.log("User not logged In");
                console.log("Attempting to login to user account..")
                try {
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    console.log("login success");
                    await page.waitForTimeout(5000);
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    */
                    /*
                    await page.waitForTimeout(3000);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);

                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.keyboard.down('Tab');
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.keyboard.press("Enter");
                    console.log("Login Success");
                    await page.waitForTimeout(5000);
                    */
                    return true;
                } catch (e) {
                    console.log("login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }    
        if (config.domain == "www.levante-emv.com" || config.domain == "www.informacion.es" || config.domain == "www.diariocordoba.com" || config.domain == "www.diariodeibiza.es" || config.domain == "www.diariodemallorca.es" || config.domain == "www.elperiodicodearagon.com" || config.domain == "www.elperiodicoextremadura.com" || config.domain == "lacronicadebadajoz.elperiodicoextremadura.com" || config.domain == "www.laopiniondemalaga.es" || config.domain == "www.elperiodicomediterraneo.com" || config.domain == "www.regio7.cat" || config.domain == "www.superdeporte.es" ) {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag);
                console.log('Flag: ',flag)
                if (flag != null || flag != undefined) {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            if (data) {
                console.log("User Already logged in");
                return true;
            } else {
                console.log("User not logged In on");
                console.log("Attempting to login to user account..")
                try {
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    console.log("login success");
                    await page.waitForTimeout(5000);
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    */
                    /*
                    await page.waitForTimeout(3000);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.keyboard.down('Tab');
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.keyboard.press("Enter");
                    console.log("Login Success");
                    await page.waitForTimeout(5000);
                    */
                    return true;
                } catch (e) {
                    console.log("login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }    
        //5 tab
        if (config.domain == "www.laopiniondemurcia.es" ) {
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag);
                console.log('Flag: ',flag)
                if (flag != null || flag != undefined) {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            if (data) {
                console.log("User Already logged in");
                return true;
            } else {
                console.log("User not logged In");
                console.log("Attempting to login to user account..")
                try {
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    console.log("login success");
                    await page.waitForTimeout(5000);
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    */
                    /*
                    await page.waitForTimeout(3000);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);   
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);                    
                  

                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.keyboard.down('Tab');
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.keyboard.press("Enter");
                    console.log("Login Success");
                    await page.waitForTimeout(5000);
                    */
                    return true;
                } catch (e) {
                    console.log("login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }
        //6 Tab
        if (config.domain == "www.laopiniondezamora.es" || config.domain == "www.laopinioncoruna.es" ) {
            console.log('***********6')
            await page.waitForSelector(configData.loginWaitFor);
            let data = await page.evaluate((configData) => {
                let flag = document.querySelector(configData.loginFlag);
                console.log('Flag: ',flag)
                if (flag != null || flag != undefined) {
                    return true;
                } else {
                    return false;
                }
            }, configData)
            if (data) {
                console.log("User Already logged in");
                return true;
            } else {
                console.log("User not logged In");
                console.log("Attempting to login to user account..")
                try {
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    console.log("login success");
                    /*
                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.screenshot({
                        path : "./screenshot1.jpg",
                        fullPage : true
                    });
                    await page.waitForTimeout(500);
                    await page.keyboard.press("Enter");
                    await page.screenshot({
                        path : "./screenshot2.jpg",
                        fullPage : true
                    });
                    console.log("login success");
                    await page.waitForTimeout(5000);
                    await page.screenshot({
                        path : "./screenshot3.jpg",
                        fullPage : true
                    });
                    */
                    /*
                    await page.waitForTimeout(3000);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);   
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);   
                    await page.keyboard.down('Tab')
                    await page.waitForTimeout(500);   

                    await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.keyboard.down('Tab');
                    await page.waitForTimeout(500);
                    await page.keyboard.type(configData.login.password, { delay: 10 });
                    await page.keyboard.press("Enter");
                    console.log("Login Success");
                    await page.waitForTimeout(5000);
                    */
                    return true;
                } catch (e) {
                    console.log("login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
        }
        if (config.domain == "www.lavanguardia.com" || config.domain == "www.mundodeportivo.com") {
           try{
            await page.waitForSelector(configData.loginWaitFor);
           }catch(e){
            console.log("loginWaitFor error: ",e)
           }
            
            let data = await page.evaluate((configData) => {
                let flag;
                try{
                    flag = document.querySelector(configData.loginFlag);
                }catch(e){
                    console.log("loginFlag error: ",e)
                }
                
                if (flag ===null) {
                    return false;
                } else {
                    return true;
                }
            }, configData)
            
            console.log('flag: ',data);
            
            if (data) {
                console.log("User Already logged in")
                return true;
            }else {
                console.log("User not logged In on");
                console.log("Attempting to login to user account..")
                try {
                    let url = configData.loginUrl;
                    try{
                        await page.goto(url, {
                            waitUntil: 'networkidle2',
                        });
                    }catch(e){
                        
                    }
                    //await page.screenshot({path: 'example1.png'});
                    //await page.keyboard.type(configData.login.email, { delay: 10 });
                    await page.type('input[name=email_address]', configData.login.email, { delay: 10 });
                    await page.waitForTimeout(2000);
                    //password
                    //await page.screenshot({path: 'example2.png'});
                    await page.keyboard.down('Enter')
                    //await page.keyboard.type(configData.login.password, { delay: 10 });
                    //await page.type('input[name=password]', configData.login.password, { delay: 10 });
                    await page.waitForTimeout(3000);
                    await page.type('input[name=password]', configData.login.password, { delay: 10 });
                    //await page.screenshot({path: 'example3.png'});
                    await page.waitForTimeout(1000);
                    await page.keyboard.press("Enter");
                    await page.waitForTimeout(5000);
                    //await page.screenshot({path: 'example4.png'});
                    console.log("login success");

                    return true;
                } catch (e) {
                    console.log("login Failed")
                    console.log("Error in Login");
                    console.log("MAINTAIN LOGIN :", e);
                    return false;
                }
            }
            
        }       
    }
}







module.exports = Helper;