// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.IO;

namespace RegressionTest;

public class Tests
{
    [Test]
    public void ShouldBeAbleToNavigateAfterDeletingNetworkConditions()
    {
        var options = new ChromeOptions();
        options.AddArgument("--headless");
        options.AddArgument("--no-sandbox");
        // By default, the test uses the latest stable Chrome version.
        // Replace the "stable" with the specific browser version if needed,
        // e.g. 'canary', '115' or '144.0.7534.0' for example.
        options.BrowserVersion = "stable";

        var service = ChromeDriverService.CreateDefaultService();
        service.LogPath = "d:\\chromedriver.log";
        service.EnableVerboseLogging = true;

        IWebDriver driver = new ChromeDriver(service, options);

        try
        {
            driver.Navigate().GoToUrl("https://www.google.com");
            Assert.That(driver.Title, Is.EqualTo("Google"));
        }
        finally
        {
            driver.Quit();
        }
    }
}
