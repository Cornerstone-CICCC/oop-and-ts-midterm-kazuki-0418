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
            <h3>${this.item.title}</h3>
            <p>Quantity: <input type="number" value="${this.item.quantity}" min="1" /></p>
            <p>Total: $${(this.item.price * this.item.quantity).toFixed(2)}</p>
            <button class="remove-item">Remove</button>
        `;
        element.querySelector("input").addEventListener("change", (e) => {
            this.cart.updateQuantity(this.item.id, parseInt(e.target.value));
        });
        element.querySelector(".remove-item").addEventListener("click", () => {
            this.cart.removeProduct(this.item.id);
        });
        return element;
    }
}