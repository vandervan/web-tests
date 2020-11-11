"use strict";


const {Assert} = require("../helpers/assertions");
const {Actions} = require("../helpers/actions");
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
                .then(() => this.elementIsVisible(this.signIn))
                .then(() => this.clickToElement(this.signIn))
                .then(() => this.elementIsVisible(this.login))
                .then(() => this.typeValueToInput(username, this.login))
                .then(() => this.elementIsVisible(this.password))
                .then(() => this.typeValueToInput(password, this.password))
                .then(() => this.elementIsVisible(this.submitBtn))
                .then(() => this.clickToElement(this.submitBtn))
        }
    }

}

module.exports.Authorization = Authorization;
