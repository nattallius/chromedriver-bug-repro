/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { Builder, Key } = require('selenium-webdriver');
const { expect } = require('expect');
const chrome = require('selenium-webdriver/chrome');

describe('Selenium ChromeDriver', function () {
  let driver;
  // The chrome and chromedriver installation can take some time. 
  // Give 5 minutes to install everything.
  this.timeout(5 * 60 * 1000);

  beforeEach(async function () {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');

    // By default, the test uses the latest stable Chrome version.
    // Replace the "stable" with the specific browser version if needed,
    // e.g. 'canary', '115' or '144.0.7534.0' for example.
    options.setBrowserVersion('stable');

    if (process.env.CHROME_BINARY_PATH) {
      options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
    }

    const service = new chrome.ServiceBuilder()
      .loggingTo('chromedriver.log')
      .enableVerboseLogging();

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  /**
   * This test is intended to verify the setup is correct.
   */
  it('should be able to navigate to google.com', async function () {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).toBe('Google');
  });

  it('testSendKeysToElementDoesNotAppend', async function () {
    // This test reproduces https://b.corp.google.com/issues/42323662.
    // It is expected to fail.
    await driver.get('data:text/html,<input>');
    const input = await driver.findElement({tagName: 'input'});
    await input.sendKeys('Hello World');
    // Select 'World'
    await driver.actions()
      .click(input)
      .sendKeys(
        ...Array(5).fill(Key.ARROW_LEFT),
        Key.SHIFT,
        ...Array(5).fill(Key.ARROW_RIGHT),
        Key.NULL,
      )
      .sendKeys('Universe')
      .perform();
    // The selected text should be replaced with the new text,
    // not appended.
    // This assertion is expected to fail because the current behavior
    // appends the text 'Universe' instead of replacing 'World'.
    expect(await input.getAttribute('value')).toBe('Hello Universe');
  });
});
