(function () {
    "use strict";

    //let graylog2 = require('graylog2'),
    let colors = require('colors');
    let moment = require('moment');

    let config = require('../config');

    /*
    let graylog = new graylog2.graylog({
        servers: [
            {
                'host': config.graylog.host, port: 12201
            },
        ],
        hostname: config.name,
        facility: `comprasnet.scraper.priority.${config.priority}`,
    });

    graylog.on('error', function (error) {
        console.error(`[ERROR] ${moment().format('DD/MM/YY HH:mm:ss')} - Send to graylog`.red, error);
    });
    */

    module.exports = {

        debug(short_message, full_message = ''){
            //graylog.debug(short_message, full_message);
            if (config.development)
                console.info(`[DEBUG] ${moment().format('DD/MM/YY HH:mm:ss')} - ${short_message}`.green, full_message.green);
            else
                console.info(`[DEBUG] ${moment().format('DD/MM/YY HH:mm:ss')} - ${short_message}`.green);
        },

        info(short_message, full_message = ''){
            //graylog.info(short_message, full_message);
            if (config.development)
                console.info(`[INFO] ${moment().format('DD/MM/YY HH:mm:ss')} - ${short_message}`.cyan, full_message.cyan);
            else
                console.info(`[INFO] ${moment().format('DD/MM/YY HH:mm:ss')} - ${short_message}`.cyan);
        },

        warning(short_message, full_message = ''){
            //graylog.warning(short_message, full_message);
            console.warn(`[WARNING] ${moment().format('DD/MM/YY HH:mm:ss')} - ${short_message}`.yellow, full_message.yellow);
        },

        error(short_message, full_message = ''){
            //graylog.error(short_message, full_message);
            console.error(`[ERROR] ${moment().format('DD/MM/YY HH:mm:ss')} - ${short_message}`.red, full_message.red);
        },

        critical(short_message, full_message = ''){
            //graylog.critical(short_message, full_message);
            console.error(`[!!!CRITICAL!!!] ${moment().format('DD/MM/YY HH:mm:ss')} - ${short_message}`.magenta, full_message.magenta);
        }

    };

})();