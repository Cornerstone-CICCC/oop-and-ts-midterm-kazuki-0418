import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(cartContext) {
    super();
    this.cartContext = cartContext;

    // Initialize with the current cart state
    this.items = this.cartContext.cart || []; // Get the initial cart state
    this.render(); // Render the initial state

    // Register as a listener to cart updates
    this.cartContext.addListener((cart) => {
      this.items = cart; // Update items when the cart changes
      this.render(); // Re-render the cart list
    });
  }

  openModal(modal) {
    // Get modal, button, and close elements

    const cart = this.cartContext.getCart();

    modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <span class="close-btn">&times;</span>
        <h2>Order Confirmed</h2>
      </div>
      <div class="modal-body" id="orderItemsContainer">
        <!-- Order items will be inserted here -->
      </div>
      <div class="modal-footer">
        <button id="newOrderButton" class="start-order-btn">Start New Order</button>
      </div>
    </div>
  `;

    // Insert the order items dynamically using for loop
    const orderItemsContainer = document.getElementById("orderItemsContainer");
    // Loop through the orderItems array and generate the HTML for each item
    cart.forEach((item) => {
      const orderItemHTML = `
      <div class="order-item">
        <div class="order-item-header">
        <img src="${item.image}" alt="${item.title}" class="order-img">
        <div class="order-details">
        <span class="order-item-title">${item.title}</span>
        <div class="order-quantity-price">
        <span class="order-quantity">${item.quantity}x </span>
        <span>@ $${item.price.toFixed(2)}</span>
        </div>
        </div>
        </div>
        <p class="total-item-price">$${item.quantity * item.price}</p>
      </div>
    `;

      // Append the generated HTML to the modal body
      orderItemsContainer.innerHTML += orderItemHTML;
    });

    // Close button functionality
    const closeBtn = document.getElementsByClassName("close-btn")[0];
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Start new order button functionality
    const newOrderButton = document.getElementById("newOrderButton");
    newOrderButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Close modal if user clicks outside the modal
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  render() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = `<h2 class="cart-title">Your Cart（${
      this.cartContext.getCart().length
    }）</h2>`;

    // Render each cart item
    this.items.forEach((item) => {
      const cartItem = new CartItem(item, this.cartContext);
      cartList.appendChild(cartItem.render());
    });

    const totalPrice = this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const totalElement = document.createElement("div");
    totalElement.classList.add("total");
    totalElement.innerHTML = `<span>Total:</span> <h2 class="total-price">$${totalPrice.toFixed(
      2
    )}</h2>`;
    const modal = document.getElementById("orderModal");
    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-btn");
    submitButton.textContent = "Confirm Order";
    submitButton.addEventListener("click", () => {
      this.openModal(modal); // 'this' will refer to the class instance
      modal.style.display = "block";
    });
    cartList.appendChild(totalElement);
    cartList.appendChild(submitButton);

    if (this.items.length === 0) {
      cartList.innerHTML = "<p>Your cart is empty.</p>";
    }
  }
}
