"use strict";

const {defineSupportCode} = require("cucumber");
const {Actions} = require("../helpers/actions");


defineSupportCode(function ({Given, When, Then}) {

    let actions = new Actions();

    Then(/I follow link with text "(.*?)"$/, (link) => actions.followLink(link));

});