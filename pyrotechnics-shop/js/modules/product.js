let product;

export function initProductPage() {
  //retrieve the product-id from the session storage which index.js stored
  const productId = sessionStorage.getItem("product-id");
  //if it doesnt exist returns back
  if (!productId) return;

  let productQuantity = 1;

  const increaseButton = document.getElementById("increaseProductQuantity");
  increaseButton.addEventListener('click', () => {
    productQuantity++;
    const productQuantityDisplay = document.getElementById("productQuantityDisplay");
    productQuantityDisplay.textContent = "Quantity: " + productQuantity;
  }
  );
  const decreaseButton = document.getElementById("decreaseProductQuantity");
  decreaseButton.addEventListener('click', () => {
    productQuantity--;
    const productQuantityDisplay = document.getElementById("productQuantityDisplay");
    productQuantityDisplay.textContent = "Quantity: " + productQuantity;
  }
  );
  const addToCartButton = document.getElementById("btn-add-cart");
  addToCartButton.addEventListener('click', () => {
    addToCart(productId, productQuantity);
  });

  //two layer up
  fetch("../data/catalog.json")
  //get response from json
    .then(response => response.json())
    //then have the item id equal to the product id const parsed to int for comaparing
    .then(data => {

      product = data.products.find(p => p.ItemID === parseInt(productId));
      
      if (!product) return;

      const productName = document.getElementById("product-name");
      const details = document.getElementById("details");
      const price = document.getElementById("price-id");
      const availability = document.getElementById("availability");
      const brand = document.getElementById("brand");     
      const make = document.getElementById("make");       
      const imageContainer = document.querySelector(".product-card");

      if (productName) productName.textContent = product.ItemTitle;
      if (details) details.textContent = product.Description;
      //to read the elements of html  we use innerhtml not text content but might change it
      //depending on css 
      if (price) price.innerHTML = `<b>Price: $${product.UnitPrice}`;

      //set text content will not read the elements tags
      if (availability) availability.textContent = `In Stock: ${product.QuantityInStock}`;
      if (brand) brand.innerHTML = `<b>Brand:</b> ${product.Brand}`;
      if (make) make.innerHTML = `<b>Make:</b> ${product.Make}`;


      //get thumbnail as img element from json and set it in the card class inside the product.html
      if (imageContainer) {
        imageContainer.innerHTML = `<img src="${product.ThumbnailImage}" alt="${product.ItemTitle}" class="product-img">`;
      }

    })
    .catch(error => {
      console.error("Error loading product:", error);
    });
}

function addToCart(productId, quantity) {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || {};

  if (quantity < 1) {
    window.alert("This is not a valid quantity!");
  } else if (quantity > product.QuantityInStock) {
    window.alert("There are not enough items in stock!");
  } else {
    if (cart[productId]) {
      cart[productId] += quantity;
    } else {
      cart[productId] = quantity;
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "shop.html";
  }
}