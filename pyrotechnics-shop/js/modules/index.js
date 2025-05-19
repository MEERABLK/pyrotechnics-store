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
      const featuredProducts = data.products.slice(0, 2); // Only the first 2

      featuredProducts.forEach(product => {
        const card = document.createElement("div");
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
        title.setAttribute("data-id", product.ItemID);

        //add click event to go to product.html
        title.addEventListener("click", (event) => {
          const id = event.target.getAttribute("data-id");

      [image, title].forEach(el => {
  el.addEventListener("click", () => {
    sessionStorage.setItem("product-id", product.ItemID);
    window.location = "pages/product.html";
  });
});
});
        card.appendChild(price);
        card.appendChild(image);
        card.appendChild(title);

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error displaying featured products:", error);
    });
}
