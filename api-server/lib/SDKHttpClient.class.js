'use strict';

let imports = {
    'url': require('url'),
    'http' : require('http'),
    'https' : require('https'),
    'querystring' : require('querystring'),
};

module.exports = class SDKHttpClient {
    constructor(config){
        this.protocol = config.protocol || config.scheme || "http";
        this.host = config.host || "";
        this.port = config.port || (this.protocol === 'https' ? 443 : 80);

        if (config.host === "") {
            throw new Error('You need to specify a hostname');
        }
    }

    request(endpoint, params, cb){
        if (!endpoint) {
            throw new Error('You need to specify an endpoint');
        }
        if (!params) {
            params = null;
        }
        if (!cb || typeof cb !== 'function') {
            throw new Error('You need to specify a callback');
        }
        let options = {
            hostname: this.host,
            port: this.port,
            protocol: this.protocol + ":",
            method: "GET",
            path: endpoint + (params ? '?' + imports.querystring.stringify(params) : ''),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        console.info(`Calling endpoint ${this.protocol}://${this.host}:${this.port}${options.path}`);
        let req = imports[this.protocol === 'https' ? 'https' : 'http'].request(options, (res) => {
            res.setEncoding('utf8');
            let data = "";
            res.on('data', (chunk) => {
                data += chunk.toString();
            });
            res.on('end', () => {
                let parsedObject = null;
                try {
                    parsedObject = JSON.parse(data);
                } catch(e) {
                    console.error(`Problem parsing JSON - message ${e.message}:`, data);
                    return cb(e, null);
                }
                return cb(null, parsedObject);
            });
            res.on('error', (e) => {
                console.error(`Problem handling the response: ${e.message}`);
                cb(e, null);
            });
        });
        req.on('error', (e) => {
            console.error(`Problem in sending the request: ${e.message}`);
            cb(e, null);
        });

        req.end();
    }
};
