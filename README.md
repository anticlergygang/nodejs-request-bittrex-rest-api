https://bittrex.com/home/api

    const bittrex = require('nodejs-request-bittrex-rest-api');
    bittrex.getmarkets().then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getcurrencies().then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getmarketsummaries().then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getticker(market).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getmarketsummary(market).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getmarkethistory(market).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getorderbook(market, type).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getbalances(apikey, secret).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getbalance(apikey, secret, currency).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getdepositaddress(apikey, secret, currency).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.withdraw(apikey, secret, currency, quantity, address).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getorder(apikey, secret, uuid).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getorderhistory(apikey, secret, market).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getwithdrawalhistory(apikey, secret, market).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getdeposithistory(apikey, secret, market).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.buylimit(apikey, secret, market, quantity, rate).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.selllimit(apikey, secret, market, quantity, rate).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.cancel(apikey, secret, uuid).then(out => {
        console.log(out);
    }).catch(err => {});
    bittrex.getopenorders(apikey, secret, market).then(out => {
        console.log(out);
    }).catch(err => {});