"use strict";


class Wait {

    constructor() {
    }

    waitForTextInElement(input, expectedText) {
        let text = expectedText.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase();
        return () => {
            return input.getText()
                .then((val) => val.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase())
                .then((actualText) => actualText.includes(text) === true)
        }
    }

    waitForCssValueInElement(input, cssProperty, cssValue) {
        return () => {
            return input.getCssValue(cssProperty)
                .then((actualValue) => actualValue.includes(cssValue) === true)
        }
    }

    waitForAttributeInElement(input, attribute, value) {
        return () => {
            return input.getAttribute(attribute)
                .then((actualValue) => actualValue === value)
        }
    }

    waitForExactTextInElement(input, expectedText) {
        let text = expectedText.toLowerCase();
        return () => {
            return input.getText()
                .then((val) => val.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase())
                .then((actualText) => actualText === text)
        }
    }

    waitForPartialAttributeInElement(input, attribute, value) {
        return () => {
            return input.getAttribute(attribute)
                .then((actualValue) => actualValue.toLowerCase().includes(value.toLowerCase()) === true)
        }
    }
}

module.exports.Wait = Wait;
