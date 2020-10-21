function textOf(input, expectedText) {
    let text = expectedText.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase();
    return () => {
        return input.getText()
            .then((val) => val.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase())
            .then((actualText) => actualText.includes(text) === true )
    }
}

function cssValueOf(input, cssProperty, cssValue) {
    return () => {
        return input.getCssValue(cssProperty)
            .then( (actualValue) => actualValue.includes(cssValue) === true)
    }
}

function attributeOf(input, attribute, value) {
    return () => {
        return input.getAttribute(attribute)
            .then((actualValue) => actualValue === value)
    }
}

function exactTextOf(input, expectedText) {
    let text = expectedText.toLowerCase();
    return () => {
        return input.getText()
            .then((val) => val.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase())
            .then((actualText) => actualText === text )
    }
}

function partialAttributeOf(input, attribute, value) {
    return () => {
        return input.getAttribute(attribute)
            .then((actualValue) => actualValue.toLowerCase().includes(value.toLowerCase()) === true)
    }
}

function textOfTooltip(tooltip, expectedText) {
    let text = expectedText.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase();
    return () => {
        return browser.sleep(browser.params.waitForTooltip)
            .then(() => browser.wait(EC.visibilityOf(tooltip), browser.params.wait10, `element with locator ${tooltip.locator()} wasn't found`))
            .then(() => tooltip.getText())
            .then((val) => val.trim().replace(/(\s+)|(&nbsp;)/g, ' ').toLowerCase())
            .then((actualText) => actualText.includes(text))
    }
}

module.exports = {
    textOf, cssValueOf, attributeOf, exactTextOf, partialAttributeOf, textOfTooltip
};