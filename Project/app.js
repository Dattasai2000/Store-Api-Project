// let allProducts = [];

//     async function dataproducts() {
//       let response = await fetch("https://fakestoreapi.com/products");
//       let products = await response.json();
//       allProducts = products; // Save for filtering
//       displayProducts(allProducts);
//     }

//     function displayProducts(products) {
//       const container = document.getElementById('products-body');
//       container.innerHTML = ''; // Clear existing content
//       products.forEach(item => {
//         container.innerHTML += `
//           <div id='products'>
//             <img src="${item.image}" id="img-products" height="300px" width="300px">
//             <h1>${item.title.slice(0, 12)}...</h1>
//             <p>${item.description.slice(0, 100)}...</p>
//             <hr>
//            <p id="price">$${item.price}</p>
//            <hr>
//             <button id="btn">Details</button>
//             <button id="btn">Add to cart</button>
//           </div>
//         `;
//       });
//     }

//     function filterProducts(category) {
//       if (category === 'all') {
//         displayProducts(allProducts);
//       } else {
//         const filtered = allProducts.filter(item => item.category === category);
//         displayProducts(filtered);
//       }
//     }

//     dataproducts();
let allProducts = [];
let cart = [];

async function dataproducts() {
  let response = await fetch("https://fakestoreapi.com/products");
  let products = await response.json();
  allProducts = products;
  displayProducts(allProducts);
}

function displayProducts(products) {
  const container = document.getElementById('products-body');
  container.innerHTML = '';
  products.forEach(item => {
    container.innerHTML += `
      <div id='products'>
        <img src="${item.image}" id="img-products" height="300px" width="300px">
        <h1>${item.title.slice(0, 12)}...</h1>
        <p>${item.description.slice(0, 100)}...</p>
        <hr>
        <p id="price">$${item.price}</p>
        <hr>
        <button id="btn">Details</button>
        <button id="btn" onclick="addToCart(${item.id})">Add to cart</button>
      </div>
    `;
  });
}

function filterProducts(category) {
  if (category === 'all') {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(item => item.category === category);
    displayProducts(filtered);
  }
}

function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('cart-page');
  cartContainer.innerHTML += '';
  cart.forEach(item => {
    const total = (item.price * item.quantity).toFixed(2);
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="50" height="50">
        <span>${item.title.slice(0, 15)}...</span>
        <span>$${item.price}</span>
        <div class="cart-controls">
          <button onclick="updateQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <strong>Total: $${total}</strong>
      </div>
    `;
  });
}

function updateQuantity(productId, change) {
  const item = cart.find(p => p.id === productId);
  if (!item) return;
  item.quantity += change;
  if (item.quantity < 1) {
    cart = cart.filter(p => p.id !== productId);
  }
  renderCart();
}

dataproducts();
