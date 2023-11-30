const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('./config')
const click = require('./helper').click
const jsotp = require('jsotp');
// const authenticator = require('./otplib')

 
describe('Trading Test scenario', () => {
    let browser
    let page
 
    const totp = jsotp.TOTP('');
    console.log("totp", totp)
    const otp = totp.now(); 
    console.log("otp", totp.now())

    // before(async function() {
    //     browser = await puppeteer.launch({ headless: false })
    //     page = await browser.newPage()
    //     console.log("baseURL", config.baseUrl)
    // })
 
    // after(async function() {
    //     await browser.close()
    // })

    it.only('Sensibull login', async function() {
        browser = await puppeteer.launch({ prooduct: 'firefox', headless: false })
        page = await browser.newPage()
        await page.goto('https://web.sensibull.com/login')
        await new Promise(r => setTimeout(r, 6000));
        await page.waitForXPath('//span[contains(text(), "Zerodha")]/ancestor::button')
        await new Promise(r => setTimeout(r, 2000));
      

        await page.click('xpath=//span[contains(text(), "Zerodha")]/ancestor::button')
        await new Promise(r => setTimeout(r, 4000));
        await page.type("input[id='userid']", "")
        await page.type("input[type='password']", "")
        await page.click("button[type='submit']")
        await new Promise(r => setTimeout(r, 2000));
        await page.waitForSelector("input[type='number']")

        // const totp = jsotp.TOTP('');
        // console.log("totp", totp)
        // const otp = totp.now(); 
        // console.log("otp", totp.now())

        await page.type("input[type='number']", otp)
        await page.click("button[type='submit']")
        await new Promise(r => setTimeout(r, 2000));
        // await page.click("xpath=//span[contains(text(),'Dismiss')]/ancestor::button")
                                

        //Go to option chain: 
        await page.goto("https://web.sensibull.com/option-chain")
        await new Promise(r => setTimeout(r, 2000));
        await page.click("xpath=//span[contains(text(),'Dismiss')]/ancestor::button")

        // await page.click("xpath=//a[contains(text(), 'Analyse OI')]")
        // await new Promise(r => setTimeout(r, 2000));
  
        await page.click("xpath=//span[contains(text(), 'Analyse')]")
        await new Promise(r => setTimeout(r, 6000));
        await page.click("xpath=//div[contains(text(), 'Option Chain')]/ancestor::a")
        await new Promise(r => setTimeout(r, 6000));
        console.log("config.baseUrl", config.baseUrl)
        if (config.option == 'CALL'){
            console.log("In if CALL", config.strike)
            await page.click("xpath=//span[contains(text(), '19800')]/parent::div/preceding-sibling::div[1]")
        }
        else{
            console.log("In if PUT")
            await page.click("xpath=//span[contains(text(), '19800')]/parent::div/following-sibling::*[2]")
        }
        await new Promise(r => setTimeout(r, 6000));
        await page.click("input[value='SELL']")
        await new Promise(r => setTimeout(r, 6000));
        // const buyPrice = await page.$eval("input[name='price']", element => element.getAttribute("value"))
        // console.log("buyPrice", buyPrice, typeof(buyPrice))

        // await page.click("xpath=//span[contains(text(), 'Add to Virtual')]/parent::button")
        await page.waitForSelector("xpath=//div[@class='action-buttons-wrapper']/button[1]")
        await page.click("xpath=//div[@class='action-buttons-wrapper']/button[1]")
        // await page.click("xpath=//span[contains(text(),'Analyse')]/parent::button")
        // await page.click("xpath=//div[@class='action-buttons-wrapper']/button[1]")
        await new Promise(r => setTimeout(r, 6000));
        await page.click("xpath=//span[contains(text(),'Add / Edit')]/parent::button")
        await new Promise(r => setTimeout(r, 6000));
        await page.click("xpath=//span[contains(text(), '19950')]/parent::td/preceding-sibling::td[1]/descendant::div[7]/button[1]")
        await new Promise(r => setTimeout(r, 6000));
        await page.click("xpath=//span[contains(text(), 'Done')]/parent::*")
        const maxProfit = await page.$eval("div[type='profit'][class*='SummaryItemValue']", element => element.textContent)
        console.log("maxProfit", maxProfit)              
        const price = await page.$("input[name='price']")
       
        //div[contains(text(), 'Option Chain')]/preceding::a[@href="/option-chain"]

        // const secret = '';
        // const token = authenticator.generate(secret);
        // const totp = jsotp.TOTP('');
        // console.log("totp", totp)
        // const otp = totp.now(); // => 432143
        // console.log("otp", otp)



        // zerodha.click()
        // await page.waitForSelector('#root')
        // await page.click("a[href*='linkedin']>b")
        // const url = await page.url()
        // console.log("URL", url)
        // await page.on('dialog', async dialog => {
        // //get type of alert
        // console.log("Type: ", dialog.type());
        // //get alert message
        // console.log("Popup message: ", dialog.message());
        // //accept alert
        // await dialog.accept();
    })
})
