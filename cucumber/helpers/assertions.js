"use strict";


const {normalize} = require("./text");
const {Wait} = require("./wait");
const EC = protractor.ExpectedConditions;

class Assert extends Wait {

    constructor() {
        super();
    }

    elmIsVisible (path) {
        return browser.wait(EC.visibilityOf(path), browser.params.wait10, `no element found with following locator: ${path.locator()}`)
    }

    elmIsNotVisible (path) {
        return browser.wait(EC.invisibilityOf(path), browser.params.wait10, `element found with following locator: ${path.locator()}, but should not be found`)
    }

    elmIsPresent (path) {
        return browser.wait(EC.presenceOf(path), browser.params.wait10, `element found in DOM with following locator: ${path.locator()}, but should not be found`)
    }

    elmIsNotPresent (path) {
        return browser.wait(EC.stalenessOf(path), browser.params.wait10, `element found in DOM with following locator: ${path.locator()}, but should not be found`)
    }

    textPresentInElement (text, path) {
        return this.elmIsVisible(path)
            .then(() => browser.sleep(500))
            .then(() => this.elmIsVisible(path))
            .then(() => browser.wait(super.waitForTextInElement(path, text), browser.params.wait10, ` text "${text}" not found`))
    }

    checkInputError(input, cssProperty, cssValue) {
        return this.elmIsVisible(input)
            .then(() => browser.wait(super.waitForPartialAttributeInElement(input, 'class' , 'everhour-error'), browser.params.wait10, `attribute everhour-error not found`))
            .then(() => browser.wait(super.waitForCssValueInElement(input, cssProperty, cssValue), browser.params.wait10, `css value "${cssValue}" not found`))
    }

    checkNoTextOnPage (text) {
        const textOnPage = element(by.xpath(`//*[text()[contains(., "${text}")]]`));
        return this.elmIsNotVisible(textOnPage)
    }

    checkNoLabelOnPage (text) {
        const labelOnPage = element(by.xpath(`//label[text()[contains(., "${text}")]]`));
        return this.elmIsNotVisible(labelOnPage)
    }

    checkLabelOnPage (text) {
        const labelOnPage = element(by.xpath(`//label[text()[contains(., "${text}")]]`));
        return this.elmIsVisible(labelOnPage)
    }

    checkButtonOnPage (text) {
        const buttonOnPage = element(by.xpath(`//*[contains(@class, 'button') and contains(text(), '${text}')]`));
        return this.elmIsVisible(buttonOnPage)
    }

    checkLinkOnPage (text) {
        const linkOnPage = element(by.xpath(`//a[text()[contains(., "${text}")]]`));
        return this.elmIsVisible(linkOnPage)
    }

    checkNoButtonOnPage (text) {
        const buttonOnPage = element(by.xpath(`//button[text()[contains(., "${text}")]]`));
        return this.elmIsNotVisible(buttonOnPage)
    }

    checkNoLinkOnPage (text) {
        const linkOnPage = element(by.xpath(`//a[text()[contains(., "${text}")]]`));
        return this.elmIsNotVisible(linkOnPage)
    }

    checkTextIsOnPage (text) {
        const textOnPage = element(by.xpath(`//*[contains(text(), '${text}') and(not(name()='title'))]`));
        return this.elmIsVisible(textOnPage)
    }

    stateOfButton (buttonName) {
        let button = element(by.xpath(`//button[text()[contains(., "${buttonName}")]]`));
        return this.elmIsVisible(button)
            .then(() => button.getAttribute('disabled'))
    }

    getInputWithLabelText (label) {
        let input = element(by.xpath(`//*[text()='${label}']/ancestor::forminput//input`));
        return this.elmIsVisible(input)
            .then(() => input.getAttribute('value'))
    }

    getCssValueForElement (cssValueName, element) {
        return this.elmIsVisible(element)
            .then(() => element.getCssValue(cssValueName))
    }

    checkCssValueInElement(elm, attribute, expectedValue) {
        return this.elmIsVisible(elm)
            .then(() => browser.wait(super.waitForCssValueInElement(elm, attribute, expectedValue), browser.params.wait10, `css value "${expectedValue}" not found`))
    }

    getAttributeForElement (attributeName, element) {
        return this.elmIsVisible(element)
            .then(() => element.getAttribute(attributeName))
    }

    waitForAttributeNotInElement (input, attribute, value) {
        return function () {
            return input.getAttribute(attribute).then(function (actualValue) {
                return actualValue.includes(value) === false
            })
        }
    }

    checkAttributeValueInElement(input, attribute, value) {
        return this.elmIsVisible(input)
            .then(() => browser.wait(super.waitForAttributeInElement(input, attribute, value), browser.params.wait10, `attribute everhour-error not found`))
    }

    checkTextInElement (elm, expectedText) {
        return this.elmIsVisible(elm)
            .then(() => browser.wait(super.waitForTextInElement(elm, expectedText), browser.params.wait10, ` text "${expectedText}" not found`))
    }

    checkPartialAttributeValueInElement(input, attribute, value) {
        return this.elmIsVisible(input)
            .then(() => browser.wait(super.waitForPartialAttributeInElement(input, attribute, value), browser.params.wait10, `attribute "${attribute}" not found`))
    }

    checkElementAttributeValueNotInElement(input, attribute, value) {
        return this.elmIsVisible(input)
            .then(() => browser.wait(this.waitForAttributeNotInElement(input, attribute, value), 5000, `Element's "${input.locator()}" attribute "${attribute}" still contains "${value}"`))
    }

    checkNotification(text) {
        return this.textPresentInElement(text, this.headerNotification)
    }
}

module.exports.Assert = Assert;