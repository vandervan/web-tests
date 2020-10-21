let fetch = require('isomorphic-fetch');

let VERSION = '1.3';
let ENDPOINT = browser.params.apiUrl;

class GithubApi {
    request(resource, method = 'GET', body = null) {
        var params = {
            // mode: 'no-cors',
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-Accept-Version': VERSION
            }
        };

        if (body) {
            params['body'] = body;
        }

        var lastResponseBody = null;

        return browser.driver.getSession()
            .then(session => {
                if (browser.params.useSessionId) {
                    params.headers['X-Session-Id'] = browser.params.sessionId || session.getId();
                }
            })
            .then(() => {
                return fetch(ENDPOINT + resource, params)
                    .then(this.checkStatus)
                    .then(response => response.text().then(text => {
                        lastResponseBody = text;
                        return text ? JSON.parse(text) : null;
                    }))
                    .catch(err => {
                        throw new Error(err + '\n (Response: ' + lastResponseBody + ')');
                    })
            });
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        throw new Error(response.statusText);
    }

    get(resource) {
        return this.request(resource);
    }

    post(resource, body) {
        return this.request(resource, 'POST', JSON.stringify(body));
    }

    put(resource, body) {
        return this.request(resource, 'PUT', JSON.stringify(body));
    }

    del(resource, body) {
        if (body) {
            return this.request(resource, 'DELETE', JSON.stringify(body));
        }

        return this.request(resource, 'DELETE');
    }

    patch(resource, body) {
        return this.request(resource, 'PATCH', JSON.stringify(body));
    }
}

module.exports = new GithubApi();
