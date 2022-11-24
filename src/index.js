const puppeteer = require('puppeteer-core')

const url = process.argv[2];
const imagePath = process.argv[3];
const limit = 3;
const selector = "app-report-chart";

const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
    // Browser options
    const launchOptions = {
        headless: true, 
        //executablePath: '/usr/bin/chromium', // Linux
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows
        args: ['--start-maximized'],
        ignoreHTTPSErrors: true
    };

    // Init pageObjects
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({width: 1024, height: 1024});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    
    // Go to URL
    await page.goto(url);

    // Loop
    let count = 1;
    let found = false;

    do {
        /*
        * Find selector (argv3) in the DOM HTML.
        *   if found the selector = screenshot (timeout 30 sec).
        *       then: Save screenshot.
        *       then: Finish script.
        *   if NOT found 
        *       Try again
        *   if error
        *       Try again
        * */
        try {
            await delay(5000);
            await page.waitForSelector(selector);
            const element = await page.$(selector);
            if (element) {
                await element.screenshot({
                    path: `${imagePath}`
                });
                found = true;
            }
        } catch(e) {
            console.log("element not found");
            found = false;
        }
        count++;
    } while (!found && count < limit);

    // close browser
    await browser.close();

    // close app
    process.exit(1);
};

main();