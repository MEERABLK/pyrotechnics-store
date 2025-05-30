
import { fetchData } from "./fetchWrapper.js";

let markers = new Map();

export async function initLeafletMap()
{
console.log("inittializing the map...");
// init 45.508888, -73.561668
//45.522041, -73.534706
var map = L.map('leaflet-map').setView([45.508888, -73.561668], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



//45.3167, Longitude -73.2667​
L.marker([45.508888,  -73.561668]).addTo(map)
    .bindPopup('Montreal')
    .openPopup();





    const placesUri = "../data/places.json";
    const locations = await fetchData(placesUri);

    console.log(locations);
    console.log(locations.categories);
    console.log(locations.places);

    
    renderLocations(map,locations);

}
displayLocations();

function renderLocations(map, locations)
{
//loop overe locations places array and for each place 
    //create a marker object and add it to the map the marker 
    //needs to be populated with its corresponding

    // const category = locations.categories.find(category => category.id === place.categoryId);
    // console.log(category.markerIcon);
   
    
    
    locations.places.forEach(place => {
        let category = locations.categories.find(c => c.id == parseInt(place.categoryId));
        let iconFile = category.markerIcon;
        let myIcon = L.icon({
            iconUrl: iconFile,
        })
        
        
        const coords = place.point.coordinates.split(','); 
      //index 1 of 
        const lat = parseFloat(coords[1]); 

// longitude i
        const lon = parseFloat(coords[0]);
    
        let placeMarker = L.marker([lat, lon], {icon: myIcon});
        placeMarker.addTo(map).bindPopup(`${place.name} <br>${place.description}`);
        markers.set(place.locationId, placeMarker);


    });
}

function displayLocations() {
    fetch("../data/places.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parses JSON
    })
    .then(data => {
        const placesList = document.getElementById("places-list");
        placesList.innerHTML="";
        data.places.forEach(place => {
            let placesListItem = document.createElement("li");
            placesListItem.textContent = place.name;
            placesListItem.id = place.locationId;
            placesList.appendChild(placesListItem);

            placesListItem.addEventListener('click', () =>
            {
                navigateToLocation(place.locationId);
            });
        });
    })
}

function navigateToLocation(id) {
        let marker = markers.get(id);
        marker.openPopup();
}
