# NF-eBOT - Sender

Responsible to send mailchimp campaign and slack message, builded with Node.JS.


## To Install
#### Dependencies
[NodeJS](https://nodejs.org/en)

NF-eBOT API running.

#### First create ```config.js``` using ```config.js.dist``` template and run: `npm install`


## To Run
#### Default mode
`node app/main.js`
#### PM2 mode
`pm2 start pm2_ecosystem.json`
#### Docker mode
Using `Dockerfile` to build or/and `docker-compose.yml`.

## Folder Structure
* `app`: source files
* `doc`: templates and others
* `examples`: about api collection post structure and others
