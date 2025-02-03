import { Component } from "../common/Component.js";
export class CartItem extends Component {
  constructor(item, cart) {
    super();
    this.item = item;
    this.cart = cart;
  }

  render() {
    const element = document.createElement("div");
    element.classList.add("cart-item");
    element.innerHTML = `
     <div class="item-details">
    <p class="item-name">${this.item.title}</p>

    <div class="quantity-price-container">
    <span class="item-quantity">
    ${this.item.quantity}x  
    </span>
    <span class="item-price">$${this.item.price}</span>
    <span class="total-price">$${(this.item.price * this.item.quantity).toFixed(
      2
    )}</span>
    </div>
    </div>
    <button class="remove-btn">
    <img src="assets/images/trash.svg" alt="Remove item" />
    </button>
      `;

    // const quantityInput = element.querySelector("input");
    // quantityInput.addEventListener("change", (e) => {
    //   this.cart.updateQuantity(this.item.id, parseInt(e.target.value));
    // });

    const removeButton = element.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      this.cart.removeProduct(this.item.id);
      // Reset all product item counters with this ID to 0
      document
        .querySelectorAll(`[data-product-id="${this.item.id}"] #itemCounter`)
        .forEach((counter) => {
          const cartButton = counter.closest(".button-with-count");
          if (cartButton) {
            cartButton.innerHTML = "Add to Cart";
            cartButton.classList.add("button-add-cart");
            cartButton.classList.remove("button-with-count");
          }
        });
    });

    return element;
  }
}
