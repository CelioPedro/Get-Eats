// Armazenamento de pedidos isolado por usuário logado.
const OrderStorage = {
  baseKeys: {
    currentOrder: 'pedido_atual',
    currentOrders: 'pedidos_atuais',
    history: 'historico_pedidos',
    total: 'pedido_total_confirmado',
    status: 'pedido_status_atual',
    deliverer: 'entregador_pedido_atual',
    timestamp: 'pedido_timestamp_inicio',
    number: 'numero_pedido_atual'
  },

  getUserId() {
    if (typeof authManager !== 'undefined' && authManager.obterUsuarioLogado) {
      const usuario = authManager.obterUsuarioLogado();
      if (usuario && usuario.email) {
        return usuario.email
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '');
      }
    }

    return 'guest';
  },

  key(baseKey) {
    return `${baseKey}_${this.getUserId()}`;
  },

  get(baseKey, fallback = null) {
    const value = localStorage.getItem(this.key(baseKey));
    if (value === null) return fallback;

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  },

  set(baseKey, value) {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(this.key(baseKey), serialized);
  },

  remove(baseKey) {
    localStorage.removeItem(this.key(baseKey));
  },

  getCurrentOrder() {
    return this.get(this.baseKeys.currentOrder, null);
  },

  setCurrentOrder(order) {
    this.set(this.baseKeys.currentOrder, order);
  },

  getCurrentOrders() {
    return this.get(this.baseKeys.currentOrders, []);
  },

  setCurrentOrders(orders) {
    this.set(this.baseKeys.currentOrders, orders);
  },

  addCurrentOrder(order) {
    const orders = this.getCurrentOrders();
    orders.push({
      ...order,
      usuarioId: this.getUserId()
    });
    this.setCurrentOrders(orders);
  },

  getHistory() {
    return this.get(this.baseKeys.history, []);
  },

  setHistory(orders) {
    this.set(this.baseKeys.history, orders);
  },

  addHistoryOrder(order) {
    const history = this.getHistory();
    history.push({
      ...order,
      usuarioId: this.getUserId()
    });
    this.setHistory(history);
  },

  clearTracking() {
    [
      this.baseKeys.currentOrder,
      this.baseKeys.status,
      this.baseKeys.deliverer,
      this.baseKeys.timestamp,
      this.baseKeys.number,
      this.baseKeys.total
    ].forEach(key => this.remove(key));
  }
};

window.OrderStorage = OrderStorage;
