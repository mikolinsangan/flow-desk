import WebSocket from 'ws';
import zlib from 'zlib';
import { OrderBookService } from "./order-book.service.js";
import { OrderBook } from "../models/order-book.js";

export class HuobiOrderBookService implements OrderBookService {


    private url = 'wss://api.huobi.pro/ws';
    private ws: WebSocket;
    private orderBook:OrderBook | null = null;
    constructor() {
        this.ws = new WebSocket(this.url);
        this.connectWebSocket();
        
          
    }

    connectWebSocket() {
        this.ws.on('open', () => {
            const symbol = 'btcusdt'; 
            const subscriptionMessage = JSON.stringify({
              "sub": `market.${symbol}.depth.step0`,
              "id": 'flowdesk_test_123'
            });
          
            this.ws.send(subscriptionMessage);
          });
          this.ws.on('message', (data: Buffer) => {
            zlib.gunzip(data, (error, uncompressedData) => {
              if (error) {
                console.error('Error decompressing data:', error);
                return;
              }
        
              const uncString = uncompressedData.toString();
              const message = JSON.parse(uncString);
              if (message && message.tick) {

                this.orderBook = this.mapToOrderBook(message.tick);
              }
            });
          });

          this.ws.on('close', (code, reason) => {
            setTimeout(this.connectWebSocket, 5000);
          });
        
          this.ws.on('error', (error) => {
            setTimeout(this.connectWebSocket, 5000);
          });

    }

    mapToOrderBook(result:any) {
        const buys = result.bids.map((x:any[]) => ({ price: x[0], quantity: x[1] }));
        const asks = result.asks.map((x:any[]) => ({ price: x[0], quantity: x[1] }));
        const orderBook = new OrderBook('huobi', buys, asks);
        return orderBook;
    }

    getOrderBook(): Promise<OrderBook> {
       return new Promise((resolve, reject) => {
            if(this.orderBook)
            resolve(this.orderBook)
          });
    }

}
