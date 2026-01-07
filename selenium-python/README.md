# Template for Selenium and Python

This repository serves as a boilerplate for reproducing ChromeDriver regressions
across platforms using Selenium WebDriver and Pytest.

The included GitHub Actions will automatically run the tests on every push and
pull request, on the following platforms:
 * [Ubuntu](.github/workflows/ubuntu-selenium-python.yml)

## Your Goal

To use this template, extend the test case in `test.py` with steps that
demonstrate the issue you are investigating. Your aim should be to create
a reproducible, minimal test case.

## Overview

The test script (`test.py`) performs the following actions:

1.  **Environment Setup**: Automatically downloads a specific version of Chrome
    (Stable by default) and the matching ChromeDriver binary into a local `.cache`
    directory using `selenium-manager`.
2.  **WebDriver Initialization**: Configures Selenium to use the downloaded binaries
    explicitly, ensuring version compatibility.
3.  **Test Execution**:
    - The sample test navigates to `https://www.google.com`. You can modify this
      test to add your specific reproduction steps.

## For local testing

- Have the appropriate version of Python installed.
- Install the necessary dependencies:
  ```bash
  pip install -r requirements.txt
  ```
- To run the tests with the default configuration (latest Chrome Stable):
  ```bash
  pytest test.py
  ```

## Customizing the Test

Open `test.py` and modify the provided test block to include the steps required to
reproduce your specific issue.

```python
def test_issue_reproduction(driver):
    # Add test reproducing the issue here.
    driver.get('https://example.com')
    # ... assertions and interactions
```

## Automating Triage with Gemini CLI

The Gemini CLI can be used to automate the bug triaging process using the template
defined in GEMINI.md.

### Prerequisits

For Google internal users, consult internal documentation for exact MCP servers
required to access issue reports.

### Execution

Run gemini cli and prompt
```
Triage chromedriver bug <BUG_ID>
```
