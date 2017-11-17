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
            resolve({ ticks: ticks, marketName: marketName, tickInterval: tickInterval });
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getmarketrsiindicator = (marketName, tickInterval, period) => {
    return new Promise((resolve, reject) => {
        let rsiLine = [];
        let averageGain = 0;
        let averageLoss = 0;
        bittrexRequest('pub/market/GetTicks', `marketName=${marketName}&tickInterval=${tickInterval}`, 'v2.0').then(ticks => {
            ticks.forEach((tick, tickIndex) => {
                if (tickIndex !== 0) {
                    if (tickIndex < period) {
                        if (tick.C - ticks[tickIndex - 1].C > 0) {
                            averageGain = averageGain + (tick.C - ticks[tickIndex - 1].C);
                        } else if (tick.C - ticks[tickIndex - 1].C < 0) {
                            averageLoss = averageLoss + ((tick.C - ticks[tickIndex - 1].C) * -1);
                        } else {}
                    } else if (tickIndex === period) {
                        if (tick.C - ticks[tickIndex - 1].C > 0) {
                            averageGain = averageGain + (tick.C - ticks[tickIndex - 1].C);
                        } else if (tick.C - ticks[tickIndex - 1].C < 0) {
                            averageLoss = averageLoss + ((tick.C - ticks[tickIndex - 1].C) * -1);
                        } else {}
                        rsiLine.push({ y: (100 - (100 / (1 + (averageGain / period) / (averageLoss / period)))) });
                    } else {
                        if (tick.C - ticks[tickIndex - 1].C > 0) {
                            averageGain = ((averageGain * (period - 1)) + (tick.C - ticks[tickIndex - 1].C)) / period;
                            averageLoss = ((averageLoss * (period - 1)) + 0) / period;
                        } else if (tick.C - ticks[tickIndex - 1].C < 0) {
                            averageGain = ((averageGain * (period - 1)) + 0) / period;
                            averageLoss = ((averageLoss * (period - 1)) + ((tick.C - ticks[tickIndex - 1].C) * -1)) / period;
                        }
                        rsiLine.push({ y: (100 - (100 / (1 + (averageGain / period) / (averageLoss / period)))) });
                    }
                    if (tickIndex === ticks.length - 1) {
                        resolve({ marketName: marketName, rsiLine: rsiLine, tickInterval: tickInterval, period: period });
                    }
                } else {}
            });
        }).catch(err => {
            reject(err);
        });
    });
};

exports.getmarketmacdindicator = (marketName, tickInterval, fastMovingAveragePeriod, slowMovingAveragePeriod, signalMovingAveragePeriod) => {
    return new Promise((resolve, reject) => {
        let closeFastMovingAverage = 0;
        let closeSlowMovingAverage = 0;
        let signalMovingAverage = 0;
        let macdLine = [];
        let closeFastMovingAverageLine = [];
        let closeSlowMovingAverageLine = [];
        let signalMovingAverageLine = [];
        bittrexRequest('pub/market/GetTicks', `marketName=${marketName}&tickInterval=${tickInterval}`, 'v2.0').then(ticks => {
            ticks.forEach((tick, tickIndex) => {
                if (tickIndex !== 0) {
                    if (tickIndex < fastMovingAveragePeriod) {
                        closeFastMovingAverage = closeFastMovingAverage + tick.C;
                    } else if (tickIndex === fastMovingAveragePeriod) {
                        closeFastMovingAverage = closeFastMovingAverage + tick.C;
                        closeFastMovingAverageLine.push({ y: closeFastMovingAverage / fastMovingAveragePeriod });
                    } else if (tickIndex > fastMovingAveragePeriod) {
                        closeFastMovingAverage = ((closeFastMovingAverage / fastMovingAveragePeriod) * (fastMovingAveragePeriod - 1)) + tick.C;
                        closeFastMovingAverageLine.push({ y: closeFastMovingAverage / fastMovingAveragePeriod });
                    }
                    if (tickIndex < slowMovingAveragePeriod) {
                        closeSlowMovingAverage = closeSlowMovingAverage + tick.C;
                    } else if (tickIndex === slowMovingAveragePeriod) {
                        closeSlowMovingAverage = closeSlowMovingAverage + tick.C;
                        closeSlowMovingAverageLine.push({ y: closeSlowMovingAverage / slowMovingAveragePeriod });
                        macdLine.push({ y: ((closeFastMovingAverage / fastMovingAveragePeriod) - (closeSlowMovingAverage / slowMovingAveragePeriod)) });
                    } else if (tickIndex > slowMovingAveragePeriod) {
                        closeSlowMovingAverage = ((closeSlowMovingAverage / slowMovingAveragePeriod) * (slowMovingAveragePeriod - 1)) + tick.C;
                        closeSlowMovingAverageLine.push({ y: closeSlowMovingAverage / slowMovingAveragePeriod });
                        macdLine.push({ y: ((closeFastMovingAverage / fastMovingAveragePeriod) - (closeSlowMovingAverage / slowMovingAveragePeriod)) });
                        if (macdLine.length < signalMovingAveragePeriod) {
                            signalMovingAverage = signalMovingAverage + macdLine[macdLine.length - 1].y;
                        } else if (macdLine.length === signalMovingAveragePeriod) {
                            signalMovingAverage = signalMovingAverage + macdLine[macdLine.length - 1].y;
                            signalMovingAverageLine.push({ y: signalMovingAverage / signalMovingAveragePeriod });
                        } else if (macdLine.length > signalMovingAveragePeriod) {
                            signalMovingAverage = (((signalMovingAverage / signalMovingAveragePeriod) * (signalMovingAveragePeriod - 1)) + macdLine[macdLine.length - 1].y);
                            signalMovingAverageLine.push({ y: signalMovingAverage / signalMovingAveragePeriod });
                        }
                    }
                } else {}
            });
            resolve({ marketName: marketName, signalMovingAverageLine: signalMovingAverageLine, macdLine: macdLine, fastMovingAveragePeriod: fastMovingAveragePeriod, slowMovingAveragePeriod: slowMovingAveragePeriod, signalMovingAveragePeriod: signalMovingAveragePeriod });
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