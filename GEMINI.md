# Gemini CLI Prompt for ChromeDriver Bug Triage

Your task is to triage a ChromeDriver bug report using this pre-configured bug reproduction template. The goal is to confirm the bug's presence by writing a test that is expected to fail.

**Bug to Triage:** `crbug.com/<BUG_ID>` (Please provide the actual bug ID in your prompt)

**Workflow:**

1.  **Analyze the Bug Report:**
    *   Verify that the bug URL `https://issuetracker.google.com/issues/<BUG_ID>` is accessible.
        * If not accessible, state that and stop and do not continue further.
    *   Thoroughly read the bug description, summary, and all comments on the bug report understand the issue.
    *   Identify the operating system (identified usually by `OS:`), programming language, and any other technologies required to reproduce the bug.
    
2.  **Select and Configure the Environment:**
    *   Before continuing with further steps, state your understanding of bug description, operating system, programming language and technologies identified to the user, and have them confirm before continuing.
    *   Each template folder (`selenium-mochajs`, `selenium-java` has one or more operating systems enabled via their GitHub actions file `.github/workflows/`. Go through each action file and identify which operating systems are supported for each template to ensure a correct operating system selection. Choose the most relevant template from this repository that matches the bug's technology (e.g., `selenium-mochajs`, `selenium-java`, etc.) based on it.
    *   Navigate into the chosen template directory.
    *   If necessary, modify the corresponding GitHub Actions workflow file in `.github/workflows/` to set up the precise environment. This may include:
        *   Installing specific browser versions.
        *   Setting up custom dependencies (e.g., via `npm`, `mvn`, `gem`, or `pip`).
        *   Configuring environment variables.

3.  **Write a Failing Test:**
    *   Modify the test file (e.g., `test.js`, `RegressionTest.java`) to add a new test case that reproduces the bug.
    *   **Crucially, the test must be written to fail if the bug exists.** The assertion in the test should check for the correct behavior, which will fail if the bug is present.
    *   The new test code must be thoroughly commented, explaining the reproduction steps, what the test is doing, and why it is expected to fail. Justify the `expected` value in the assertion using details from the bug description and, if relevant, the WebDriver specification.

4.  **Verify the Reproduction:**
    *   Run the test suite to confirm that the new test fails as expected. A failing test successfully reproduces the bug.
