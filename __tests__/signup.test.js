const { Builder, By, Key, until } = require("selenium-webdriver");

describe("Signup Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000); // Set a longer timeout (e.g., 30 seconds)
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should sign up with valid credentials", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/signup");

    await driver.findElement(By.id("form1")).sendKeys("Pubudu");
    await driver.findElement(By.id("form2")).sendKeys("pubudu@gamail.com");
    await driver.findElement(By.id("form3")).sendKeys("Pubudu@123", Key.RETURN);

    await driver.wait(until.urlContains("/"), 15000); // Wait for redirect to login page
  });

  it("should show error with invalid email format", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/signup");

    await driver.findElement(By.id("form1")).sendKeys("Pubudu");
    await driver
      .findElement(By.id("form2"))
      .sendKeys("invalidemail", Key.RETURN);
  });

  it("should show error with weak password", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/signup");

    await driver.findElement(By.id("form1")).sendKeys("Pubudu");
    await driver.findElement(By.id("form2")).sendKeys("pubudu@gamail.com");
    await driver.findElement(By.id("form3")).sendKeys("123", Key.RETURN);
  });
});
