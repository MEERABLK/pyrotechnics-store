let category = "none";

export function initShopPage() {
    console.log("initializing the app...");
    displayFilteredShopItems();
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener('input', displayFilteredShopItems);
    const filterList = document.getElementById("filter")
    filterList.addEventListener('input', displayFilteredShopItems);

    const categoryNone = document.getElementById("CategoryNone");
    categoryNone.addEventListener('click', ()=> {
      category="none";
    displayFilteredShopItems();
  });
    const categoryOne = document.getElementById("CategoryOne");
    categoryOne.addEventListener('click', ()=> {
      category="1";
    displayFilteredShopItems();
  });
    const categoryTwo = document.getElementById("CategoryTwo");
    categoryTwo.addEventListener('click', ()=> {
      category="2";
    displayFilteredShopItems();
  });
    const categoryThree = document.getElementById("CategoryThree");
    categoryThree.addEventListener('click', ()=> {
      category="3";
    displayFilteredShopItems();
  });
    const categoryFour = document.getElementById("CategoryFour");
    categoryFour.addEventListener('click', ()=> {
      category="4";
    displayFilteredShopItems();
  });
    const categoryFive = document.getElementById("CategoryFive");
    categoryFive.addEventListener('click', ()=> {
      category="5";
    displayFilteredShopItems();
  });
    const categorySix = document.getElementById("CategorySix");
    categorySix.addEventListener('click', ()=> {
      category="6";
    displayFilteredShopItems();
  });
    const categorySeven = document.getElementById("CategorySeven");
    categorySeven.addEventListener('click', ()=> {
      category="7";
    displayFilteredShopItems();
  });
  const btnCat = document.getElementById("catify");
  if (btnCat) {
    btnCat.addEventListener('click', catify);
  }
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
    if (category == "none") {
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
  }
  else
  data.products.forEach(product => {
    if (product.ItemTitle.toLowerCase().includes(searchBar.value.toLowerCase()) && product.category_id == category) { // Applies the search ALONGSIDE the filters
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

function catify() {
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
    if (category == "none") {
    data.products.forEach(async product => {

    const uri = "https://api.thecatapi.com/v1/images/search";
    let response = await fetch(uri);
    let data = await response.json();

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
      cardimage.src = data[0].url;
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
  }
  else
  data.products.forEach(async product => {
    const uri = "https://api.thecatapi.com/v1/images/search";
    let response = await fetch(uri);
    let data = await response.json();

    if (product.ItemTitle.toLowerCase().includes(searchBar.value.toLowerCase()) && product.category_id == category) { // Applies the search ALONGSIDE the filters
    const card = document.createElement("div");
    card.className = "pagecard";

    container.appendChild(card);
    
    const cardprice = document.createElement("figcaption");
    cardprice.className = "linkpage";
    cardprice.textContent = product.UnitPrice + "$";
    card.appendChild(cardprice);

    const cardimage = document.createElement("img");
    cardimage.className = "card-img-top";
    cardimage.src = data[0].url;
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