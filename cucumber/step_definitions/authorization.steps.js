"use strict";


const {Authorization} = require("../pages/authorization.page");
const {Given, When, Then} = require("@cucumber/cucumber");

    let auth = new Authorization()

    Given(/I login with "(.*?)" login and "(.*?)" password to Github$/, () => auth.authorization())




