(() => {
    "use strict";

    let config = require('../config');
    let helpers = require('./helpers');
    let api = require('./services/api');
    let mailchimp = require('./services/mailchimp');
    let slack = require('./services/slack');
    let logger = require('./logger');

    let _new = null;

    /// Logs
    logger.info(`NF-eBOT Sender started !`);
    slack.sendMessage(`NF-eBOT Sender started !`, config.slack.logs).then((result) => {
    }).catch((result) => {
        console.log(result);
    });

    /// Execute every time defined in config.delay
    setInterval(() => {

        /// Get from API non submitted news
        api.getNonSubmittedNews()
            .then((news) => {

                if(news.length > 0) {
                    _new = news[0];
                    /// Generate e-mail template from docs/mailchimp-basic-template.html
                    return helpers.getMailTemplate(_new);
                }
                else
                    throw 'Not have any news.';

            })
            .then((template_html) => {

                /// Build mailchimp campaign
                let campaign = {
                    recipients: {
                        list_id: config.mailchimp.list_id
                    },
                    settings: {
                        subject_line: `${_new.scraper.name} - ${helpers.sanitizeScraperBaseUrl(_new.scraper.base_url)}`,
                        title: `${_new.scraper.name} - ${_new._id}`,
                        to_name: "*|FNAME|*",
                        from_name: config.mailchimp.from_name,
                        reply_to: config.mailchimp.reply_to,
                        folder_id: config.mailchimp.folder_id,
                        auto_footer: true,
                        inline_css: true
                    },
                    type: "regular"
                };

                /// Create mailchimp campaign
                return mailchimp.postCampaign(campaign, template_html);

            })
            .then((post_campaign_result) => {
                /// Send mailchimp campaign
                return mailchimp.sendCampaign(post_campaign_result.body.id)
            })
            .then((send_campaign_result) => {

                if(send_campaign_result.status === 204)
                    /// Set news to submitted state
                    return api.updateNews(_new);
                else
                    throw `News ${_new._id} error in send_campaign_result -> \n ${JSON.stringify(send_campaign_result.body, null, 4)}`;

            })
            .then((update_news_result) => {

                if(update_news_result.status === 204) {

                    logger.info(`News ${_new._id} email sent.`);

                    /// Send slack message
                    let slack_message = `*# ${_new.scraper.name}* ${_new.date != null ? `\n${_new.date} - ` : ''} ${_new.title} \n ${_new.scraper.page_url}`;
                    return slack.sendMessage(slack_message, config.slack.alerts);

                }
                else
                    throw `News ${_new._id} error in update news -> \n ${JSON.stringify(send_campaign_result.body, null, 4)}`;

            })
            .then((slack_result) => {

                if(slack_result == 'ok')
                    logger.info(`News ${_new._id} slack sent.`);
                else
                    throw `News ${_new._id} error in slack_result -> \n ${slack_result}`;

            })
            .catch((err) => {

                if(err != 'Not have any news.') {
                    if(err.body) {
                        logger.critical(`ERROR -> ${JSON.stringify(err.body)}`);
                        slack.sendMessage(`ERROR -> ${JSON.stringify(err.body)}`, config.slack.logs).then((result) => {
                        });
                    }
                    else {
                        logger.critical(`ERROR -> ${JSON.stringify(err)}`);
                        try {
                            slack.sendMessage(`ERROR -> ${JSON.stringify(err)}`, config.slack.logs).then((result) => {
                            });
                        }
                        catch (e) {
                            slack.sendMessage(`ERROR -> ${err}`, config.slack.logs).then((result) => {
                            });
                        }
                    }
                }
                else
                    logger.info(err);

            });

    }, config.delay * 1000 * 60)

})();