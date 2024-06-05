import { Builder, By, Locator, until } from "selenium-webdriver";
import { Options, ServiceBuilder } from "selenium-webdriver/chrome.js";
import * as chromedriver from "chromedriver";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const baseUrl = "https://wetransfer.com/";

const options = new Options();

options.addArguments("headless");
options.addArguments("disable-gpu");

const serviceBuilder = new ServiceBuilder(chromedriver.path);

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .setChromeService(serviceBuilder)
  .build();

const clickIfExist = async (locator: Locator) => {
  try {
    const element = await driver.findElement(locator);
    if (!!element) {
      await element.click();
    }
  } catch (e) {
    console.log("Error", e);
  }
};

export const upload = async (filePath: string) => {
  await driver.get(baseUrl);

  await clickIfExist(By.className("welcome__button--decline"));
  await sleep(2000);

  await clickIfExist(By.className("transfer__button"));
  await sleep(2000);

  await driver.executeScript(
    "document.getElementById('react-tiny-popover-container').remove();"
  );
  await sleep(2000);

  const transferOptionsToggle = await (
    await driver.findElement(By.id("transfer-options-icon"))
  ).findElement(By.xpath("./.."));
  await transferOptionsToggle.click();
  await sleep(2000);

  await driver.executeScript(
    "document.getElementsByClassName('radioinput__label')[1].click()"
  );

  await transferOptionsToggle.click();

  await driver.findElement(By.css("input[type=file]")).sendKeys(filePath);
  await sleep(2000);

  await driver.findElement(By.className("transfer__button")).click();

  await driver.wait(
    until.elementLocated(By.className("uploader--complete")),
    1000 * 60 * 5
  );

  const urlInput = await driver.findElement(By.className("transfer-link__url"));

  await driver.wait(until.elementIsVisible(urlInput));

  const url = await urlInput.getAttribute("value");

  await driver.quit();
  return { url };
};
