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
        bittrexRequest('pub/market/GetTicks', `marketName=${marketName}&tickInterval=${tickInterval}`, 'v2.0').then(ticks => {
            resolve(ticks);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getmarketrsi = (marketName, tickInterval, period) => {
    return new Promise((resolve, reject) => {
        let averageGain = 0;
        let averageLoss = 0;
        bittrexRequest('pub/market/GetTicks', `marketName=${marketName}&tickInterval=${tickInterval}`, 'v2.0').then(ticks => {
            ticks.forEach((tick, tickIndex) => {
                if (tickIndex !== 0) {
                    if (tickIndex < period) {
                        if (ticks[tickIndex].C - ticks[tickIndex - 1].C > 0) {
                            averageGain = averageGain + (ticks[tickIndex].C - ticks[tickIndex - 1].C);
                            // console.log(`\ntickIndex: ${tickIndex}\nclose: ${tick.C}\nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C}\nadva: ${ticks[tickIndex].C - ticks[tickIndex - 1].C} \ndecl: 0\naverageGain: ${averageGain}\naverageLoss: ${averageLoss}`);
                        } else if (ticks[tickIndex].C - ticks[tickIndex - 1].C < 0) {
                            averageLoss = averageLoss + ((ticks[tickIndex].C - ticks[tickIndex - 1].C) * -1);
                            // console.log(`\ntickIndex: ${tickIndex} \nclose: ${tick.C} \nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C} \nadva: 0 \ndecl: ${(ticks[tickIndex].C - ticks[tickIndex - 1].C) * -1} \naverageGain: ${averageGain} \naverageLoss: ${averageLoss}`);
                        } else {
                            // console.log(`\ntickIndex: ${tickIndex} \nclose: ${tick.C} \nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C} \nadva: 0 \ndecl: 0 \naverageGain: ${averageGain} \naverageLoss: ${averageLoss}`);
                        }
                    } else if (tickIndex === period) {
                        if (ticks[tickIndex].C - ticks[tickIndex - 1].C > 0) {
                            averageGain = averageGain + (ticks[tickIndex].C - ticks[tickIndex - 1].C);
                            // console.log(`\ntickIndex: ${tickIndex}\nclose: ${tick.C}\nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C}\nadva: ${ticks[tickIndex].C - ticks[tickIndex - 1].C}\ndecl: 0\naverageGain: ${averageGain}\naverageLoss: ${averageLoss}\nrs: ${(averageGain/period)/(averageLoss/period)}\nrsi: ${100 - (100/(1+(averageGain/period)/(averageLoss/period)))}`);
                        } else if (ticks[tickIndex].C - ticks[tickIndex - 1].C < 0) {
                            averageLoss = averageLoss + ((ticks[tickIndex].C - ticks[tickIndex - 1].C) * -1);
                            // console.log(`\ntickIndex: ${tickIndex} \nclose: ${tick.C} \nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C} \nadva: 0 \ndecl: ${(ticks[tickIndex].C - ticks[tickIndex - 1].C) * -1} \naverageGain: ${averageGain} \naverageLoss: ${averageLoss}\nrs: ${(averageGain/period)/(averageLoss/period)}\nrsi: ${100 - (100/(1+(averageGain/period)/(averageLoss/period)))}`);
                        } else {
                            // console.log(`\ntickIndex: ${tickIndex} \nclose: ${tick.C} \nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C} \nadva: 0 \ndecl: 0 \naverageGain: ${averageGain} \naverageLoss: ${averageLoss}\nrs: ${(averageGain/period)/(averageLoss/period)}\nrsi: ${100 - (100/(1+(averageGain/period)/(averageLoss/period)))}`);
                        }
                    } else {
                        if (ticks[tickIndex].C - ticks[tickIndex - 1].C > 0) {
                            averageGain = ((averageGain * (period - 1)) + (ticks[tickIndex].C - ticks[tickIndex - 1].C)) / period;
                            averageLoss = ((averageLoss * (period - 1)) + 0) / period;
                            // console.log(`\ntickIndex: ${tickIndex} \nclose: ${tick.C} \nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C} \nadva: 0 \ndecl: 0 \naverageGain: ${averageGain} \naverageLoss: ${averageLoss}\nrs: ${(averageGain/period)/(averageLoss/period)}\nrsi: ${100 - (100/(1+(averageGain/period)/(averageLoss/period)))}`);
                        } else if (ticks[tickIndex].C - ticks[tickIndex - 1].C < 0) {
                            averageGain = ((averageGain * (period - 1)) + 0) / period;
                            averageLoss = ((averageLoss * (period - 1)) + ((ticks[tickIndex].C - ticks[tickIndex - 1].C) * -1)) / period;
                            // console.log(`\ntickIndex: ${tickIndex} \nclose: ${tick.C} \nchange: ${ticks[tickIndex].C - ticks[tickIndex - 1].C} \nadva: 0 \ndecl: 0 \naverageGain: ${averageGain} \naverageLoss: ${averageLoss}\nrs: ${(averageGain/period)/(averageLoss/period)}\nrsi: ${100 - (100/(1+(averageGain/period)/(averageLoss/period)))}`);
                        }
                    }
                    if (tickIndex === ticks.length - 1) {
                        resolve(100 - (100 / (1 + (averageGain / period) / (averageLoss / period))));
                    }
                } else {
                    // console.log(`\ntickIndex: ${tickIndex}\nclose: ${tick.C}`);
                }
            });
        }).catch(err => {
            reject(err);
        });
    });
};

// Warning, this any2any method is experimental.
// Using USDT in its regular markets works fine.
// USDT-ANY will be added soon.
// This promise may resolve with an unexpected expected result.
// If it gets the rate wrong, it may result in bad trade.
// Just don't use this unless you know whats going to happen.
exports.any2any = (apikey, secret, currencyFrom, currencyTo, quantity) => {
    return new Promise((resolve, reject) => {
        let activeMarkets = {};
        let currencyFromBases = [];
        let currencyToBases = [];
        let currencyFromMarkets = [];
        let currencyToMarkets = [];
        let currenciesShareABaseCurrency = false;
        let sharedBaseCurrency = '';
        bittrexRequest('public/getmarketsummaries', '', 'v1.1', '').then(markets => {
            markets.forEach((market, marketIndex) => {
                activeMarkets[market.MarketName] = market;
            });
            Object.keys(activeMarkets).forEach((activeMarketName, activeMarketNameIndex) => {
                if (activeMarketName.split('-')[1] === currencyFrom) {
                    currencyFromBases.push(activeMarketName.split('-')[0]);
                }
                if (activeMarketName.split('-')[1] === currencyTo) {
                    currencyToBases.push(activeMarketName.split('-')[0]);
                }
                if (activeMarketName.split('-')[0] === currencyFrom) {
                    currencyFromMarkets.push(activeMarketName.split('-')[1]);
                }
                if (activeMarketName.split('-')[0] === currencyTo) {
                    currencyToMarkets.push(activeMarketName.split('-')[1]);
                }
            });
            currencyFromBases.forEach((currencyFromBase, currencyFromBaseIndex) => {
                currencyToBases.forEach((currencyToBase, currencyToBaseIndex) => {
                    if (currencyFromBase === currencyToBase) {
                        currenciesShareABaseCurrency = true;
                        sharedBaseCurrency = currencyToBase;
                    }
                });
            });
            if (Object.keys(activeMarkets).indexOf(`${currencyFrom}-${currencyTo}`) !== -1) {
                var marketName = `${currencyFrom}-${currencyTo}`;
                return bittrexRequest('market/buylimit', `apikey=${apikey}&market=${marketName}&quantity=${quantity / activeMarkets[marketName].Ask}&rate=${activeMarkets[marketName].Ask}`, 'v1.1', secret);
            } else if (Object.keys(activeMarkets).indexOf(`${currencyTo}-${currencyFrom}`) !== -1) {
                var marketName = `${currencyTo}-${currencyFrom}`;
                return bittrexRequest('market/selllimit', `apikey=${apikey}&market=${marketName}&quantity=${quantity}&rate=${activeMarkets[marketName].Bid}`, 'v1.1', secret);
            } else if (currenciesShareABaseCurrency) {
                return new Promise((resolve, reject) => {
                    var marketName1 = `${sharedBaseCurrency}-${currencyFrom}`;
                    var marketName2 = `${sharedBaseCurrency}-${currencyTo}`;
                    bittrexRequest('market/selllimit', `apikey=${apikey}&market=${marketName1}&quantity=${quantity}&rate=${activeMarkets[marketName1].Bid}`, 'v1.1', secret).then(sellUuid => {
                        const checkIfSellCloseInterval = setInterval(() => {
                            bittrexRequest('account/getorder', `apikey=${apikey}&uuid=${sellUuid.uuid}`, 'v1.1', secret).then(sellOrder => {
                                if (!sellOrder.IsOpen) {
                                    clearInterval(checkIfSellCloseInterval);
                                    bittrexRequest('market/buylimit', `apikey=${apikey}&market=${marketName2}&quantity=${((sellOrder.Price - sellOrder.CommissionPaid)-sellOrder.CommissionPaid) / activeMarkets[marketName2].Ask}&rate=${activeMarkets[marketName2].Ask}`, 'v1.1', secret).then(buyUuid => {
                                        const checkIfBuyCloseInterval = setInterval(() => {
                                            bittrexRequest('account/getorder', `apikey=${apikey}&uuid=${buyUuid.uuid}`, 'v1.1', secret).then(buyOrder => {
                                                if (!buyOrder.IsOpen) {
                                                    clearInterval(checkIfBuyCloseInterval);
                                                    resolve('currency converted');
                                                }
                                            }).catch(err => {
                                                clearInterval(checkIfBuyCloseInterval);
                                                reject(err);
                                            });
                                        }, 2000);
                                    }).catch(err => {
                                        clearInterval(checkIfSellCloseInterval);
                                        reject(err);
                                    });
                                }
                            }).catch(err => {
                                reject(err);
                            });
                        }, 2000);
                    }).catch(err => {
                        reject(err);
                    });
                });
            } else {
                return Promise.resolve('fawkenll');
            }
        }).then(out => {
            resolve(out);
        }).catch(err => {
            reject(err);
        });
    });
};