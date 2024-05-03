const { Builder, By, Key, until } = require("selenium-webdriver");

describe("Login Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000); // Set a longer timeout (e.g., 30 seconds)
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should login with valid credentials", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/");

    // Wait for the form element to be located
    await driver.wait(until.elementLocated(By.id("form1")), 10000);

    // Enter email and password
    await driver.findElement(By.id("form1")).sendKeys("pavan@gmail.com");
    await driver.findElement(By.id("form2")).sendKeys("123", Key.RETURN);

    // Wait for the URL to contain "/Dashboard"
    await driver.wait(until.urlContains("/Dashboard"), 15000);
  });

  it("should show error with invalid credentials", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.id("form1")).sendKeys("invalid@example.com");
    await driver
      .findElement(By.id("form2"))
      .sendKeys("wrongpassword", Key.RETURN);
  });
});
