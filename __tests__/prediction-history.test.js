const assert = require("assert");
const { Builder, By, until } = require("selenium-webdriver");

describe("Prediction History Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000);
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should display prediction history table", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/predict-history");

    await driver.wait(
      until.elementLocated(By.css(".dashboard-card table")),
      30000
    );

    const table = await driver.findElement(By.css(".dashboard-card table"));
    const isTableDisplayed = await table.isDisplayed();
    assert.strictEqual(isTableDisplayed, true);
  });

  it("should fetch prediction history from the server", async function () {
    this.timeout(30000);

    const response = await fetch("http://localhost:3001/predictions");
    const data = await response.json();

    assert.strictEqual(Array.isArray(data), true);
    assert.strictEqual(data.length > 0, true);
  });
});
