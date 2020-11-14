"use strict";


let {Authorization} = require("../pages/authorization.page");
let {defineSupportCode} = require("cucumber");


defineSupportCode(function ({Given, When, Then}) {

    let auth = new Authorization();

    Given(/I login with "(.*?)" login and "(.*?)" password to Github$/, (username, password) =>
        auth.loginWithCreds(username, password));

});




