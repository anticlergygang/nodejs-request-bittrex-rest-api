const https = require('https');
const crypto = require('crypto');
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
                    let jsonRes = JSON.parse(data)
                    if (jsonRes.success) {
                        resolve(jsonRes.result);
                    } else {
                        reject(jsonRes.message);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        req.end();
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

exports.getticker = (marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getticker', `market=${marketName}`, 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getmarketsummary = (marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarketsummary', `market=${marketName}`, 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getmarkethistory = (marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getmarkethistory', `market=${marketName}`, 'v1.1', '').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getorderbook = (marketName, type) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('public/getorderbook', `market=${marketName}&type=${type}`, 'v1.1', '').then(out => {
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

exports.getorderhistory = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getorderhistory', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getwithdrawalhistory = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getwithdrawalhistory', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getdeposithistory = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('account/getdeposithistory', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.buylimit = (apikey, secret, marketName, quantity, rate) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/buylimit', `apikey=${apikey}&market=${marketName}&quantity=${quantity}&rate=${rate}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.selllimit = (apikey, secret, marketName, quantity, rate) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/selllimit', `apikey=${apikey}&market=${marketName}&quantity=${quantity}&rate=${rate}`, 'v1.1', secret).then(out => {
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

exports.getopenorders = (apikey, secret, marketName) => {
    return new Promise((resolve, reject) => {
        bittrexRequest('market/getopenorders', `apikey=${apikey}&market=${marketName}`, 'v1.1', secret).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getticks = (marketName, tickInterval = 'fiveMin') => {
    return new Promise((resolve, reject) => {
        bittrexRequest('pub/market/GetTicks', `marketName=${marketName}&tickInterval=${tickInterval}`, 'v2.0').then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};

// Warning, this any2any method is experimental.
// This is more so BTC-ANY to BTC-ANY than it is any2any.
// This promise may resolve with an unexpected expected result.
// If it gets the rate wrong, it may result in bad trade.
// Just don't use this unless you know whats going to happen.
exports.any2any = (apikey, secret, currencyFrom, currencyTo, fromQuantity) => {
    return new Promise((resolve, reject) => {
        Promise.all([bittrexRequest('account/getbalance', `apikey=${apikey}&currency=${currencyFrom}`, 'v1.1', secret), bittrexRequest('account/getbalance', `apikey=${apikey}&currency=${currencyTo}`, 'v1.1', secret), bittrexRequest('public/getticker', `market=BTC-${currencyFrom}`, 'v1.1', ''), bittrexRequest('public/getticker', `market=BTC-${currencyTo}`, 'v1.1', '')]).then(fromCurr0toCurr1fromBid2toAsk3 => {
            if (fromQuantity <= fromCurr0toCurr1fromBid2toAsk3[0].Balance) {
                bittrexRequest('market/selllimit', `apikey=${apikey}&market=BTC-${fromCurr0toCurr1fromBid2toAsk3[0].Currency}&quantity=${fromQuantity}&rate=${fromCurr0toCurr1fromBid2toAsk3[2].Bid}`, 'v1.1', secret).then(sellOrder => {
                    let checkIfSellClosed = setInterval(() => {
                        bittrexRequest('account/getorder', `apikey=${apikey}&uuid=${sellOrder.uuid}`, 'v1.1', secret).then(sellOrderInfo => {
                            if (!sellOrderInfo.IsOpen) {
                                clearInterval(checkIfSellClosed);
                                setTimeout(() => {
                                    bittrexRequest('market/buylimit', `apikey=${apikey}&market=BTC-${fromCurr0toCurr1fromBid2toAsk3[1].Currency}&quantity=${(((sellOrderInfo.Price - sellOrderInfo.CommissionPaid)-sellOrderInfo.CommissionPaid)/(fromCurr0toCurr1fromBid2toAsk3[3].Ask))}&rate=${fromCurr0toCurr1fromBid2toAsk3[3].Ask}`, 'v1.1', secret).then(buyOrder => {
                                        let checkIfBuyClosed = setInterval(() => {
                                            bittrexRequest('account/getorder', `apikey=${apikey}&uuid=${buyOrder.uuid}`, 'v1.1', secret).then(buyOrderInfo => {
                                                if (!buyOrderInfo.IsOpen) {
                                                    clearInterval(checkIfBuyClosed);
                                                    resolve(buyOrderInfo);
                                                }
                                            }).catch(err => {
                                                clearInterval(checkIfBuyClosed);
                                                reject(err);
                                            });
                                        }, 2000);
                                    }).catch(err => {
                                        reject(err);
                                    });
                                }, 5000);
                            }
                        }).catch(err => {
                            clearInterval(checkIfSellClosed);
                            reject(err);
                        });
                    }, 2000);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(err);
        });
    });
};