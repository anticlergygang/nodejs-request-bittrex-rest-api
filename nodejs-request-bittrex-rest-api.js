const request = require('request');
const bittrexRequest = (method, query = '', version = 'v1.1', secret = '') => {
    return new Promise((resolve, reject) => {
        let url = `https://bittrex.com/api/${version}/${method}?${query}&nonce=${(new Date().getTime)}`;
        request.get({
            url: url,
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json',
                'apisign': crypto.createHmac('sha512', secret).update(url).digest('hex')
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
const getMarketTickersPromise = () => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarkets').then(markets => {
            let tickerPromises = [];
            markets.forEach((market, marketIndex) => {
                if (market.IsActive) {
                    tickerPromises.push(`${markets[marketIndex].BaseCurrency}-${markets[marketIndex].MarketCurrency}`);
                    tickerPromises.push(bittrexRequest('public/getticker', `market=${markets[marketIndex].BaseCurrency}-${markets[marketIndex].MarketCurrency}`));
                }
            });
            return Promise.all(tickerPromises);
        }).then(markets => {
            let jsonMarkets = {};
            let timestamp = (new Date().getTime());
            for (let i = 0; i < markets.length; i = i + 2) {
                markets[i + 1].timestamp = timestamp;
                jsonMarkets[markets[i]] = markets[i + 1];
            }
            resolve(jsonMarkets);
        }).catch(err => {
            reject(err);
        });
    });
};