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
        bittrexRequest('public/getmarketsummary', `market=${marketName}`, 'v1.1', '').then(marketsummarie => {
            resolve(marketsummarie);
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
            resolve({ ticks: ticks, marketName: marketName, tickInterval: tickInterval });
        }).catch(err => {
            reject(`exports.getticks err: ${util.inspect(err)}`);
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
                        rsiLine.push({ x: tick.T, y: (100 - (100 / (1 + (averageGain / period) / (averageLoss / period)))) });
                    } else {
                        if (tick.C - ticks[tickIndex - 1].C > 0) {
                            averageGain = ((averageGain * (period - 1)) + (tick.C - ticks[tickIndex - 1].C)) / period;
                            averageLoss = ((averageLoss * (period - 1)) + 0) / period;
                        } else if (tick.C - ticks[tickIndex - 1].C < 0) {
                            averageGain = ((averageGain * (period - 1)) + 0) / period;
                            averageLoss = ((averageLoss * (period - 1)) + ((tick.C - ticks[tickIndex - 1].C) * -1)) / period;
                        }
                        rsiLine.push({ x: tick.T, y: (100 - (100 / (1 + (averageGain / period) / (averageLoss / period)))) });
                    }
                    if (tickIndex === ticks.length - 1) {
                        resolve({ marketName: marketName, rsiLine: rsiLine, tickInterval: tickInterval, period: period });
                    }
                } else {}
            });
        }).catch(err => {
            reject(`exports.getmarketrsiindicator err: ${util.inspect(err)}`);
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
                        closeFastMovingAverageLine.push({ y: closeFastMovingAverage / fastMovingAveragePeriod, x: tick.T });
                    } else if (tickIndex > fastMovingAveragePeriod) {
                        closeFastMovingAverage = ((closeFastMovingAverage / fastMovingAveragePeriod) * (fastMovingAveragePeriod - 1)) + tick.C;
                        closeFastMovingAverageLine.push({ y: closeFastMovingAverage / fastMovingAveragePeriod, x: tick.T });
                    }
                    if (tickIndex < slowMovingAveragePeriod) {
                        closeSlowMovingAverage = closeSlowMovingAverage + tick.C;
                    } else if (tickIndex === slowMovingAveragePeriod) {
                        closeSlowMovingAverage = closeSlowMovingAverage + tick.C;
                        closeSlowMovingAverageLine.push({ y: closeSlowMovingAverage / slowMovingAveragePeriod, x: tick.T });
                        macdLine.push({ y: ((closeFastMovingAverage / fastMovingAveragePeriod) - (closeSlowMovingAverage / slowMovingAveragePeriod)), x: tick.T });
                    } else if (tickIndex > slowMovingAveragePeriod) {
                        closeSlowMovingAverage = ((closeSlowMovingAverage / slowMovingAveragePeriod) * (slowMovingAveragePeriod - 1)) + tick.C;
                        closeSlowMovingAverageLine.push({ y: closeSlowMovingAverage / slowMovingAveragePeriod, x: tick.T });
                        macdLine.push({ y: ((closeFastMovingAverage / fastMovingAveragePeriod) - (closeSlowMovingAverage / slowMovingAveragePeriod)), x: tick.T });
                        if (macdLine.length < signalMovingAveragePeriod) {
                            signalMovingAverage = signalMovingAverage + macdLine[macdLine.length - 1].y;
                        } else if (macdLine.length === signalMovingAveragePeriod) {
                            signalMovingAverage = signalMovingAverage + macdLine[macdLine.length - 1].y;
                            signalMovingAverageLine.push({ y: signalMovingAverage / signalMovingAveragePeriod, x: tick.T });
                        } else if (macdLine.length > signalMovingAveragePeriod) {
                            signalMovingAverage = (((signalMovingAverage / signalMovingAveragePeriod) * (signalMovingAveragePeriod - 1)) + macdLine[macdLine.length - 1].y);
                            signalMovingAverageLine.push({ y: signalMovingAverage / signalMovingAveragePeriod, x: tick.T });
                        }
                    }
                } else {}
            });
            resolve({ marketName: marketName, signalMovingAverageLine: signalMovingAverageLine, macdLine: macdLine, fastMovingAveragePeriod: fastMovingAveragePeriod, slowMovingAveragePeriod: slowMovingAveragePeriod, signalMovingAveragePeriod: signalMovingAveragePeriod });
        }).catch(err => {
            reject(`exports.getmarketmacdindicator err: ${util.inspect(err)}`);
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