import { Order } from "./order.js";

export class OrderBook {
    name: string;
    buys: Order [];
    asks: Order [];

    constructor(name:string, buys: Order[], asks: Order[]) {
      this.name = name;
      this.buys = buys;
      this.asks = asks;
    }

    getMidPrice() : number {
      const minAsk = Math.min(...this.asks.map(x => x.price));
      const maxBuy = Math.max(...this.buys.map(x => x.price));
      return (minAsk + maxBuy) / 2;
    }
  };