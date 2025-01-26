import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor() {
    super();
    this.container = document.getElementById('header');
  }

  render() {
    this.container.innerHTML = `
      <nav>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}
