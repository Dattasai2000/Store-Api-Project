// load cart data from localStorage
let cartData = JSON.parse(localStorage.getItem("trendmall")) || [];
if (!Array.isArray(cartData)) cartData = [cartData];
cartData = cartData.map((item) => ({ ...item, quantity: item.quantity || 1 }));

// COMBINE DUPLICATES based on product id (or title if no id)
let combinedCartData = [];

cartData.forEach((item) => {
  const existingItem = combinedCartData.find(
    (product) => product.id === item.id // assuming "id" is unique for a product
  );
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    combinedCartData.push({ ...item });
  }
});

cartData = combinedCartData;
console.log( combinedCartData.length);


const productContainer = document.getElementById("product");
let maincart = document.getElementById("maincart");

// check if cart is empty
if (cartData.length === 0) {
  maincart.innerHTML = `
    <div class="text-center mb-5 p-4 bg-light">
      <h2>Your Cart is Empty</h2>
      <a href="./product.html" class="btn btn-outline-dark mt-3">
        <i class="fas fa-arrow-left"></i> Continue Shopping
      </a>
    </div>
  `;
}

// update cart count

// update summary
function updateSummary() {
  const summaryBox = document.getElementById("summary");
  let totalQuantity = 0,
    totalPrice = 0,
    shipping = 30;
  cartData.forEach((i) => {
    totalQuantity += i.quantity;
    totalPrice += i.price * i.quantity;
  });
  summaryBox.innerHTML = `
    <div class="card shadow-sm p-3">
      <h5 class="border-bottom pb-2">Order Summary</h5>
      <p>Products (${totalQuantity})<span class="float-end">$${totalPrice.toFixed(2)}</span></p>
      <p>Shipping<span class="float-end">$${shipping.toFixed(2)}</span></p>
      <p class="fw-bold">Total Amount<span class="float-end">$${(totalPrice + shipping).toFixed(2)}</span></p>
      <button class="btn btn-dark w-100 mt-2">Go to checkout</button>
    </div>
  `;
}

// render products
function renderCartItems() {
  productContainer.innerHTML = "";

  if (cartData.length === 0) {
    maincart.innerHTML = `
      <div class="text-center mb-5 p-4 bg-light">
        <h2>Your Cart is Empty</h2>
        <a href="./product.html" class="btn btn-outline-dark mt-3">
          <i class="fas fa-arrow-left"></i> Continue Shopping
        </a>
      </div>
    `;
    return;
  }

  cartData.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item shadow-sm";
    div.innerHTML = `
    <div class="d-flex gap-3 mb-4 align-items-start">
      
      <!-- Product Image -->
      <img src="${item.image}" alt="${item.title}" 
           class="product-img rounded" 
           style="width: 80px; height: auto; flex-shrink: 0;">
      
      <!-- Product Details -->
      <div class="flex-grow-1">
        <!-- Product Title -->
        <h6 class="fw-semibold text-break mb-1">${item.title}</h6>
        
        <!-- Quantity Controls -->
        <div class="d-flex align-items-center gap-2 mb-1">
          <button class="bg-transparent border-0 fw-bold fs-5" onclick="changeQuantity(${idx}, -1)">−</button>
          <span class="fw-bold">${item.quantity}</span>
          <button class="bg-transparent border-0 fw-bold fs-5" onclick="changeQuantity(${idx}, 1)">+</button>
        </div>
        
        <!-- Price Line -->
        <div class="text-muted">
          ${item.quantity} × $${item.price.toFixed(2)}
        </div>
      </div>
      
    </div>
  `;
  
    productContainer.appendChild(div);
  });
  updateSummary();
  localStorage.setItem("trendmall", JSON.stringify(cartData));
}

// change quantity
function changeQuantity(index, delta) {
  cartData[index].quantity += delta;
  if (cartData[index].quantity <= 0) {
    cartData.splice(index, 1);
  }
  renderCartItems();
}

// initial render
renderCartItems();
// update the cart value
const cartCount = document.getElementById("Cart");
cartCount.innerHTML = `<i class="fas fa-shopping-cart"></i>Cart(${combinedCartData.length})`;