const sendButton = document.getElementById("send");
const comment = document.getElementById("comment");
const msgBox = document.getElementById("message");

comment.addEventListener("input", ()=>{
    
    if(comment.value.length<1 || comment.value==" "){
        sendButton.disabled=true;
        msgBox.textContent="Please Enter a value";
    }else{
        sendButton.disabled=false;
        msgBox.textContent="";
    }
})


if(!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
} else {
    console.log('Locating…');
}

const latitude = document.getElementById("lat");
const longitude = document.getElementById("lon");        
let data = {};
let lat;
let lon;

navigator.geolocation.getCurrentPosition((position)=>{
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    latitude.textContent=lat;
    longitude.textContent=lon;
}, error=>console.log(`There was an error ${error}`));



document.getElementById("send").addEventListener("click", async ()=>{
    const message = comment.value;
    data = {lat, lon, message};
    console.log(data);
    const options = {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)//the data param is an object
    }
    const response = await fetch('/api', options); //options specify a post request
    console.log("receiving response");
    const jsonData = await response.json();
    console.log(jsonData);   
});
