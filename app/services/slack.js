(function () {
    "use strict";

    let https = require('https');

    module.exports = {

        sendMessage(message, config){

            return new Promise((resolve, reject) => {

                let options = {
                    hostname: 'hooks.slack.com',
                    path: '/services/' + config.webhook_token,
                    method: 'POST'
                };

                let payload = {
                    "channel": config.channel,
                    "username": config.user,
                    "text": message
                };

                let req = https.request(options, (res, b, c) => {

                    res.setEncoding('utf8');

                    res.on('data', (response) => {
                        resolve(response);
                    });

                });

                req.on('error',(error) => {
                    reject(error);
                });

                req.write(JSON.stringify(payload));
                req.end();

            });

        }

    }

})();