
export class CartContext {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || []
        this.listeners = []
    }

    addProduct(product) {
        const existingProduct = this.cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.save();
    }
    
    updateQuantity(id){
        const item = this.cart.find((item) => item.id === id);
        if (item) {
            item.quantity = Math.max(quantity, 1);
        }
        this.save();
    }
    removeProduct(id){
        this.cart = this.cart.filter((item) => item.id !== id);
        this.save();
    }

    save() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.listeners.forEach(listener => listener(this.cart))
    }

    addListener(listener) {
        this.listeners.push(listener)
    }

    getCart() {
        return localStorage.getItem("cart")
    }
    
}