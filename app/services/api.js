(() => {
    "use strict";

    let unirest = require('unirest');

    let config = require('../../config');

    module.exports = {

        getNonSubmittedNews(){

            return new Promise((resolve, reject) => {

                unirest
                    .post(`${config.api.host}/news/search`)
                    .header('X-TOKEN', config.api.token)
                    .type('application/json')
                    .send({ submitted: false })
                    .end(function (response) {

                        if(response.error)
                            reject(response);
                        else
                            resolve(response.body);

                    });

            });

        },

        updateNews(_new){

            return new Promise((resolve, reject) => {

                delete _new.__v;
                _new.submitted = true;
                _new.submitted_at = Date.now();

                unirest
                    .put(`${config.api.host}/news/${_new._id}`)
                    .header('X-TOKEN', config.api.token)
                    .type('application/json')
                    .send(_new)
                    .end(function (response) {

                        if(response.error)
                            reject(response);
                        else
                            resolve(response);

                    });

            });

        }

    }

})();