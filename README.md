Enjoy!

Find a dev: https://discord.gg/RRHvYUe

Get your apikey and sceret from: https://bittrex.com/home/api

```js
const bittrex = require('nodejs-request-bittrex-rest-api');

bittrex.getmarkets().then(markets => {
    console.log(markets);
}).catch(err => {
    console.log(err);
});

bittrex.getcurrencies().then(currencies => {
    console.log(currencies);
}).catch(err => {
    console.log(err);
});

bittrex.getmarketsummaries().then(marketsummaries => {
    console.log(marketsummaries);
}).catch(err => {
    console.log(err);
});

bittrex.getticker(marketName).then(ticker => {
    console.log(ticker);
}).catch(err => {
    console.log(err);
});

bittrex.getmarketsummary(marketName).then(marketsummary => {
    console.log(marketsummary);
}).catch(err => {
    console.log(err);
});

bittrex.getmarkethistory(marketName).then(markethistory => {
    console.log(markethistory);
}).catch(err => {
    console.log(err);
});

bittrex.getorderbook(marketName, type).then(orderbook => {
    console.log(orderbook);
}).catch(err => {
    console.log(err);
});

bittrex.getticks(marketName, tickInterval).then(ticks => {
    console.log(ticks);
}).catch(err => {
    console.log(err);
});

bittrex.getbalances(apikey, secret).then(balances => {
    console.log(balances);
}).catch(err => {
    console.log(err);
});

bittrex.getbalance(apikey, secret, currency).then(balance => {
    console.log(balance);
}).catch(err => {
    console.log(err);
});

bittrex.getdepositaddress(apikey, secret, currency).then(depositaddress => {
    console.log(depositaddress);
}).catch(err => {
    console.log(err);
});

bittrex.withdraw(apikey, secret, currency, quantity, address).then(tx => {
    console.log(tx);
}).catch(err => {
    console.log(err);
});

bittrex.getorder(apikey, secret, uuid).then(order => {
    console.log(order);
}).catch(err => {
    console.log(err);
});

bittrex.getorderhistory(apikey, secret, marketName).then(orderhistory => {
    console.log(orderhistory);
}).catch(err => {
    console.log(err);
});

bittrex.getwithdrawalhistory(apikey, secret, marketName).then(withdrawalhistory => {
    console.log(withdrawalhistory);
}).catch(err => {
    console.log(err);
});

bittrex.getdeposithistory(apikey, secret, marketName).then(deposithistory => {
    console.log(deposithistory);
}).catch(err => {
    console.log(err);
});

bittrex.buylimit(apikey, secret, marketName, quantity, rate).then(tx => {
    console.log(tx);
}).catch(err => {
    console.log(err);
});

bittrex.selllimit(apikey, secret, marketName, quantity, rate).then(tx => {
    console.log(tx);
}).catch(err => {
    console.log(err);
});

bittrex.cancel(apikey, secret, uuid).then(tx => {
    console.log(tx);
}).catch(err => {
    console.log(err);
});

bittrex.getopenorders(apikey, secret, marketName).then(orders => {
    console.log(orders);
}).catch(err => {
    console.log(err);
});
```