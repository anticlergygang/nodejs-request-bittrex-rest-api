const request = require('request');
const bittrexRequest = (method, query = '', version = 'v1.1', apikey = '', secret = '') => {
    query = query.concat('&');
    return new Promise((resolve, reject) => {
        let url = `https://bittrex.com/api/${version}/${method}?${query}apikey=${apikey}&nonce=${(new Date().getTime)}`;
        request.get({
            url: url,
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json',
                'apisign': crypto.createHmac('sha512', Buffer(secret, 'base64')).update(url).digest('base64')
            }
        }, (err, body, res) => {
            if (err) {
                reject(err);
            } else {
                let jsonRes = JSON.parse(res);
                if (jsonRes.success === true) {
                    resolve(jsonRes.result);
                } else {
                    reject(jsonRes.message);
                }
            }
        });
    });
};