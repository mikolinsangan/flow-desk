import { OrderBook } from "../models/order-book.js";

export interface OrderBookService {
    getOrderBook(): Promise<OrderBook>;
}