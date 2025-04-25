const cartContainer = document.getElementById('cart-container');
const totalItemsEl = document.getElementById('total-items');
const subtotalEl = document.getElementById('subtotal');
const totalAmountEl = document.getElementById('total-amount');
const productSummaryEl = document.getElementById('product-summary');
const shipping = 30;

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateSummary() {
  let totalItems = 0;
  let subtotal = 0;
  productSummaryEl.innerHTML = '';

  Object.values(cart).forEach(item => {
    totalItems += item.quantity;
    subtotal += item.price * item.quantity;

    const productDiv = document.createElement('div');
    productDiv.textContent = `${item.title.slice(0, 30)}... x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
    productSummaryEl.appendChild(productDiv);
  });

  totalItemsEl.textContent = totalItems;
  subtotalEl.textContent = subtotal.toFixed(2);
  totalAmountEl.textContent = (subtotal + (totalItems > 0 ? shipping : 0)).toFixed(2);
}

function renderCart() {
  cartContainer.innerHTML = '';

  if (Object.keys(cart).length === 0) {
    cartContainer.innerHTML = '<p class="empty">Your cart is empty.</p>';
    updateSummary();
    return;
  }

  Object.values(cart).forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h4>${item.title}</h4>
      <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
      <div class="qty-buttons">
        <button onclick="changeQuantity(${item.id}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  updateSummary();
}

function changeQuantity(id, delta) {
  if (cart[id]) {
    cart[id].quantity += delta;
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }
    saveCart();
    renderCart();
  }
}

renderCart();