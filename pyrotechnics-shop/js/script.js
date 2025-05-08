import { initLeafletMap } from "./modules/map.js";
import { fetchData } from "./modules/fetchWrapper.js";


document.addEventListener('DOMContentLoaded', initApp);

function initApp() {

    const page = document.querySelector('html')?.dataset.page;

    if (page === "map") {
        initLeafletMap(); // only run map on the map page
    }

    console.log("initializing the app...");
    const btnShow = document.getElementById("btn-fetch-launches");
    btnShow.addEventListener('click', fetchShows);
}


function toProduct()
{
    shows.forEach(show => 
        {
        const figures = document.getElementById("shopItemContainer");
        

        const tr = document.createElement('tr');
       const idCol = createNewElement(tr, 'td', show.id);
       const nameCol = createNewElement(tr, 'td', show.name);
       nameCol.setAttribute("data-showid",show.id);
       nameCol.addEventListener('click', (event) => {
            //arrow function to be passed as a callback
            //extract the shows id in question
            //once you have the id we need  store the shows id in a local storage 
            //to see on other page
            //load the show details(team:product details)
        
        const showId = event.target.getAttribute("data-showid");
        
        console.log(showId);

        localStorage.setItem("show-id",showId);

        window.location = "show-details.html";


        } );
    });
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


