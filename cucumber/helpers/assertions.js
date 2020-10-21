"use strict";


const EC = protractor.ExpectedConditions;
let {textOf, cssValueOf, attributeOf, partialAttributeOf, exactTextOf, textOfTooltip} = require("../helpers/wait");

class Assert {

    constructor() {
    }

    isVisible (path) {
        return browser.wait(EC.visibilityOf(path), browser.params.wait10, `no element found with following locator: ${path.locator()}`)
    }

    isInvisible (path) {
        return browser.wait(EC.invisibilityOf(path), browser.params.wait10, `element found with following locator: ${path.locator()}, but should not be found`)
    }

    isPresentInDom (path) {
        return browser.wait(EC.presenceOf(path), browser.params.wait10, `element found in DOM with following locator: ${path.locator()}, but should not be found`)
    }

    isNotPresentInDom (path) {
        return browser.wait(EC.stalenessOf(path), browser.params.wait10, `element found in DOM with following locator: ${path.locator()}, but should not be found`)
    }

    textPresentInElement (text, path) {
        return this.isVisible(path)
            .then(() => browser.sleep(500))
            .then(() => this.isVisible(path))
            .then(() => browser.wait(textOf(path, text), browser.params.wait10, ` text "${text}" not found`))
    }

    checkInputError(input, cssProperty, cssValue) {
        return this.isVisible(input)
            .then(() => browser.wait(partialAttributeOf(input, 'class' , 'everhour-error'), browser.params.wait10, `attribute everhour-error not found`))
            .then(() => browser.wait(cssValueOf(input, cssProperty, cssValue), browser.params.wait10, `css value "${cssValue}" not found`))
    }

    checkNoTextOnPage (text) {
        const textOnPage = element(by.xpath(`//*[text()[contains(., "${text}")]]`));
        return this.isInvisible(textOnPage)
    }

    checkNoLabelOnPage (text) {
        const labelOnPage = element(by.xpath(`//label[text()[contains(., "${text}")]]`));
        return this.isInvisible(labelOnPage)
    }

    checkLabelOnPage (text) {
        const labelOnPage = element(by.xpath(`//label[text()[contains(., "${text}")]]`));
        return this.isVisible(labelOnPage)
    }

    checkButtonOnPage (text) {
        const buttonOnPage = element(by.xpath(`//*[contains(@class, 'button') and contains(text(), '${text}')]`));
        return this.isVisible(buttonOnPage)
    }

    checkLinkOnPage (text) {
        const linkOnPage = element(by.xpath(`//a[text()[contains(., "${text}")]]`));
        return this.isVisible(linkOnPage)
    }

    checkNoButtonOnPage (text) {
        const buttonOnPage = element(by.xpath(`//button[text()[contains(., "${text}")]]`));
        return this.isInvisible(buttonOnPage)
    }

    checkNoLinkOnPage (text) {
        const linkOnPage = element(by.xpath(`//a[text()[contains(., "${text}")]]`));
        return this.isInvisible(linkOnPage)
    }

    checkTextIsOnPage (text) {
        const textOnPage = element(by.xpath(`//*[contains(text(), '${text}') and(not(name()='title'))]`));
        return this.isVisible(textOnPage)
    }

    stateOfButton (text) {
        let button = element(by.xpath(`//button[text()[contains(., "${text}")]]`));
        return this.isVisible(button)
            .then(() => button.getAttribute('disabled'))
    }

    getInputWithLabelText (label) {
        let input = element(by.xpath(`//*[text()='${label}']/ancestor::forminput//input`));
        return this.isVisible(input)
            .then(() => input.getAttribute('value'))
    }

    getCssValueForElement (cssValueName, element) {
        return this.isVisible(element)
            .then(() => element.getCssValue(cssValueName))
    }

    checkCssValueInElement(elm, attribute, expectedValue) {
        return this.isVisible(elm)
            .then(() => browser.wait(waitForCssValueInElement(elm, attribute, expectedValue), browser.params.wait10, `css value "${expectedValue}" not found`))
    }

    getAttributeForElement (attributeName, element) {
        return this.isVisible(element)
            .then(() => element.getAttribute(attributeName))
    }

    waitForAttributeNotInElement (input, attribute, value) {
        return function () {
            return input.getAttribute(attribute).then(function (actualValue) {
                return actualValue.includes(value) === false
            })
        }
    }

    waitForTextInElement (elm, expectedText) {
        return function () {
            return browser.wait(EC.visibilityOf(elm), browser.params.wait10, `element with locator ${elm.locator()} wasn't found`)
                .then(() => elm.getText().then(normalize))
                .then((actualText) => actualText.toLowerCase().includes(expectedText.toLowerCase()))
        }
    }

    checkAttributeValueInElement(input, attribute, value) {
        return this.isVisible(input)
            .then(() => browser.wait(waitForAttributeInElement(input, attribute, value), browser.params.wait10, `attribute everhour-error not found`))
    }

    checkTextInElement (elm, expectedText) {
        return this.isVisible(elm)
            .then(() => browser.wait(textOf(elm, expectedText), browser.params.wait10, ` text "${expectedText}" not found`))
    }

    checkPartialAttributeValueInElement(input, attribute, value) {
        return this.isVisible(input)
            .then(() => browser.wait(waitForPartialAttributeInElement(input, attribute, value), browser.params.wait10, `attribute "${attribute}" not found`))
    }

    checkElementAttributeValueNotInElement(input, attribute, value) {
        return this.isVisible(input)
            .then(() => browser.wait(this.waitForAttributeNotInElement(input, attribute, value), 5000, `Element's "${input.locator()}" attribute "${attribute}" still contains "${value}"`))
    }

    checkNotification(text) {
        return this.textPresentInElement(text, this.headerNotification)
    }
}

module.exports.Assert = Assert;