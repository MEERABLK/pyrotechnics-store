
import { fetchData } from "./fetchWrapper.js";

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





    const placesUri = "/data/places.json";
    const locations = await fetchData(placesUri);

    console.log(locations);
    console.log(locations.categories);
    console.log(locations.places);

    
    renderLocations(map,locations);

}

function renderLocations(map,locations)
{
//loop overe locations places array and for each place 
    //create a marker object and add it to the map the marker 
    //needs to be populated with its corresponding

    // const category = locations.categories.find(category => category.id === place.categoryId);
    // console.log(category.markerIcon);
   
   
    var myIcon = L.icon({
        iconUrl: '/markers/treasurechest.png',
      
    });

    
    locations.places.forEach(place => {
        
        const coords = place.point.coordinates.split(','); 
      //index 1 of 
        const lat = parseFloat(coords[1]); 

// longitude i
        const lon = parseFloat(coords[0]);
    
        L.marker([lat, lon], {icon: myIcon}).addTo(map)
    .bindPopup(`${place.name} <br>${place.description}`)
    .openPopup();


    });
}
