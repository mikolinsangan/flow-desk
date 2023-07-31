import { OrderBook } from "../models/order-book.js";
import { OrderBookService } from "../service/order-book.service.js";

export class OrderBookController {
    private orderBookServices: OrderBookService[];

    constructor(orderBookServices: OrderBookService[]) {
        this.orderBookServices = orderBookServices;
    }

    async getAverageMidPrice(req: any, res: any) {
        let aveMidPrice = await this._getAverageMidPrice();
        console.log(aveMidPrice);
        res.json(aveMidPrice);
    }

     async _getAverageMidPrice(): Promise<number> {

        let count = 0;
        let totalMidPrice = 0;
        for (let service of this.orderBookServices) {
            const orderBook: OrderBook = await service.getOrderBook();
            if (orderBook != null) {
                totalMidPrice += orderBook.getMidPrice();
                count++;
            }
        }

        return totalMidPrice / count;
    }
};