import { OrderBook } from "../models/order-book.js";
import fetch from 'node-fetch';
import { OrderBookService } from "./order-book.service.js";

export abstract class OrderBookHTTPService implements OrderBookService {
    abstract getOrderBookURL(): string;
    abstract mapToOrderBook(result: any): OrderBook;

    async getOrderBook(): Promise<OrderBook> {
        const result =  await fetch(this.getOrderBookURL());
        const json = await result.json();
        return this.mapToOrderBook(json);
            
    }


}