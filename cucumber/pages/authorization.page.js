"use strict";

const {Assert} = require("../helpers/assertions");
const {Actions} = require("../helpers/actions");
const xmultiple = require("xmultiple");

class Authorization extends xmultiple (Assert, Actions) {

    constructor() {
        super()
        this.login = element(by.css("#login_field"));
        this.password = element(by.css("#password"));
        this.signIn = element(by.css("[href='/login']"));
        this.submitBtn = element(by.xpath("//*[@type='submit']"));
    }

    loginWithCreds (username, password) {
        return browser.driver.get("https://github.com")
                .then(() => this.elmIsVisible(this.signIn))
                .then(() => this.clickToElement(this.signIn))
                .then(() => this.elmIsVisible(this.login))
                .then(() => this.typeValueToInput(username, this.login))
                .then(() => this.elmIsVisible(this.password))
                .then(() => this.password.sendKeys(password))
                .then(() => this.elmIsVisible(this.submitBtn))
                .then(() => this.clickToElement(this.submitBtn))
    }

}

module.exports.Authorization = Authorization;
