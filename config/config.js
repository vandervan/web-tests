let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let moment = require("moment");
let reportDir = "reports/report_" + moment().format("YYYYMMDD_HHmmss");
chai.use(require('chai-dom'));
let should = chai.should();

require('custom-env').env(true);

console.log(process.env.SELENIUM_HUB);

exports.config = {
    seleniumAddress: process.env.EVERHOUR_SELENIUM,
    baseUrl: process.env.APP_URL,
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            // list of all args https://peter.sh/experiments/chromium-command-line-switches/
            args: [ "--disable-gpu", "--headless", "--window-size=1600,1200" ],
            w3c: false
        },
    },
    ignoreUncaughtExceptions: true,
    allScriptsTimeout: 1000000,
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        "../features/*"
    ],
    exclude: "../features/database.feature",
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        global.expect = chai.expect;
    },
    cucumberOpts: {
        strict: true,
        format: ["json:" + reportDir + "/cucumber/cucumber-report.json", "node_modules/cucumber-pretty", "rerun:@rerun.txt"],
        require: [
            "../cucumber/step_definitions/*",
            "../cucumber/hooks/*.js",
        ],
    },
    plugins: [
        // plugin to backup report of last runing
        // and create report folder for new runing
        {
            path: "../plugins/create-report-folder.js",
            options: {
                reportDir: reportDir + "/cucumber"
            }
        },

        // plugin to generate cucumber html report
        {
            path: "../plugins/cucumber-html-reporter.js",
            options: {
                jsonFile: reportDir + "/cucumber/cucumber-report.json",
                output: reportDir + "/cucumber/cucumber-report.html"
            }
        }
    ],
    useAllAngular2AppRoots: true,

    params : {
        apiUrl : process.env.API_URL,
        useSessionId: false,
        wait5: 5000,
        wait10: 10000,
        wait30: 30000,
        waitForTooltip: 250
    }
};