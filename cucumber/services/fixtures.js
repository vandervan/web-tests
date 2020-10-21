const { defineSupportCode } = require("cucumber");
const api = require("../services/GithubApi");
let moment = require('moment');

const DEBUG = false;

/**
 * Seed database with general fixture
 */
defineSupportCode(({ Before }) => {
    Before(() => api.get('/database/seed?fixture=general&reset=1'))
});

/**
 * Define step_definition to create project/account
 */
defineSupportCode(({ Given }) => {
    Given(/^a project:$/, body => api.post('/database/seed-object?type=project', {
        body: JSON.parse(body)
    }));

    Given(/^an account:$/, body => api.post('/database/seed-object?type=account', {
        body: JSON.parse(body)
    }));
});

const RequestReplacements = {
    '@date': {
        today: moment().format('YYYY-MM-DD'),
        monday: moment().isoWeekday("Monday").format('YYYY-MM-DD'),
        tuesday: moment().isoWeekday("Tuesday").format('YYYY-MM-DD'),
        wednesday: moment().isoWeekday("Wednesday").format('YYYY-MM-DD'),
        thursday: moment().isoWeekday("Thursday").format('YYYY-MM-DD'),
        friday: moment().isoWeekday("Friday").format('YYYY-MM-DD'),
        saturday: moment().isoWeekday("Saturday").format('YYYY-MM-DD'),
        sunday: moment().isoWeekday("Sunday").format('YYYY-MM-DD'),
        yesterday: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        last2days: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        lastWeek: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        last4days: moment().subtract(4, 'days').format('YYYY-MM-DD'),
        lastMonth: moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD'),
        lastMonth10: moment().subtract(1,'months').format('YYYY-MM-10'),
        last10days: moment().subtract(10, 'days').format('YYYY-MM-DD'),
        last15days: moment().subtract(15, 'days').format('YYYY-MM-DD'),
        last30days: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        lastMonth15: moment().subtract(1,'months').format('YYYY-MM-15'),
        firstDayOfCurrentWeek: moment().startOf('isoWeek').format('YYYY-MM-DD'),
        lastDayOfLastWeek: moment().subtract(1,'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
        nextWeek: moment().add(7, 'days').format('YYYY-MM-DD'),
    },
    '@weekId': {
        thisWeekId: moment().format('GGww'),
        nextWeekId: moment().add(1, 'weeks').format('GGww'),
        lastWeekId: moment().subtract(1, 'weeks').format('GGww')
    }
};

const ApplyRequestReplacements = (body, jsonize) => {
    for (let param of Object.keys(RequestReplacements)) {
        if (body.indexOf(param) === -1) {
            continue;
        }

        body = body.replace(new RegExp('' + param + '([\\w\\d\\.]*)', 'g'), (path) => {
            const [variable, ...components] = path.split('.');

            if (!RequestReplacements.hasOwnProperty(variable)) {
                return path;
            }

            let value = RequestReplacements[variable];

            for (let component of components) {
                if (!value.hasOwnProperty(component)) {
                    console.warn('Invalid path: ' + path, RequestReplacements[variable]);
                    return path;
                }

                value = value[component];
            }

            return jsonize ? JSON.stringify(value) : value;
        });
    }

    return body;
};

const ApiCall = (method, uri, body, saveAs) => {
    method = method.toLowerCase().replace('delete', 'del');
    uri = ApplyRequestReplacements(uri);
    body = body ? ApplyRequestReplacements(body, true) : null;

    if (DEBUG) console.info('API', method, uri, body);

    return api[method](uri, JSON.parse(body))
        .then((response) => {
            if (saveAs) {
                RequestReplacements['@' + saveAs] = response;
            }

            return response;
        });
};

/**
 * Define step_definition to make API calls
 */
defineSupportCode(({ Given }) => {
    Given(/^everhour client call (GET|POST|PUT|PATCH|DELETE) "([^\"]+?)"$/, (method, uri) => {
        return ApiCall(method, uri);
    });

    Given(/^everhour client call (GET|POST|PUT|PATCH|DELETE) "([^\"]+?)" as "\@([\w\d]+?)"$/, (method, uri, saveAs) => {
        return ApiCall(method, uri, null, saveAs);
    });

    Given(/^everhour client call (POST|PUT|PATCH|DELETE) "([^\"]+?)":$/, (method, uri, body) => {
        return ApiCall(method, uri, body);
    });

    Given(/^everhour client call (POST|PUT|PATCH|DELETE) "([^\"]+?)" as "\@([\w\d]+?)":$/, (method, uri, saveAs, body) => {
        return ApiCall(method, uri, body, saveAs);
    });
});