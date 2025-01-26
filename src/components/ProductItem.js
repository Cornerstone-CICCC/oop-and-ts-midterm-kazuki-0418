import { Component } from "../common/Component.js";

export class ProductItem extends Component{
  constructor(product, cartContext) {
    super();
    this.product = product;
    this.cartContext = cartContext;
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('product-item');
    element.innerHTML = `
      <img src="${this.product.image}" alt="${this.product.title}" />
      <h3>${this.product.title}</h3>
      <p>${this.product.description}</p>
      <p>Price: $${this.product.price}</p>
      <p>Rating: ${this.product.rating.rate} (${this.product.rating.count} reviews)</p>
      <button class="add-to-cart">Add to Cart</button>
    `;

    // Add-to-cart button functionality can be added here
    element.querySelector('.add-to-cart').addEventListener('click', () => {
      this.cartContext.addProduct(this.product);
    });

    return element;
  }
}
