"use strict";

const {defineSupportCode} = require("cucumber");
const {Home} = require("../pages/home.page");


defineSupportCode(function ({Given, When, Then}) {

    let home = new Home();

    Then(/I should see "(.*?)" in repositories section$/, (repoName) => home.checkRepoPresence(repoName));

    Then(/I open "(.*?)" repository$/, (repoName) => home.openRepo(repoName));

});