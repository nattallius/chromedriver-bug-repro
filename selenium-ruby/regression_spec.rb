# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

require 'selenium-webdriver'
require 'rspec'

RSpec.describe 'ChromeDriver Network Conditions Regression' do
  it 'should be able to navigate after deleting network conditions' do
    options = Selenium::WebDriver::Options.chrome
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    # By default, the test uses the latest stable Chrome version.
    # Replace the "stable" with the specific browser version if needed,
    # e.g. 'canary', '115' or '144.0.7534.0' for example.
    options.browser_version = 'stable'
    service = Selenium::WebDriver::Service.chrome(args: ['--verbose', '--log-path=chromedriver.log'])
    driver = Selenium::WebDriver.for :chrome, options: options, service: service

    begin
      # Navigate to a URL
      driver.navigate.to 'https://www.google.com'

      # Assert that the navigation was successful
      expect(driver.title).to eq('Google')
    ensure
      driver.quit
    end
  end
end
