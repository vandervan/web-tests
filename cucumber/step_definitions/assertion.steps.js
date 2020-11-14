"use strict";


const {Assert} = require("../helpers/assertions");
const {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}){

    let assert = new Assert();

    Then(/I wait until "(.*?)" text will be displayed$/, (text) => assert.checkTextIsOnPage(text))

})
