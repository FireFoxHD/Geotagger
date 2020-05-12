let markerArray=[];
let popupArray=[];
const mymap = L.map('mapid').setView([0, 0], 1);
const attribution ='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
const socket = io.connect('http://localhost:3000');   

window.onload = ()=>{
    //loadmap
    console.log("Loading map data");
    socket.emit('loadMap', {});
};

//listen for socket event
socket.on("mapData",(data)=>{
    console.log("Recieved map data");
    console.log(data);
    for(let i = 0; i<data.length; i++){
        console.log(data[i].lat, data[i].lon);
        markerArray[i] = L.marker([data[i].lat,data[i].lon]).addTo(mymap);
        popupArray[i] = markerArray[i].bindPopup(`${data[i].message}`);
        popupArray[i].openPopup();
    }
})