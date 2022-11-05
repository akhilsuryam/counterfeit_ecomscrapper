
const SCRAPE = {
    amazon:{
        Url:'https://www.amazon.in',
        product_url:'https://www.amazon.in/Ferrero-78205-Rocher-16-Pieces/dp/B00BYQEIL6/ref=sr_1_5?keywords=ferrero+rocher+chocolates&qid=1666678394&qu=eyJxc2MiOiI0LjM4IiwicXNhIjoiNC4xNiIsInFzcCI6IjMuMzkifQ%3D%3D&sprefix=ferer%2Caps%2C560&sr=8-5',
        review_url:'https://www.amazon.in/product-reviews/B077SZ667X/ref=cm_cr_getr_d_paging_btm_next_2?ie=UTF8&filterByStar=one_star&reviewerType=all_reviews&pageNumber=3#reviews-filter-bar',
        searchbar:'#twotabsearchtextbox',
        searchBtn:'#nav-search-submit-button',
        prod_name:'a-text-normal',
        parentclass:'s-asin',
        sale_price:'a-price-whole',
        mrp:'a-offscreen',
        Img:'s-image',
        nextbtn:".s-pagination-next",
        rate_score:'a-icon-alt',
        prod_link:'a-link-normal',
        revnos:'a-size-base',
        nxtbtn:'.s-pagination-separator',
        producttitle:'productTitle',
        review_main:"review",
        button:"#histogramTable > tbody > tr:nth-child(5)",
        reviewtext:"review-text",
        reviewdate:"review-date",
        reviewtitle:"review-title",
        buyer_name:"a-profile-name",
        widget:".olp-link-widget",
        showmore:"#aod-pinned-offer-show-more-link",
        proddetails:"prodDetails",
        merchantselector:'.mbcMerchantName',
        bylineInfo:'bylineInfo',
        rate_distribution:"a-histogram-row",
        img_link:"#altImages img",
        moresellers:"#aod-offer",
        moresellersprice:"a-offscreen",
        moresellersrating:"#aod-offer-seller-rating",
        moresellersshipper:'#aod-offer-shipsFrom',
        moresellerslink:"a-link-normal",
        moresellersstar:"#aod-offer-seller-rating i ",
        moresellersname:'#aod-offer-soldBy',
        mainseller:"#aod-pinned-offer-additional-content",
        mainsellershipinfo:"#aod-offer-shipsFrom",
        seller:".a-link-normal",
        mainsellerrating:"#aod-offer-seller-rating",
        seller_rate:"#aod-offer-seller-rating i"

        


    },
    flipkart:{
        Url : 'https://www.flipkart.com/',
        test_url : 'https://www.flipkart.com/search?q=shoes&as=on&as-show=on&otracker=AS_Query_TrendingAutoSuggest_1_0_na_na_na&otracker1=AS_Query_TrendingAutoSuggest_1_0_na_na_na&as-pos=1&as-type=HISTORY&suggestionId=shoes&requestId=81d000a7-970a-4a0c-9ac2-798df8fb0668',
        product_url: 'https://www.flipkart.com/wrogn-active-walking-shoes-men/p/itm3b3ad16339608?pid=SHOG2SREFZNMRYYS&lid=LSTSHOG2SREFZNMRYYSHUZDHA&marketplace=FLIPKART&q=shoes&store=osp&srno=s_1_2&otracker=AS_Query_TrendingAutoSuggest_1_0_na_na_na&otracker1=AS_Query_TrendingAutoSuggest_1_0_na_na_na&fm=search-autosuggest&iid=en_loI0ioyI3qHq04EaeBYz8lvK0z%2BSvq%2F5EQApy8znHDzbXpepmNeJ2wxSceEsUnV0gL8an6DnWM6NVSyYRcYlZg%3D%3D&ppt=sp&ppn=sp&qH=b0a8b6f820479900',
        product_urlspec: 'https://www.flipkart.com/cadbury-dairy-milk-silk-fruit-nut-chocolate-bars/p/itmfykkycdgy3p5v?pid=CHCFCMT9SER8RBAV&lid=LSTCHCFCMT9SER8RBAVZUKLVB&marketplace=FLIPKART&q=chocolate&store=eat%2F0pt&srno=s_1_3&otracker=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&fm=search-autosuggest&iid=2e810c9f-3944-4ac8-9a1e-1f5581289f51.CHCFCMT9SER8RBAV.SEARCH&ppt=sp&ppn=sp&ssid=x8xqq736f40000001666685010051&qH=c378985d629e99a4',
        product_urlsel: 'https://www.flipkart.com/cipla-tugain-solution-men-liquid/p/itm6c7fdee343bb3?pid=HSMFK65TBZQ3UFFK&lid=LSTHSMFK65TBZQ3UFFK5CXPCG&marketplace=FLIPKART&q=cipla&store=search.flipkart.com&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=f089f96f-36d9-4a02-ae2d-f3b4c9c8937d.HSMFK65TBZQ3UFFK.SEARCH&ppt=sp&ppn=sp&ssid=kx58fke5jk0000001666767468300&qH=3d464cc1a6da11ad',
        // 'https://www.flipkart.com/wrogn-active-walking-shoes-men/p/itm3b3ad16339608?pid=SHOG2SREFZNMRYYS&lid=LSTSHOG2SREFZNMRYYSHUZDHA&marketplace=FLIPKART&q=shoes&store=osp&srno=s_1_2&otracker=AS_Query_TrendingAutoSuggest_1_0_na_na_na&otracker1=AS_Query_TrendingAutoSuggest_1_0_na_na_na&fm=search-autosuggest&iid=en_loI0ioyI3qHq04EaeBYz8lvK0z%2BSvq%2F5EQApy8znHDzbXpepmNeJ2wxSceEsUnV0gL8an6DnWM6NVSyYRcYlZg%3D%3D&ppt=sp&ppn=sp&qH=b0a8b6f820479900',
        
        review_url: 'https://www.flipkart.com/cadbury-bournville-dark-chocolate-bar-fruit-nut-bars/product-reviews/itmcd163c1170d1f?pid=CHCF9F3WJ4EAEEFB&lid=LSTCHCF9F3WJ4EAEEFBRYKZKR&marketplace=FLIPKART',
        //  'https://www.flipkart.com/wrogn-active-walking-shoes-men/product-reviews/itm3b3ad16339608?pid=SHOG2SREFZNMRYYS&lid=LSTSHOG2SREFZNMRYYSHUZDHA&marketplace=FLIPKART',
        // https://www.flipkart.com/moto-g71-5g-arctic-blue-128-gb/product-reviews/itm725289299f711?pid=MOBG6FWDJKXCTBV4&lid=LSTMOBG6FWDJKXCTBV49C7SLF&marketplace=FLIPKART',
        loginCross: 'body > div._2Sn47c > div > div > button',
        searchBar:  '#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > div > input',
        searchBtn:  '#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > button',
 
        nextbtn : '#container > div > div > div > div > div > div > div > nav > a > span',
        detail : [{
            parentclass : '_4ddWXP',  // specification
            prod_name: 's1Q9rs',
            description: '_3Djpdu',
            mrp : "_3I9_wc",
            sale_price: '_30jeq3',
            assured: '._32g5_j img',
            img : '_396cs4' // _396cs4 _3exPp9
        },
        {
            parentclass : 'X3BRps',  // product _1xHGtK
            prod_name: '_2WkVRV',
            description: 'IRpwTa',
            mrp : '_30jeq3',
            sale_price: '_3I9_wc',
            assured : '._1a8UBa img',
            img : '_2r_T1I',
        }],
        read_more : '_2KpZ6l _1FH0tX', 
        specification : '_14cfVK',
        specif_manucfacturer : '_1JDTUN',
        product_details: 'X3BRps',
        product_manufacturer: '.zTAIgo',
        generic_details:'_3MnBlK',
        manufact_details : '_9DfyEe', //_3_27HS row fyknUX
        detail_info : '_3_27HS',
        manufact_closebtn :'_2KpZ6l _1KAjNd',
        img_link: 'q6DClP',
        rate_score: '_3LWZlK',
        rate_review: '_2_R_DZ',
        seller: '#sellerName > span > span', /* on pg seller details */
        seller_rating: '_3LWZlK _1D-8OL',
        prodrev_img: '_2nMSwX _1yGd2h _2S6HmZ',
        review_link: '#container > div > div._2c7YLP > div > div > div > div > div > a',
        other_sellers: '._1_xoMS', /* other seller details */
        seller_name: '_3enH42', //click:for prod score date
        seller_rate: '_2GCNvL',
        original_prc :'_3I9_wc',
        discount_price: '_30jeq3',
        aboutsell_btn: '._3enH42 span',
        seller_since : 'sauP8h',
        FSSAI_License : '#container > div > div > div > div > div > div > div > div > div:nth-child(2) > span._2hpba3',
        seller_qaulity: '_3yX50N',
        aboutsell_close: '_1KAjNd',
        review_filter: '._1EDlbo',
        negetivefirst_btn: '_1EDlbo', // chnage
        product_star : '_12yO4d',
        total_rev_rate :'_3zoWhv',
        rate_distribution: '_36LmXx',
        review_main: '_2wzgFH', // _2-N8zT
        review_text: '_2-N8zT',
        review_desc : "t-ZTKy", // _6K-7Co',
        review_star: '_3LWZlK', // _3LWZlK start i+1
        buyer_date :'_2sc7ZR', 
        certified_location: '_2mcZGG',
        nextRev_btn : '._1LKTO3',



    } // config done

}
module.exports = { SCRAPE }
