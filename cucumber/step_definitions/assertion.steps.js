"use strict";


const {Assert} = require("../helpers/assertions");
const {defineSupportCode} = require("@cucumber/cucumber");

defineSupportCode(function ({ Then }) {

    let assert = new Assert();

    Then(/button "(.*?)" should be disabled$/, (buttonName) =>
        assert.stateOfButton(buttonName).should.eventually.equal("true"));

    Then(/button "(.*?)" should be enabled$/, (buttonName) =>
        assert.stateOfButton(buttonName).should.eventually.equal(null))
});