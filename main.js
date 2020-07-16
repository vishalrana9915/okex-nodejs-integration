require("dotenv").config();
const { AuthenticatedClient } = require("@okfe/okex-node");
const { PublicClient } = require("@okfe/okex-node");
const pClient = new PublicClient();
const authClient = new AuthenticatedClient(
  process.env.okex_apiKey,
  process.env.okex_secret,
  process.env.okex_passphrase
);

//fetch currency specifc balance
function getCurrencyBalance(coinName) {
  return new Promise((resolve, reject) => {
    authClient
      .spot()
      .getAccounts(coinName)
      .then(result => {
        console.log({ result });
        resolve(result);
      })
      .catch(err => {
        console.log({ err });
        reject(err);
      });
  });
}

//fetching leader info
function getLedger(coinName) {
  return new Promise((resolve, reject) => {
    authClient
      .spot()
      .getLedger(coinName)
      .then(result => {
        console.log({ result });
        resolve(result);
      })
      .catch(err => {
        console.log({ err });
        reject(err);
      });
  });
}

function getSpotBook(instrument_id, params = {}) {
  return new Promise((resolve, reject) => {
    pClient
      .spot()
      .getSpotTicker(instrument_id)
      .then(result => {
        console.log({ result });
        resolve(result);
      })
      .catch(err => {
        console.log({ err });
        reject(err);
      });
  });
}

//creating new order
function createNewOrder(
  side = "sell",
  instrument_id = "ETH-USDT",
  order_type = 0,
  price,
  size
) {
  return new Promise((resolve, reject) => {
    authClient
      .spot()
      .postOrder({
        side,
        instrument_id,
        order_type,
        price,
        size
      })
      .then(result => {
        console.log({ result });
        resolve(result);
      })
      .catch(err => {
        console.log({ err });
        reject(err);
      });
  });
}

//get order details
function getOrderDetails(instrument_id, order_id) {
  return new Promise((resolve, reject) => {
    authClient
      .spot()
      .getOrder(order_id, { instrument_id })
      .then(result => {
        console.log({ result });
        resolve(result);
      })
      .catch(err => {
        console.log({ err });
        reject(err);
      });
  });
}

//get order details
function cancelOrder(instrument_id, order_id) {
  return new Promise((resolve, reject) => {
    authClient
      .spot()
      .postCancelOrder(order_id, { instrument_id })
      .then(result => {
        console.log({ result });
        resolve(result);
      })
      .catch(err => {
        console.log({ err });
        reject(err);
      });
  });
}

// getCurrencyBalance("ETH"); //BTC, USDT, ETH
// getLedger('BTC')
// getSpotBook("ETH-USDT"); // {bid: string, ask: string}
// createNewOrder("sell", "ETH-USDT", 0, 300, 0.5); //{code: '0',order_id: 'string',result: true,error_code: '0'}
// getOrderDetails("ETH-USDT", "5254744475717632"); //{state: '0',status: 'open'} // filled = {state='2'}
// cancelOrder("ETH-USDT", "5254744475717632");//{code: '0',order_id: 'string',result: true,error_code: '0'}
