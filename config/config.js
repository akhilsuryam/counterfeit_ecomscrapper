
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

        


    }
}
module.exports = { SCRAPE }
