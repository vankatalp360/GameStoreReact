import { post, get } from '../data/crud'

class OrdersService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/orders';
        this.createOrderUrl = `${this.baseUrl}/submit`
        this.getUserOrdersUrl = `${this.baseUrl}/user`
        this.getPendigOrdersUrl = `${this.baseUrl}/pending`
        this.approveOrderUrl = `${this.baseUrl}/approve`
    }

    getUserOrders(credentials) {
        return get(this.getUserOrdersUrl, credentials);
    }

    createOrder(credentials) {
        return post(this.createOrderUrl, credentials);
    }
    
    approveOrder(orderId, credentials) {
        return post(`${this.approveOrderUrl}/${orderId}`, credentials);
    }

    getPendingOrders(credentials) {
        return get(this.getPendigOrdersUrl, credentials);
    }
}

export default OrdersService;