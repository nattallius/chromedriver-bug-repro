# Template for Selenium and Java

This repository provides a template for reproducing any ChromeDriver bug.

The included GitHub Actions will automatically run the tests on every push and
pull request, on the following platforms:
 * [Ubuntu](.github/workflows/ubuntu-selenium-java.yml)

## Your Goal

To use this template, extend the test case `ISSUE_REPRODUCTION` in
`src/test/java/RegressionTest.java` with steps that demonstrate the issue you are
investigating. Your aim should be to create a reproducible, minimal test case. Update
the test name accordingly. 

## Overview

The test `src/test/java/RegressionTest.java` performs the following actions:

1.  **Environment Setup**: Automatically downloads a specific version of Chrome
    (Stable by default) and the matching ChromeDriver binary.
2.  **Test Execution**:
    - The sample test navigates to `https://www.google.com`. You can modify this
      test to add your specific reproduction steps.

## For local testing

- Have the appropriate version of Maven installed.
- Install dependencies and run the tests:
    ```bash
    mvn test
    ```

### Running the Tests

1.  Install dependencies and run the tests:
    ```bash
    mvn test
    ```

## Customizing the Test

Open `src/test/java/RegressionTest.java` and modify the provided test block to
include the steps required to reproduce your specific issue. Rename the test
accordingly.

```java
@Test
public void ISSUE_REPRODUCTION() {
  // Add test reproducing the issue here.
  driver.get("https://example.com");
  // ... assertions and interactions
}
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
