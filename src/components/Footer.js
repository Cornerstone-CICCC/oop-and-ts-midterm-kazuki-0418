import { Component } from "../common/Component.js";

export class Footer extends Component {
    constructor() {
      super();
      this.container = document.getElementById('footer');
    }
  
    render() {
      const year = new Date().getFullYear();
      this.container.innerHTML = `
        <p>&copy; ${year} Fake Store. All Rights Reserved.</p>
        <ul class="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      `;
    }
  }