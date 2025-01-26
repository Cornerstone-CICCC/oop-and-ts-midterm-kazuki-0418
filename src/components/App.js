import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {

  constructor(cartContext) {
    super();
    this.header = new Header();
    this.footer = new Footer();
    this.productList = new ProductList(cartContext);
    this.cartList = new CartList(cartContext);
  }

  render() {
    this.header.render();
    this.productList.render();
    this.cartList.render();
    this.footer.render();
  }
}