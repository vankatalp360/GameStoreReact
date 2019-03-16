import { post, get } from '../data/crud'

class OrdersService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/orders';
        this.createOrderUrl = `${this.baseUrl}/submit`
        this.getUserOrdersUrl = `${this.baseUrl}/user`
        this.getAllPendigOrdersUrl = `${this.baseUrl}/pending`
        this.approveOrderUrl = `${this.baseUrl}/approve`
    }

    getUserOrders(credentials) {
        return get(this.getUserOrdersUrl, credentials);
    }

    createOrder(credentials, user) {
        return post(this.createOrderUrl, credentials);
    }
}

export default OrdersService;