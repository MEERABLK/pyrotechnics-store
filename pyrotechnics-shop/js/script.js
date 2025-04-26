document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("initializing the app...");
    const btnShow = document.getElementById("btn-fetch-launches");
    btnShow.addEventListener('click', fetchShows);
}

async function fetchData(resourceUri) {
    try 
    {
        const response = await fetch(resourceUri);
        if (!response.ok) 
            {
            throw new Error(`Request failed! ${response.status}`);
        }
        const data = await response.json();
        return data;
    } 
    catch (error) 
    {
        console.log(error.message);
    }
}

async function fetchShows() 
{
    console.log("fetching shows...");
    const uri = "https://ll.thespacedevs.com/2.3.0/launches/?format=json";
    const data = await fetchData(uri);

    //results is the array name we fetch from JSON
        const entries = data.results;
        parseShows(entries);
    }


function parseShows(shows) {
    const tblshows = document.getElementById("table-launches");
    tblshows.innerHTML = "";
    
    shows.forEach(show => {
        const tr = document.createElement('tr');
        createNewElement(tr, 'td', show.id);
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
