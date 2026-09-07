export class Product {
  constructor(id, name, price, categories = []) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categories = categories;
  }

  addCategory(category) {
    if (!this.categories.includes(category)) {
      this.categories.push(category);
    }
  }

  removeCategory(category) {
    this.categories = this.categories.filter((c) => c !== category);
  }

  get categoryCount() {
    return this.categories.length;
  }
}

export function groupByCategory(products) {
  return products.reduce((acc, product) => {
    product.categories.forEach((category) => {
      acc[category] = acc[category] || [];
      acc[category].push(product);
    });
    return acc;
  }, {});
}

export function getUniqueCategories(products) {
  return [...new Set(products.flatMap((p) => p.categories))];
}

export function groupByPriceRanges(products) {
  return products.reduce((acc, product) => {
    const step = 1000;
    const rangeStart = Math.floor(product.price / step) * step;
    const key = `${rangeStart}-${rangeStart + step}`;
    acc[key] = acc[key] || [];
    acc[key].push(product);
    return acc;
  }, {});
}

export function getProductsByCategory(products, category) {
  return products.filter((p) => p.categories.includes(category));
}

export function getProductsAbovePrice(products, minPrice) {
  return products.filter((p) => p.price > minPrice);
}