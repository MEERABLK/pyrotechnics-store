document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("initializing the app...");
    displayFilteredShopItems();
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener('input', displayFilteredShopItems);
    const filterList = document.getElementById("filter")
    filterList.addEventListener('input', displayFilteredShopItems);
}

function displayFilteredShopItems() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  const filterList = document.getElementById("filter")

  fetch("../data/catalog.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parses JSON
  })
  .then(data => {
    if (filterList.value == "AscendingPrice") {
      data.products.sort((a, b) => a.UnitPrice - b.UnitPrice);
    }
    if (filterList.value == "DescendingPrice") {
      data.products.sort((a, b) => b.UnitPrice - a.UnitPrice);
    }
    
    data.products.forEach(product => {
      if (product.ItemTitle.toLowerCase().includes(searchBar.value.toLowerCase())) { // Applies the search ALONGSIDE the filters
      const card = document.createElement("div");
      card.className = "pagecard";

      container.appendChild(card);
      
      const cardprice = document.createElement("figcaption");
      cardprice.className = "linkpage";
      cardprice.textContent = product.UnitPrice + "$";
      card.appendChild(cardprice);

      const cardimage = document.createElement("img");
      cardimage.className = "card-img-top";
      cardimage.src = product.ThumbnailImage;
      cardimage.alt = product.Description;

      card.appendChild(cardimage);

      const cardtitle = document.createElement("figcaption");
      cardtitle.className = "linkpage";
      cardtitle.textContent = product.ItemTitle;


      //using custom attribute for product id from json
        cardtitle.setAttribute("data-id", product.ItemID);

        //add click event to go to product.html after clicking the image title
        cardtitle.addEventListener("click", (event) => {
          //retrieve id
          const id = event.target.getAttribute("data-id");
//store it in sessionStorage
          sessionStorage.setItem("product-id", id);
          //go to product.html
          window.location = "product.html";
        });
      card.appendChild(cardtitle);
      }
    });
  })
  .catch(error => {
    console.error("Failed to load catalog.json:", error);
  });
}