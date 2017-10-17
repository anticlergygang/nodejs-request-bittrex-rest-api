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

exports.getmarkets = () => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarkets', '', 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getcurrencies = () => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getcurrencies', '', 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });

};

exports.getmarketsummaries = () => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarketsummaries', '', 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getticker = (market) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getticker', `market=${market}`, 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getmarketsummary = (market) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarketsummary', `market=${market}`, 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getmarkethistory = (market) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarkethistory', `market=${market}`, 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getorderbook = (market, type) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getorderbook', `market=${market}&type=${type}`, 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getbalances = (apikey, secret) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getbalances', `apikey=${apikey}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getbalance = (apikey, secret, currency) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getbalance', `apikey=${apikey}&currency=${currency}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getdepositaddress = (apikey, secret, currency) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getdepositaddress', `apikey=${apikey}&currency=${currency}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.withdraw = (apikey, secret, currency, quantity, address) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/withdraw', `apikey=${apikey}&currency=${currency}&quantity=${currency}&address=${address}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getorder = (apikey, secret, uuid) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getorder', `apikey=${apikey}&uuid=${uuid}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getorderhistory = (apikey, secret, market) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getorderhistory', `apikey=${apikey}&market=${market}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getwithdrawalhistory = (apikey, secret, market) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getwithdrawalhistory', `apikey=${apikey}&market=${market}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getdeposithistory = (apikey, secret, market) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getdeposithistory', `apikey=${apikey}&market=${market}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.buylimit = (apikey, secret, market, quantity, rate) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/buylimit', `apikey=${apikey}&market=${market}&quantity=${quantity}&rate=${rate}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.selllimit = (apikey, secret, market, quantity, rate) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/selllimit', `apikey=${apikey}&market=${market}&quantity=${quantity}&rate=${rate}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.cancel = (apikey, secret, uuid) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/cancel', `apikey=${apikey}&uuid=${uuid}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getopenorders = (apikey, secret, market) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/getopenorders', `apikey=${apikey}&market=${market}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};