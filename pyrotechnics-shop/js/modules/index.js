

//similar to shop.js the function is called in script.js as import
export function initHomePage() {
  console.log("Loading featured products for home page...");

  const container = document.getElementById("card-container");
  if (!container) return;

  container.innerHTML = "";

  fetch("data/catalog.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load catalog.json");
      return response.json();
    })
    .then(data => {
      const featuredProducts = data.products.slice(0, 6); // Only the first 2
            let currentIndex = 0;

 function displayProduct(index) {
        const product = featuredProducts[index];
         container.innerHTML = "";
        const card = document.createElement("div");
        //using css class to add the design structure of the product card inside a div which will
        //have the figure
        card.className = "pagecard";

        const price = document.createElement("figcaption");
        price.className = "linkpage";
        price.textContent = product.UnitPrice + "$";

        const image = document.createElement("img");
        image.className = "card-img-top";
        image.src = product.ThumbnailImage;
        image.alt = product.Description;

        const title = document.createElement("figcaption");
        title.className = "linkpage";
        title.textContent = product.ItemTitle;

        //using custom attribute for product id from json
        title.setAttribute("data-id", product.ItemID);

        //add click event to go to product.html after clicking the image title
        title.addEventListener("click", (event) => {
          //retrieve id
          const id = event.target.getAttribute("data-id");
//store it in sessionStorage
          sessionStorage.setItem("product-id", id);
          //go to product.html
          window.location = "pages/product.html";
        });
//appendChild() inserts the title element into the card as its last child
//similar to createelement method from fetch api to structure
        card.appendChild(price);
        card.appendChild(image);
        card.appendChild(title);

        container.appendChild(card);
      }
      function startCarousel() {
 displayProduct(currentIndex);
        currentIndex = (currentIndex + 1) % featuredProducts.length;
        setTimeout(startCarousel, 4000); // Call again after 4 seconds
      }

       // Start the carousel loop
      startCarousel();
    
    })
    .catch(error => {
      console.error("Error displaying featured products:", error);
    });
}
