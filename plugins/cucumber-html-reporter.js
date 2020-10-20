var reporter = require("cucumber-html-reporter");

module.exports = {
    postResults: function() {
        var options = Object.assign({
            theme: "bootstrap",
            reportSuiteAsScenarios: true
        }, this.config.options);

        reporter.generate(options);
    }
};