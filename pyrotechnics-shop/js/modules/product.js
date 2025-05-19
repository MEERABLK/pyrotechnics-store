
export function initProductPage() {
  //retrieve the product-id from the session storage which index.js stored
  const productId = sessionStorage.getItem("product-id");
  //if it doesnt exist returns back
  if (!productId) return;

  //two layer up
  fetch("../data/catalog.json")
  //get response from json
    .then(response => response.json())
    //then have the item id equal to the product id const parsed to int for comaparing
    .then(data => {

      const product = data.products.find(p => p.ItemID === parseInt(productId));
      
      if (!product) return;

      const productName = document.getElementById("product-name");
      const details = document.getElementById("details");
      const price = document.getElementById("price");
      const availability = document.getElementById("availability");
      const brand = document.getElementById("brand");     
      const make = document.getElementById("make");       
      const imageContainer = document.querySelector(".product-card");

      if (productName) productName.textContent = product.ItemTitle;
      if (details) details.textContent = product.Description;
      //to read the elements of html  we use innerhtml not text content but might change it
      //depending on css 
      if (price) price.innerHTML = `<b>Price:</b> $${product.UnitPrice}`;

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
