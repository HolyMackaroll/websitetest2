 const menu = document.querySelector('#mobile-menu');
 const menuLinks = document.querySelector('.navbar__menu');

 menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
 });  

  // JavaScript code for adding items to the cart
  const cart = [];

  function addToCart(itemName, itemPrice) {
      const item = { name: itemName, price: itemPrice };

      // Check if the item already exists in the cart
      const existingItem = cart.find(cartItem => cartItem.name === itemName);

      if (existingItem) {
          existingItem.quantity++;
      } else {
          item.quantity = 1;
          cart.push(item);
      }

      // Update the cart display
      renderCart();
  }

  function removeFromCart(itemName) {
      const index = cart.findIndex(cartItem => cartItem.name === itemName);

      if (index !== -1) {
          const item = cart[index];
          if (item.quantity > 1) {
              item.quantity--;
          } else {
              cart.splice(index, 1);
          }
      }

      // Update the cart display
      renderCart();
  }

  function renderCart() {
      const cartContainer = document.querySelector('.cart');

      if (cart.length === 0) {
          cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      } else {
          cartContainer.innerHTML = `
              <h2>Cart</h2>
              <div class="cart-items">
                  ${cart.map(item => `
                      <div class="cart-item">
                        <h3>${item.name}</h3>
                        <div class="quantity">${item.quantity}</div>
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeFromCart('${item.name}')">Remove</button>
                      </div>
                  `).join('')}
              </div>
              <div class="cart-total">
                  Total: $${calculateCartTotal().toFixed(2)}
              </div>
          `;
      }
  }

  function calculateCartTotal() {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Render the initial cart display
  renderCart();