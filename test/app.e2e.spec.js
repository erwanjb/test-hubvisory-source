const  puppeteer = require('puppeteer');
require('dotenv').config();

const email = process.env.EMAIL;
const mdp = process.env.PASSWORD;

describe("Connection", () => {
  let page;

  beforeEach(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000', { timeout: 0 })
  })

  it("should contain", async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('HubviMovies');
    await page.type('input[type="email"]', email)
    await page.type('input[type="password"]', mdp)
    await Promise.all([
      page.click('button'),
      page.waitForNavigation({ timeout: 0 })
    ])
    const text2 = await page.evaluate(() => document.body.textContent);
    expect(text2).toContain('points');
  })

  it("should not contain", async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).not.toContain('points');
    await page.type('input[type="email"]', email)
    await page.type('input[type="password"]', mdp)
    await Promise.all([
      page.click('button'),
      page.waitForNavigation({ timeout: 0 })
    ])
    const text2 = await page.evaluate(() => document.body.textContent);
    expect(text2).not.toContain('HubviMovies');

  })

})
