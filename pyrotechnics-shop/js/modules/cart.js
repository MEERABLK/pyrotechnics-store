let totalPrice = 0;

export function initCartPage() {
    itemDisplay();
}

function itemDisplay() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    const itemDisplay = document.getElementById("itemDisplay");
    itemDisplay.innerHTML = "";
    let currentProduct;
    
    fetch("../data/catalog.json")
  //get response from json
    .then(response => response.json())
    .then(data => {
        Object.entries(cart).forEach(([id, qty]) => {
            currentProduct = data.products.find(p => p.ItemID == parseInt(id));

            let cartItemSection = document.createElement("section");
            cartItemSection.className = "cart-item";
            itemDisplay.appendChild(cartItemSection);

            let imageFigure = document.createElement("figure");
            imageFigure.className = "";
            cartItemSection.appendChild(imageFigure);

            let imageDiv = document.createElement("div");
            imageDiv.className = "card";
            imageFigure.appendChild(imageDiv);

            let image = document.createElement("img");
            image.src = currentProduct.ThumbnailImage;
            image.alt = currentProduct.Description;
            image.className = "product-img";
            imageDiv.appendChild(image);

            let buttonSection = document.createElement("section");
            buttonSection.id="button-section";
            cartItemSection.appendChild(buttonSection);

            let itemName = document.createElement("h3");
            itemName.textContent = currentProduct.ItemTitle;
            itemName.className = "product-name";
            buttonSection.appendChild(itemName);

            let removalButton = document.createElement("button");
            removalButton.className = "btn-remove-from-cart";
            removalButton.textContent = "Remove";
            buttonSection.appendChild(removalButton);
            removalButton.addEventListener('click', () => {
                totalPrice = 0;
                removeItem(id);
            }
            );

            let infoSection = document.createElement("section");
            infoSection.className = "cart-product-info";
            cartItemSection.appendChild(infoSection);

            let itemPrice = document.createElement("span");
            itemPrice.className = "price";
            itemPrice.textContent = parseFloat(currentProduct.UnitPrice).toFixed(2);
            infoSection.appendChild(itemPrice);

            let itemQTY = document.createElement("span");
            itemQTY.className = "qty";
            itemQTY.textContent = qty;
            infoSection.appendChild(itemQTY);

            let itemTotal = document.createElement("span");
            itemTotal.className = "total";
            itemTotal.textContent = "$" + parseFloat(qty * currentProduct.UnitPrice).toFixed(2);
            infoSection.appendChild(itemTotal);

            totalPrice += qty * currentProduct.UnitPrice;
        });
        const totalDisplay = document.getElementById("final-total");
        totalDisplay.textContent = "TOTAL: $" + parseFloat(totalPrice).toFixed(2);
    } )
}

function removeItem(id) {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    delete cart[id];
    sessionStorage.setItem('cart', JSON.stringify(cart));
    itemDisplay();
}


export function handleCheckoutButton() {
  const checkoutBtn = document.getElementById('btn-checkout');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const isLoggedIn = sessionStorage.getItem('loggedIn');

      if (isLoggedIn === 'true') {
        window.location = 'checkout.html';
      } else {
        window.location= 'login.html';
      }
    });
  }
}
