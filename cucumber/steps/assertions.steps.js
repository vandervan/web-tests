"use strict";
let { Assert } = require("../helpers/assertions");
let { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Then }) {

    let assert = new Assert();

    Then(/button "(.*?)" should be disabled$/, (buttonName) =>
        assert.stateOfButton(buttonName).should.eventually.equal("true"));

    Then(/button "(.*?)" should be enabled$/, (buttonName) =>
        assert.stateOfButton(buttonName).should.eventually.equal(null))
});
