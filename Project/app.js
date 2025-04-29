// Fetching data from the API
// and displaying it on the page
let productsContainer = document.getElementById("products");
let All = document.getElementById("All");
let Men_clothing = document.getElementById("Men_clothing");
let Women_clothing = document.getElementById("Women_clothing");
let Jewelery = document.getElementById("Jewelery");
let Electronics = document.getElementById("Electronics");

let jsondata;
async function products() {
  let productdata = fetch("https://fakestoreapi.com/products");
  let data = await productdata;
  jsondata = await data.json();
  console.log(jsondata);
  productdetails(jsondata);
}
function productdetails(data) {
  data.map((product) => {
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
    <div class="card text-center d-flex flex-column">
      <img src="${product.image}" class="card-img-top p-3 product-image" alt="${
      product.title
    }">
      <div class="card-body flex-grow-1 d-flex flex-column justify-content-between">
        <h5 class="card-title">${product.title.slice(0, 12)}...</h5>
        <p class="card-text">${product.description.slice(0, 90)}...</p>
      </div>
      <div class="product-price w-100 text-center border-top border-bottom p-2  text-secondary">
        $${product.price}
      </div>
      <div class=" d-flex justify-content-center">
        <button class="btn btn-dark  m-3 " id="cardbutton">Details</button>
        <button class="btn btn-dark  m-3 " id="cardbutton" onclick=addcart(${product.id})>Add to Cart</button>
      </div> 
    </div>
  `;
    productsContainer.appendChild(div);
  });
}
products();

All.addEventListener("click", function () {
  productsContainer.innerHTML = "";
  productdetails(jsondata);
});

Men_clothing.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let mendata = [];
  jsondata.map((product) => {
    if (product.category === Men_clothing.innerText.toLocaleLowerCase()) {
      mendata.push(product);
    }
  });
  productdetails(mendata);
});

Women_clothing.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let data = jsondata.filter((product) => {
    return product.category === Women_clothing.innerText.toLocaleLowerCase();
  });

  productdetails(data);
});
Electronics.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let data = jsondata.filter((product) => {
    return product.category === Electronics.innerText.toLocaleLowerCase();
  });

  productdetails(data);
});
Jewelery.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let data = jsondata.filter((product) => {
    return product.category === Jewelery.innerText.toLocaleLowerCase();
  });

  productdetails(data);
});

document.getElementById("Login").addEventListener("click", function () {
  window.location.href = "./login.html";
});
document.getElementById("Register").addEventListener("click", function () {
  window.location.href = "./Register.html";
});
document.getElementById("Cart").addEventListener("click", function () {
  window.location.href = "./Cart.html";
});


let data = [];
function addcart(id)
{
 let tempdata= jsondata.find((item)=>item.id==id);
 data.push(tempdata);
 localStorage.setItem("trendmall", JSON.stringify(data));
 totalAmount();
}
function totalAmount() {
  let Amount = data.reduce((acc, price) => acc + price.price, 0);
  console.log(Amount); 
}
 
let cartData = JSON.parse(localStorage.getItem("trendmall")) || [];
const cartCount = document.getElementById("Cart");
 cartCount.innerHTML = `<i class="fas fa-shopping-cart"></i>Cart(${cartData.length})`;