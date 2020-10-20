const reporter = require("cucumber-html-reporter");

const reports = "reports";

reporter.generate({
    theme: "bootstrap",
    reportSuiteAsScenarios: true,
    ignoreBadJsonFile: true,
    jsonDir: reports,
    output: reports + "/cucumber-report.html",
});
