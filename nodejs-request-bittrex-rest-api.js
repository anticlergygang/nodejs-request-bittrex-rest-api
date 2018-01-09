const https = require('https');
const crypto = require('crypto');
const util = require('util');
const bittrexRequest = (method, query = '', version = 'v1.1', secret = '') => {
    return new Promise((resolve, reject) => {
        let path = `/api/${version}/${method}?${query}&nonce=${(new Date().getTime())}`;
        let url = `https://www.bittrex.com${path}`;
        let req = https.request({
            host: 'www.bittrex.com',
            path: path,
            port: 443,
            method: 'GET',
            headers: {
                'apisign': crypto.createHmac('sha512', secret).update(url).digest('hex')
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data = data.concat(chunk);
            });
            res.on('end', () => {
                try {
                    let jsonRes = JSON.parse(data);
                    if (jsonRes.success) {
                        resolve(jsonRes.result);
                    } else {
                        reject(jsonRes.message);
                    }
                } catch (err) {
                    reject(`bittrexRequest err: ${util.inspect(err)}\nbittrexRequest data recieved b4 error: ${data}`);
                }
            });
        });
        req.on('error', (err) => {
            reject(`bittrexRequest err: ${util.inspect(err)}`);
        });
        req.end();
    });
};

exports.getmarkets = () => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarkets', '', 'v1.1', '').then(markets => {
            resolve(markets);
        }).catch(err => {
            reject(`exports.getmarkets err: ${util.inspect(err)}`);
        });
    });
};

exports.getcurrencies = () => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getcurrencies', '', 'v1.1', '').then(currencies => {
            resolve(currencies);
        }).catch(err => {
            reject(`exports.getcurrencies err: ${util.inspect(err)}`);
        });
    });
};

exports.getmarketsummaries = () => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarketsummaries', '', 'v1.1', '').then(marketsummaries => {
            resolve(marketsummaries);
        }).catch(err => {
            reject(`exports.getmarketsummaries err: ${util.inspect(err)}`);
        });
    });
};

exports.getticker = (marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getticker', `market=${marketName}`, 'v1.1', '').then(ticker => {
            resolve(ticker);
        }).catch(err => {
            reject(`exports.getticker err: ${util.inspect(err)}`);
        });
    });
};

exports.getmarketsummary = (marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarketsummary', `market=${marketName}`, 'v1.1', '').then(marketsummary => {
            resolve(marketsummary[0]);
        }).catch(err => {
            reject(`exports.getmarketsummary err: ${util.inspect(err)}`);
        });
    });
};

exports.getmarkethistory = (marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarkethistory', `market=${marketName}`, 'v1.1', '').then(markethistory => {
            resolve(markethistory);
        }).catch(err => {
            reject(`exports.getmarkethistory err: ${util.inspect(err)}`);
        });
    });
};

exports.getorderbook = (marketName, type) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getorderbook', `market=${marketName}&type=${type}`, 'v1.1', '').then(orderbook => {
            resolve(orderbook);
        }).catch(err => {
            reject(`exports.getorderbook err: ${util.inspect(err)}`);
        });
    });
};

exports.getticks = (marketName, tickInterval = 'fiveMin') => {
    return new Promise((resolve, reject) => {
        bittrexRequest('pub/market/GetTicks', `marketName=${marketName}&tickInterval=${tickInterval}`, 'v2.0').then(ticks => {
            let open = [],
                high = [],
                low = [],
                close = [],
                volume = [],
                time = [];
            ticks.forEach((tick, i) => {
                open.push(tick.O);
                high.push(tick.H);
                low.push(tick.L);
                close.push(tick.C);
                volume.push(tick.V);
                time.push(tick.T);
            });
            resolve({ ticks: { open: open, high: high, low: low, close: close, volume: volume, time: time }, marketName: marketName, tickInterval: tickInterval });
        }).catch(err => {
            reject(`exports.getticks err: ${util.inspect(err)}`);
        });
    });
};

exports.getbalances = (apikey, secret) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getbalances', `apikey=${apikey}`, 'v1.1', secret).then(balances => {
            resolve(balances);
        }).catch(err => {
            reject(`exports.getbalances err: ${util.inspect(err)}`);
        });
    });
};

exports.getbalance = (apikey, secret, currency) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getbalance', `apikey=${apikey}&currency=${currency}`, 'v1.1', secret).then(balance => {
            resolve(balance);
        }).catch(err => {
            reject(`exports.getbalance err: ${util.inspect(err)}`);
        });
    });
};

exports.getdepositaddress = (apikey, secret, currency) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getdepositaddress', `apikey=${apikey}&currency=${currency}`, 'v1.1', secret).then(address => {
            resolve(address);
        }).catch(err => {
            reject(`exports.getdepositaddress err: ${util.inspect(err)}`);
        });
    });
};

exports.withdraw = (apikey, secret, currency, quantity, address) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/withdraw', `apikey=${apikey}&currency=${currency}&quantity=${currency}&address=${address}`, 'v1.1', secret).then(tx => {
            resolve(tx);
        }).catch(err => {
            reject(`exports.withdraw err: ${util.inspect(err)}`);
        });
    });
};

exports.getorder = (apikey, secret, uuid) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getorder', `apikey=${apikey}&uuid=${uuid}`, 'v1.1', secret).then(order => {
            resolve(order);
        }).catch(err => {
            reject(`exports.getorder err: ${util.inspect(err)}`);
        });
    });
};

exports.getorderhistory = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getorderhistory', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(orderHisotry => {
            resolve(orderHisotry);
        }).catch(err => {
            reject(`exports.getorderhistory err: ${util.inspect(err)}`);
        });
    });
};

exports.getwithdrawalhistory = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getwithdrawalhistory', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(withdrawalHistory => {
            resolve(withdrawalHistory);
        }).catch(err => {
            reject(`exports.getwithdrawalhistory err: ${util.inspect(err)}`);
        });
    });
};

exports.getdeposithistory = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getdeposithistory', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(depositHistory => {
            resolve(depositHistory);
        }).catch(err => {
            reject(`exports.getdeposithistory err: ${util.inspect(err)}`);
        });
    });
};

exports.buylimit = (apikey, secret, marketName, quantity, rate) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/buylimit', `apikey=${apikey}&market=${marketName}&quantity=${quantity}&rate=${rate}`, 'v1.1', secret).then(order => {
            resolve(order);
        }).catch(err => {
            reject(`exports.buylimit err: ${util.inspect(err)}`);
        });
    });
};

exports.selllimit = (apikey, secret, marketName, quantity, rate) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/selllimit', `apikey=${apikey}&market=${marketName}&quantity=${quantity}&rate=${rate}`, 'v1.1', secret).then(order => {
            resolve(order);
        }).catch(err => {
            reject(`exports.selllimit err: ${util.inspect(err)}`);
        });
    });
};

exports.cancel = (apikey, secret, uuid) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/cancel', `apikey=${apikey}&uuid=${uuid}`, 'v1.1', secret).then(confirmation => {
            resolve(confirmation);
        }).catch(err => {
            reject(`exports.cancel err: ${util.inspect(err)}`);
        });
    });
};

exports.getopenorders = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/getopenorders', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(orders => {
            resolve(orders);
        }).catch(err => {
            reject(`exports.getopenorders err: ${util.inspect(err)}`);
        });
    });
};