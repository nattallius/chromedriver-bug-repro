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

const { Builder } = require('selenium-webdriver');
const { expect } = require('expect');
const chrome = require('selenium-webdriver/chrome');

describe('crbug/342602630: ChromeDriver GET /window/handles returns open DevTools panel as a window handle', function () {
  let driver;
  // Give 5 minutes to install everything.
  this.timeout(5 * 60 * 1000);

  beforeEach(async function () {
    const options = new chrome.Options();
    options.addArguments('--auto-open-devtools-for-tabs');
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');

    options.setBrowserVersion('stable');

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

  it('should reproduce the full bug scenario described in crbug/342602630', async function () {
    // 1. Capture the main window handle
    const mainWindowHandle = await driver.getWindowHandle();
    let allHandles = await driver.getAllWindowHandles();

    // 2. If 2 handles are returned (main window + devtools) this is the first evidence of the bug.
    expect(allHandles.length).toBe(2);

    // 3. Identify the DevTools handle (the one that isn't the main window)
    const devToolsHandle = allHandles.find(handle => handle !== mainWindowHandle);

    // 4. Switch to the DevTools handle
    await driver.switchTo().window(devToolsHandle);

    // 5. Try to maximize devtools window. This is expected to throw "Browser window not found"
    try {
      await driver.manage().window().maximize();
    } catch (error) {
      console.log('Caught expected error:', error.message);
      expect(error.message).toContain('Browser window not found');
    }
  });
});
