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

  render() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear the current list

    // Render each cart item
    this.items.forEach((item) => {
      const cartItem = new CartItem(item, this.cartContext);
      cartList.appendChild(cartItem.render());
    });

    const totalPrice = this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    cartList.appendChild(totalElement);

    if (this.items.length === 0) {
      cartList.innerHTML = '<p>Your cart is empty.</p>';
    }
  }
}