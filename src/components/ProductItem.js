import { Component } from "../common/Component.js";
export class ProductItem extends Component {
  constructor(product, cartContext) {
    super();
    this.product = product;
    this.cartContext = cartContext;
  }

  updateCartButton(button, item) {
    button.innerHTML = "";
    button.setAttribute("data-product-id", this.product.id);

    const counterElement = document.createElement("span");
    counterElement.id = "itemCounter";
    counterElement.textContent = item.quantity;

    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("cart-button", "decrease");
    decreaseButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.cartContext.decreaseProductQuantity(this.product);
      const newQuantity = parseInt(counterElement.textContent) - 1;
      if (newQuantity <= 0) {
        this.resetCartButton(button);
      } else {
        counterElement.textContent = newQuantity;
      }
    });

    const increaseButton = document.createElement("button");
    increaseButton.classList.add("cart-button", "increase");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.cartContext.increaseProductQuantity(this.product);
      counterElement.textContent = parseInt(counterElement.textContent) + 1;
    });

    button.appendChild(decreaseButton);
    button.appendChild(counterElement);
    button.appendChild(increaseButton);
    button.classList.add("button-with-count");
    button.classList.remove("button-add-cart");
  }

  resetCartButton(button) {
    button.innerHTML = "Add to Cart";
    button.classList.add("button-add-cart");
    button.classList.remove("button-with-count");
    this.addCartButtonListener(button);
  }

  addCartButtonListener(button) {
    const clickHandler = () => {
      this.cartContext.addProduct(this.product);
      this.updateCartButton(button, { ...this.product, quantity: 1 });
      button.removeEventListener("click", clickHandler);
    };
    button.addEventListener("click", clickHandler);
  }

  render() {
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML = `
      <div class="card-image">
        <img src="${this.product.image}" alt="${this.product.title}" />
      </div>
      <button id="cartButton" class="button-add-cart">
      <span class="add-cart-text">Add to Cart</span>
      </button>
      <div class="card-content">
        <h3>${this.product.title}</h3>
        <p class="price">Price: $${this.product.price}</p>
        <p>Rating: ${this.product.rating.rate} (${this.product.rating.count} reviews)</p>
      </div>
    `;

    const cartButton = element.querySelector("#cartButton");
    const itemInCart = this.cartContext
      .getCart()
      .find((item) => item.id === this.product.id);

    if (itemInCart && itemInCart.quantity > 0) {
      this.updateCartButton(cartButton, itemInCart);
    } else {
      this.addCartButtonListener(cartButton);
    }

    return element;
  }
}
