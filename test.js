const puppeteer = require('puppeteer');

async function crawlAmazonProductDetails(searchQuery) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to Amazon
  await page.goto('https://www.amazon.com/Mother-Daughter-Murder-Night-Nina-Simon/dp/0063315041/?_encoding=UTF8&_ref=dlx_gate_sd_dcl_tlt_1cd80cd5_dt&content-id=amzn1.sym.2ed7d12d-4886-42ac-ae8f-d4dd936eb1e6&ref_=pd_gw_unk');

  // Enter the search query and submit the search
  await page.type('#twotabsearchtextbox', searchQuery);
  await page.click('input.nav-input');

  // Wait for search results to load
  await page.waitForSelector('div.s-result-item');

  // Click on the first search result (you can modify this as needed)
  await page.click('div.s-result-item:first-child a');

  // Wait for the product page to load
  await page.waitForSelector('span#productTitle');
  await page.waitForSelector('span#priceblock_ourprice');

  // Extract product details
  const productTitle = await page.$eval('span#productTitle', (element) => element.textContent.trim());
  const productPrice = await page.$eval('span#priceblock_ourprice', (element) => element.textContent.trim());

  // Print the details to the console
  console.log('Product Title:', productTitle);
  console.log('Product Price:', productPrice);

  // Close the browser
  await browser.close();
}

// Usage
crawlAmazonProductDetails('choclate');
