from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    print("Navigating to local server...")
    page.goto("http://localhost:3000")

    # Wait for the app to load
    page.wait_for_selector("text=Agentic Context Engineering Workbench")

    print("Clicking SYMBIONT PRIME preset...")
    page.click("text=[ LOAD SYMBIONT PRIME ]")

    print("Clicking EDITORS tab...")
    page.click("text=[ EDITORS ]")

    print("Taking screenshot...")
    page.screenshot(path="symbiont_prime_test.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
