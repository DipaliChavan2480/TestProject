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
        await page.click("a[href*='/open-interest']")
        await new Promise(r => setTimeout(r, 6000));

        //save target of original page to know that this was the opener:     
        const pageTarget = page.target();
        console.log("pageTarget", pageTarget)

        //check that the first page opened this new page:
        const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
        //get the new page object:
        const newPage = await newTarget.page();

        // await newPage.click("xpath=//span[contains(text(),'Multi Strike')]")
        await newPage.waitForSelector("xpath=//div[@id='oiStrike']//*[name()='svg']//*[name()='rect'][10]")
        
        //Get attributes of multiple rect elements
        
       // get the amount of divs on the page
        const divCount = await page.$$eval("xpath=//div[@id='oiStrike']//*[name()='svg']//*[name()='rect']", divs => divs.length);
        console.log("divCount", divCount)

// // get the text content of all the `.options` elements:
const links = await page.$$eval("xpath=//link[@rel='preconnect']", links => { return links.map(link => link.href) })
const selectOptions = await page.$$eval("xpath=//div[@id='oiStrike']//*[name()='svg']//*[name()='rect'][1]", options => { return options.map(rect => rect.value) })
console.log("links", links, typeof(links), links.length)
// const selectOptions = await page.$$eval('.bd-example > select.custom-select.custom-select-lg.mb-3 > option', options => { return options.map(option => option.value) })
console.log("selectOptions",selectOptions, typeof(selectOptions), selectOptions.length)




        // await page.$$("xpath=//div[@id='oiStrike']//*[name()='svg']//*[name()='rect']").then((elems) => {
        //     console.log("Type of elements", typeof(elems))
        //   })
        // console.log("Height", typeof(height), height)

        // console.log("height", height)
        await newPage.hover("xpath=//div[@id='oiStrike']//*[name()='svg']//*[name()='rect'][10]")
        // await new Promise(r => setTimeout(r, 6000));
        await newPage.screenshot({
            path: './mouseHover2.png'
        });
        // await newPage.waitForSelector("//div[@class='visx-tooltip']")
        // const text = await newPage.$eval("//div[@class='visx-tooltip']/descendant::span[@class][1]/span[2]", element => element.textContent)
        // console.log("text", text)
        
        
        // await new Promise(r => setTimeout(r, 6000));
        // const elements = await page.$("xpath=//div[@id='oiStrike']//*[name()='svg']//*[name()='rect']")
        // console.log("elements", typeof(elements), elements)
        // for (const el of elements) {
        //     await page.hover(el)
        //     const text = await page.$eval("//div[@class='visx-tooltip']/descendant::span[@class][1]/span[2]", element => element.textContent)
        //     console.log("text")
        //   }
        //*[name()='svg']/*[name()='g' and @class='visx-group visx-columns']/ancestor::div
        

        //div[@id='oiStrike']/descendant::*[name()='svg']/descendant::*[name()='g' and @class='visx-group visx-columns']
        //div[@id='historicalOptionsChain']/descendant::*[name()='svg'] /descendant::*[name()='g' and @class='visx-group visx-columns']
        //div[@id='historicalOptionsChain']/descendant::*[name()='svg']/descendant::rect[@class='visx-bar']

        //div[@id='oiStrike']//*[name()='svg']//*[name()='rect']

        //div[@class='visx-tooltip']/ancestor::span

        //div[@class='visx-tooltip']/descendant::span
        
    })
})
