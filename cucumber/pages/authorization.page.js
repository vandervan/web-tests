let { Assert } = require("../helpers/assertions");
let { Actions } = require("../helpers/actions");
const xmultiple = require("xmultiple");

class Authorization extends xmultiple(Assert, Actions) {
    constructor() {
        super()
        this.login = element(by.css("#login_field"));
        this.password = element(by.css("#password"));
        this.signIn = element(by.css("[href='/login']"));
        this.submitBtn = element(by.xpath("//button[@type='submit']"));

    }

    authorization (username, password) {
        return () => {
            browser.driver.get(browser.params.appUrl)
                .then(() => this.elementIsPresent(this.signIn))
                .then(() => this.clickToElement(this.signIn))
                .then(() => this.elementIsPresent(this.login))
                .then(() => this.typeValueToInput(this.login))
                .then(() => this.elementIsPresent(this.password))
                .then(() => this.typeValueToInput(this.password))
                .then(() => this.elementIsPresent(this.submitBtn))
                .then(() => this.clickToElement(this.submitBtn))
        }
    }

}

module.exports.Authorization = Authorization;