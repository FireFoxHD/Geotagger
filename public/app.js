const sendButton = document.getElementById("send");
const messageBox = document.getElementById("comment");
const errorMsg = document.getElementById("error");
const successMsg = document.getElementById("success");
const icon = document.getElementById("icon");
const latitude = document.getElementById("lat");
const longitude = document.getElementById("lon");        
let data = {};
let lat;
let lon;
sendButton.disabled=true;


sendButton.addEventListener("click", ()=>{
    const socket = io.connect('http://localhost:3000'); //Initializing Websocket connection
    let message = messageBox.value.trim();
    data = {lat, lon, message};
    messageBox.value="";
    console.log("Sending data to server");
    socket.emit('mapData', data); //send the data with web socket
    successMsg.classList.remove("no-display");
    successMsg.classList.add("success");
});

messageBox.addEventListener("input", ()=>{
    msgLength = messageBox.value.trim().length;
    if(msgLength<1){
        sendButton.disabled=true;
        errorMsg.classList.remove("no-display");
        errorMsg.classList.add("error");
    
    }else{
        sendButton.disabled=false;
        errorMsg.classList.remove("error");
        errorMsg.classList.add("no-display");
    }
})

if(!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
}else{
    console.log('Locating…');
}

//document.body.innerHTML="<center> This application requires Location services to be enabled </center>";

navigator.geolocation.getCurrentPosition((position)=>{
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    latitude.textContent=lat.toFixed(5);
    longitude.textContent=lon.toFixed(5);
}, error=>console.log(`Location not allowed`));

messageBox.addEventListener("focus", ()=>{
    successMsg.classList.remove("success");
    errorMsg.classList.remove("error");
    successMsg.classList.add("no-display");
    errorMsg.classList.add("no-display");
});


