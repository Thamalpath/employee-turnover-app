const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Manage Employees Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000);
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should add a new employee", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/manage-employees");

    await driver.wait(until.elementLocated(By.id("EmployeeName")), 30000);

    await driver
      .findElement(By.id("EmployeeName"))
      .sendKeys("Thanoda Sathsara");
    await driver.findElement(By.id("Education")).sendKeys("Bachelors");
    await driver.findElement(By.id("JoiningYear")).sendKeys("2020");
    await driver.findElement(By.id("City")).sendKeys("Maharagama");
    await driver.findElement(By.id("PaymentTier")).sendKeys("1");
    await driver.findElement(By.id("Age")).sendKeys("23");
    await driver.findElement(By.id("Gender")).sendKeys("Male");
    await driver.findElement(By.id("EverBenched")).sendKeys("No");
    await driver.findElement(By.id("ExperienceInCurrentDomain")).sendKeys("0");

    await driver.findElement(By.className("submit-btn")).click();
  });

  it("should update an existing employee", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/manage-employees");

    await driver.wait(until.elementLocated(By.css("tbody tr")), 30000);

    await driver.findElement(By.css("tbody tr")).click();

    await driver.findElement(By.id("EmployeeName")).clear();
    await driver
      .findElement(By.id("EmployeeName"))
      .sendKeys("Updated Thanoda Sathsara");

    await driver.findElement(By.className("update-btn")).click();
  });

  it("should delete an existing employee", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/manage-employees");

    await driver.wait(until.elementLocated(By.css("tbody tr")), 30000);

    await driver.findElement(By.css("tbody tr")).click();

    await driver.findElement(By.className("delete-btn")).click();
  });
});
