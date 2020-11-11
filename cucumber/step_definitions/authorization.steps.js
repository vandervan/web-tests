"use strict";


const {Authorization} = require("../pages/authorization.page");
const {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {

    const Authorization = new Authorization();

    Given(/I login with "(.*?)" login and "(.*?)" password to Github$/, (username, password) => Authorization.authorization(username, password));

});




