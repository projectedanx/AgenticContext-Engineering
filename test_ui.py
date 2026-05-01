from playwright.sync_api import sync_playwright

def test_rendering():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3000')
        page.wait_for_selector('text="Symbiotic Collaboration Nexus"', timeout=5000)
        page.screenshot(path='symbiotic_test.png')
        browser.close()

if __name__ == '__main__':
    test_rendering()
