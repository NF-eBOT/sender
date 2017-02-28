(() => {
    "use strict";

    let unirest = require('unirest');

    let config = require('../../config');

    module.exports = {

        sendCampaign(campaign_id){

            return new Promise((resolve, reject) => {

                unirest
                    .post(`${config.mailchimp.host}/campaigns/${campaign_id}/actions/send`)
                    .auth({
                        user: 'jonatasfreitasv',
                        pass:config.mailchimp.token
                    })
                    .type('application/json')
                    .end(function (response) {

                        if (response.error)
                            reject(response);
                        else
                            resolve(response);

                    });

            });

        },

        postCampaign(campaing, template_html){

            return new Promise((resolve, reject) => {

                unirest
                    .post(`${config.mailchimp.host}/campaigns`)
                    .auth({
                        user: 'jonatasfreitasv',
                        pass:config.mailchimp.token
                    })
                    .type('application/json')
                    .send(campaing)
                    .end(function (response) {

                        if(response.error)
                            reject(response);
                        else
                        {

                            let campaing_response = response;

                            unirest
                                .put(`${config.mailchimp.host}/campaigns/${response.body.id}/content`)
                                .auth({
                                    user: 'jonatasfreitasv',
                                    pass:config.mailchimp.token
                                })
                                .type('application/json')
                                .send({html: template_html })
                                .end(function (response) {

                                    if(response.error)
                                        reject(response);
                                    else
                                        resolve(campaing_response);

                                });

                        }

                    });

            });

        },

    }

})();