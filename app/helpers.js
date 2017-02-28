(() => {
    "use strict";

    let fs = require('fs');

    module.exports = {

        getMailTemplate(_new){

            return new Promise((resolve, reject) => {

                fs.readFile(
                    'docs/mailchimp-basic-template.html',
                    'utf8',
                    (err, data) => {

                        if(err) reject(err);

                        let mergedWithNew = data
                            .replace('##name##', _new.scraper.name)
                            .replace('##date##', _new.date != null ? _new.date : '')
                            .replace('##title##', _new.title)
                            .replace('##base_url_custom##', this.sanitizeScraperBaseUrl(_new.scraper.base_url))
                            .replace('##base_url##', _new.scraper.base_url)
                            .replace('##base_url_custom##', this.sanitizeScraperBaseUrl(_new.scraper.base_url))
                            .replace('##base_url##', _new.scraper.base_url);

                        resolve(mergedWithNew);

                    });

            });

        },

        sanitizeScraperBaseUrl(base_url){

            return base_url
                .replace('http://', '')
                .replace('https://', '')
                .replace('www.', '')
                .replace('/', '');

        },


    };

})();