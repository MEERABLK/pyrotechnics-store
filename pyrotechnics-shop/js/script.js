import { initLeafletMap } from "./modules/map.js";
import { fetchData } from "./modules/fetchWrapper.js";
import { initHomePage } from "./modules/index.js";
import { initProductPage } from "./modules/product.js";
import { initCartPage } from "./modules/cart.js";
import { initShopPage } from "./modules/shop.js";
import { handleLogin } from "./modules/login.js";
import { handleContact } from "./modules/contact.js";
import { handleCheckout } from "./modules/checkout.js";
import { handleCheckoutButton } from "./modules/cart.js";
import { theme } from "./modules/theme.js";

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  theme();
    const page = document.querySelector('html')?.dataset.page;

    if (page === "map") {
        initLeafletMap(); // only run map on the map page
    }
    console.log("initializing the app...");
    //only run on home page
    if (page === "home") {
        initHomePage();
    }
    if (page === "product") {
        initProductPage();
    }
    if (page === "login") {
        handleLogin();
    }
    if (page === "contact") {
        handleContact();
    }
    if (page === "checkout") {
        handleCheckout();
    }
    if (page === "cart") {
        initCartPage();
        handleCheckoutButton();
    }
    if (page === "shop") {
        initShopPage();
    }
    const btnShow = document.getElementById("btn-fetch-launches");
if (btnShow) {
  btnShow.addEventListener('click', fetchShows);
}
}






async function fetchShows() 
{
    console.log("fetching shows...");
    const uri = "https://ll.thespacedevs.com/2.3.0/launches/?format=json";
    const data = await fetchData(uri);

    //results is the array name we fetch from JSON
        const entries = data.results.slice(0,3);
        parseShows(entries);
    }


function parseShows(shows) {
    const tblshows = document.getElementById("table-launches");
    tblshows.innerHTML = "";
    
    shows.forEach(show => {
        const tr = document.createElement('tr');
        createNewElement(tr, 'td', show.name);
        //to access the inner objects of json and their attribute use .
        createNewElement(tr, 'td', show.mission.type);
        createNewElement(tr, 'td', show.rocket.configuration.name);
        createNewElement(tr, 'td', show.mission.orbit.name);
        createNewElement(tr, 'td', show.status.name);
       

        const tdimg = createNewElement(tr, 'td', "");

        const siteLinkImg = createNewElement(tdimg, 'img', "");
        siteLinkImg.src = show.image.image_url;

        //modifying styles by element(const in javascript)
        siteLinkImg.style.width = '100px';
        siteLinkImg.style.width = '60px';

        tblshows.appendChild(tr);
    });
}

function createNewElement(parent, eleName, content) 
{
    const newElem = document.createElement(eleName);

    newElem.textContent = content;

    parent.appendChild(newElem);

    return newElem;
}
