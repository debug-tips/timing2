import { expect } from 'chai';
import { extractMetrics } from '../src/extractMetrics';
import * as puppeteer from 'puppeteer';

describe('get metrics', () => {
  let browser: puppeteer.Browser;

  before(async () => {
    browser = await puppeteer.launch({
      headless: true,
    });
  });

  after(async () => {
    await browser.close();
    browser = null;
  });

  it('should work', async () => {
    const page = await browser.newPage();
    await page.goto('http://www.taobao.com');

    const timing = await page.evaluate(() => {
      return JSON.stringify({
        timing: window.performance.getEntries(),
        timeOrigin: window.performance.timeOrigin,
      });
    });

    const result = JSON.parse(timing);
    const time = extractMetrics(result.timing as PerformanceEntry[], result.timeOrigin, { type: 'page' });
    expect(time).not.to.be.empty;
  });
})
