"use strict";

const {Wait} = require("./wait");
const EC = protractor.ExpectedConditions;
const {normalize} = require("../helpers/text");

class Actions extends Wait {

    constructor() {
        super();
    }

    clickToElement (path) {
        return browser.wait(EC.visibilityOf(path), browser.params.wait30, `not visible element found with following locator: ${path.locator()}`)
            .then(() => browser.wait(EC.elementToBeClickable(path), browser.params.wait30, `element ${path.locator()} hadn't became clickable`))
            .then(() => browser.sleep(500))
            .then(() => path.click())
    }

    typeValueToInput (text, path) {
        return browser.wait(EC.elementToBeClickable(path), browser.params.wait10, `no element found with following locator: ${path.locator()}`)
            .then(() => path.clear())
            .then(() => path.sendKeys("1"))
            .then(() => path.sendKeys('\uE003')) //workarond with emulating backspace button click
            .then(() => path.sendKeys(text))
            .then(() => browser.wait(EC.textToBePresentInElementValue(path, text), browser.params.wait10, `text ${text} is not present in input ${path.locator()}`))
    }

    MoveToAndClickTo (pathToFirstElement, pathToSecondElement) {
        return browser.wait(EC.visibilityOf(pathToFirstElement), browser.params.wait10, `no element found with following locator: ${pathToFirstElement.locator()}`)
            .then(() => browser.actions().mouseMove(pathToFirstElement).perform())
            .then(() => browser.wait(EC.elementToBeClickable(pathToSecondElement), browser.params.wait10, `no element foundM with following locator: ${pathToSecondElement.locator()}`))
            .then(() => pathToSecondElement.click())
    }

    MoveAndClickTo (elm) {
        return browser.wait(EC.visibilityOf(elm), browser.params.wait10, `no element found with following locator: ${elm.locator()}`)
            .then(() => browser.wait(EC.elementToBeClickable(elm), browser.params.wait10, `${elm} is not clickable`))
            .then(() => browser.actions().mouseMove(elm).perform())
            .then(() => browser.wait(EC.elementToBeClickable(elm), browser.params.wait10, `${elm} is not visible`))
            .then(() => elm.click())
    }

    MoveToAndGetTextFrom (pathToFirstElement, pathToSecondElement) {
        return browser.wait(EC.visibilityOf(pathToFirstElement), browser.params.wait10, `no element found with following locator: ${pathToFirstElement.locator()}`)
            .then(() => browser.actions().mouseMove(pathToFirstElement).perform())
            .then(() => browser.wait(EC.visibilityOf(pathToSecondElement), browser.params.wait10, `no element found with following locator: ${pathToSecondElement.locator()}`))
            .then(() => pathToSecondElement.getText().then(normalize))
    }

    MoveToAndCheckTextFrom (pathToFirstElement, pathToSecondElement, expectedText) {
        return browser.wait(EC.visibilityOf(pathToFirstElement), browser.params.wait10, `no element found with following locator: ${pathToFirstElement.locator()}`)
            .then(() => browser.actions().mouseMove(pathToFirstElement).perform())
            .then(() => browser.wait(EC.visibilityOf(pathToSecondElement), browser.params.wait10, `no element found with following locator: ${pathToSecondElement.locator()}`))
            .then(() => browser.wait(super.waitForTextInElement(pathToSecondElement, expectedText), browser.params.wait10 ))
    }

    followLink(link) {
        let elm = element(by.linkText(`${link}`));
        return this.clickToElement(elm)
    }

}

module.exports.Actions = Actions;