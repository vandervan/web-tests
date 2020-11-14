"use strict";

const xmultiple = require("xmultiple");
const {Wait} = require("../helpers/wait");
const {Assert} = require("../helpers/assertions");
const {Actions} = require("../helpers/actions");

class Home extends xmultiple (Actions, Assert, Wait) {

    constructor() {
        super();
    }

    checkRepoPresence(repoName) {
        let repo = element(by.xpath(`//*[@id='dashboard']//*[contains(text(), 'Repositories')]/ancestor::*[@id='repos-container']`));
        return this.waitForTextInElement(repo, repoName)
    }

    openRepo(repoName) {
        let repName = element(by.xpath(`//*[contains(text(), 'Repositories')]/ancestor::*[@id='repos-container']//*[contains(text(), '${repoName}')]`));
        let repLink = element(by.xpath(`//*[contains(text(), 'Repositories')]/ancestor::*[@id='repos-container']//a[@href='/test-user-dev/test-repo']`))
        return this.elmIsVisible(repName).then(() => this.clickToElement(repLink))
    }
}

module.exports.Home = Home;