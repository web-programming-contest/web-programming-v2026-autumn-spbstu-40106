export class Order {
  constructor(orderId, items = [], status = 'new') {
    this.orderId = orderId;
    this.items = items;
    this.status = status;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(name) {
    const result = [];
    for (const item of this.items) {
      if (item.name !== name) {
        result.push(item);
      }
    }
    this.items = result;
  }

  getTotal() {
    let sum = 0;
    for (const item of this.items) {
      sum += item.price;
    }
    return sum;
  }
}

export function groupOrdersByStatus(orders) {
  const result = {};
  for (const order of orders) {
    if (!result[order.status]) {
      result[order.status] = [];
    }
    result[order.status].push(order);
  }
  return result;
}

export function getUniqueItems(orders) {
  const unique = new Set();
  const result = [];
  for (const order of orders) {
    for (const item of order.items) {
      if (!unique.has(item.name)) {
        unique.add(item.name);
        result.push(item);
      }
    }
  }
  return result;
}

function getRangeLabel(total) {
  if (total <= 1000) {
    return 'до 1000';
  }
  if (total <= 5000) {
    return '1001-5000';
  }
  if (total <= 10000) {
    return '5001-10000';
  }
  return 'от 10001';
}

export function groupOrdersByTotal(orders) {
  const result = {
    'до 1000': [],
    '1001-5000': [],
    '5001-10000': [],
    'от 10001': [],
  };

  for (const order of orders) {
    const label = getRangeLabel(order.getTotal());
    result[label].push(order);
  }
  return result;
}

export function findOrdersByItem(orders, itemName) {
  const result = [];
  for (const order of orders) {
    for (const item of order.items) {
      if (item.name === itemName) {
        result.push(order);
        break;
      }
    }
  }
  return result;
}

export function findOrdersByStatus(orders, findStatus) {
  const result = [];
  for (const order of orders) {
    if (order.status === findStatus) {
      result.push(order);
    }
  }
  return result;
}
