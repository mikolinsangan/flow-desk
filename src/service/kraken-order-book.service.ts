import { OrderBook } from "../models/order-book.js";
import { OrderBookHTTPService } from "./order-book-http.serivce.js";

export class KrakenOrderBookService extends OrderBookHTTPService {
    private symbol = 'XBTUSDT';
    private limit = 100;
    private url = `https://api.kraken.com/0/public/Depth?pair=${this.symbol}&count=${this.limit}`;

    getOrderBookURL(): string {
        return this.url;
    }
    mapToOrderBook(result: any): OrderBook {
        result = result.result.XBTUSDT;
        const buys = result.bids.map((x: any[]) => ({ price: x[0], quantity: x[1] }))
        const asks = result.asks.map((x: any[]) => ({ price: x[0], quantity: x[1] }))
        const orderBook = new OrderBook(
            'kraken',
            buys,
            asks
        );
        return orderBook;
    }



}