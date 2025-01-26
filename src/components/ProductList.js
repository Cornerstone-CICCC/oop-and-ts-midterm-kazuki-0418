import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";


export class ProductList extends Component {
  constructor(cartContext) {
    super();
    this.products = [];
    this.container = document.getElementById('product-list');
    this.cartContext = cartContext;
  }

  update = () => {
    this.products.forEach((product) => {
      const productItem = new ProductItem(product,this.cartContext);
      this.container.appendChild(productItem.render());
    });
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      this.products = await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async render() {
    await this.fetchProducts();

    this.update();
  }
}
