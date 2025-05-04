document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("initializing the app...");
    displayDefaultShopItems();
}

function displayDefaultShopItems() {
    const container = document.getElementById("card-container");

    fetch("../data/catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parses JSON
    })
    .then(data => {
      data.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "pagecard";

        container.appendChild(card);

        const cardimage = document.createElement("img");
        cardimage.className = "card-img-top";
        cardimage.src = product.ThumbnailImage;
        cardimage.alt = product.Description;

        card.appendChild(cardimage);

        const cardtitle = document.createElement("figcaption");
        cardtitle.className = "linkpage";
        cardtitle.textContent = product.ItemTitle;

        card.appendChild(cardtitle);
      });
    })
    .catch(error => {
      console.error("Failed to load catalog.json:", error);
    });
}