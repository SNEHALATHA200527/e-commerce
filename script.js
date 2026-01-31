let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsDiv = document.getElementById("products");

/* UPDATE CART COUNT */
function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").innerText = count;
}

/* SHOW PRODUCTS */
function showCategory(category) {
  productsDiv.innerHTML = "";

  let priceMap = {
    men: 899,
    women: 1299,
    kids: 699,
    electronics: 1999
  };

  let folderMap = {
    men: "shirts",
    women: "kurtas",      // change if needed
    kids: "",             // images directly inside kids
    electronics: ""       // images directly inside electronics
  };

  let price = priceMap[category];

  for (let i = 1; i <= 5; i++) {
    let img = folderMap[category]
      ? `images/${category}/${folderMap[category]}/${i}.jpg`
      : `images/${category}/${i}.jpg`;

    productsDiv.innerHTML += `
      <div class="product">
        <img src="${img}" onerror="this.src='images/logo1.png.jpeg'">
        <h4>${category.toUpperCase()}</h4>
        <p>₹${price}</p>
        <button onclick="addToCart('${category}', ${price}, '${img}')">
          Add to Cart
        </button>
      </div>
    `;
  }
}


/* ADD TO CART (DIRECT) */
function addToCart(name, price, img) {
  let existing = cart.find(
    item => item.name === name && item.img === img
  );

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name,
      price,
      img,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* NAVIGATION */
function goToCart() {
  window.location.href = "cart.html";
}

function goToOrders() {
  window.location.href = "track.html";
}

updateCartCount();
