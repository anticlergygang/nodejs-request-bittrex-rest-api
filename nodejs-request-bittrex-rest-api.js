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

// PUBLIC

bittrexRequest('public/getmarkets', '', 'v1.1', '').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('public/getcurrencies', '', 'v1.1', '').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('public/getmarketsummaries', '', 'v1.1', '').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('public/getticker', 'market=MARKET', 'v1.1', '').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('public/getmarketsummary', 'market=MARKET', 'v1.1', '').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('public/getmarkethistory', 'market=MARKET', 'v1.1', '').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('public/getorderbook', 'market=MARKET&type=TYPE', 'v1.1', '').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

// ACCOUNT

bittrexRequest('account/getbalances', 'apikey=APIKEY', 'v1.1', 'SECRET').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('account/getbalance', 'apikey=APIKEY&currency=CURRENCY', 'v1.1', 'SECRET').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('account/getdepositaddress', 'apikey=APIKEY&currency=CURRENCY', 'v1.1', 'SECRET').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

// bittrexRequest('account/withdraw', 'apikey=APIKEY&currency=CURRENCY&quantity=QUANTITY&address=ADDRESS', 'v1.1', 'SECRET').then(out => {
//     console.log(out);
// }).catch(err => {
//     console.log(err);
// });

// bittrexRequest('account/getorder', 'apikey=APIKEY&uuid=UUID', 'v1.1', 'SECRET').then(out => {
//     console.log(out);
// }).catch(err => {
//     console.log(err);
// });

bittrexRequest('account/getorderhistory', 'apikey=APIKEY&market=MARKET', 'v1.1', 'SECRET').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('account/getwithdrawalhistory', 'apikey=APIKEY&market=MARKET', 'v1.1', 'SECRET').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

bittrexRequest('account/getdeposithistory', 'apikey=APIKEY&market=MARKET', 'v1.1', 'SECRET').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});

// MARKET

// bittrexRequest('market/buylimit', 'apikey=APIKEY&market=MARKET&quantity=QUANTITY&rate=RATE', 'v1.1', 'SECRET').then(out => {
//     console.log(out);
// }).catch(err => {
//     console.log(err);
// });

// bittrexRequest('market/selllimit', 'apikey=APIKEY&market=MARKET&quantity=QUANTITY&rate=RATE', 'v1.1', 'SECRET').then(out => {
//     console.log(out);
// }).catch(err => {
//     console.log(err);
// });

// bittrexRequest('market/cancel', 'apikey=APIKEY&uuid=UUID', 'v1.1', 'SECRET').then(out => {
//     console.log(out);
// }).catch(err => {
//     console.log(err);
// });

bittrexRequest('market/getopenorders', 'apikey=APIKEY&market=MARKET', 'v1.1', 'SECRET').then(out => {
    console.log(out);
}).catch(err => {
    console.log(err);
});