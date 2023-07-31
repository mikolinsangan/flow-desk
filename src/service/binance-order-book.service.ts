import { OrderBook } from "../models/order-book.js";
import { OrderBookHTTPService } from "./order-book-http.serivce.js";

export class BinanceOrderBookService extends OrderBookHTTPService {
    private symbol = 'BTCUSDT';
    private limit = 100;
    private url = `https://api.binance.com/api/v3/depth?symbol=${this.symbol}&limit=${this.limit}`;

    getOrderBookURL(): string {
        return this.url;
    }
    mapToOrderBook(result: any): OrderBook {
        const buys = result.bids.map((x: any[]) => ({ price: x[0], quantity: x[1] }))
        const asks = result.asks.map((x: any[]) => ({ price: x[0], quantity: x[1] }))
        const orderBook = new OrderBook(
            'binance',
            buys,
            asks
        );
        return orderBook;
    }



}