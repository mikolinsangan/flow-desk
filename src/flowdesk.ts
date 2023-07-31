import express from 'express';
import {OrderBookController} from './controller/order-book.controller.js';
import { HuobiOrderBookService } from './service/huobi-order-book.service.js';
import { BinanceOrderBookService } from './service/binance-order-book.service.js';
import { KrakenOrderBookService } from './service/kraken-order-book.service.js';

const app = express();
const orderBookController = new OrderBookController([new BinanceOrderBookService(), new KrakenOrderBookService(), new HuobiOrderBookService()])
app.get('/', function (req, res) {
    res.send('Hello World');
 });
app.get('/order-book/get-ave-mid-price', function (req, res) {
   orderBookController.getAverageMidPrice(req, res)
})

const server:any = app.listen(8081, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Flowdesk app listening at http://%s:%s", host, port)
})