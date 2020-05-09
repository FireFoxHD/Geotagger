const sendButton = document.getElementById("send");
const commentBox = document.getElementById("comment");
const errorMsg = document.getElementById("error");
const icon = document.getElementById("icon");
sendButton.disabled=true;

commentBox.addEventListener("input", ()=>{
    
    msgLength = commentBox.value.trim().length;
    
    if(msgLength<1){
        sendButton.disabled=true;
        errorMsg.textContent="Please Enter a value";
    }else{
        sendButton.disabled=false;
        errorMsg.textContent="";
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


commentBox.addEventListener("focus", ()=>{
    icon.classList.remove("icon-success");
    icon.classList.add("no-display");
});

sendButton.addEventListener("click", async ()=>{
    icon.classList.remove("no-display");
    icon.classList.add("icon-success");
    let message = commentBox.value.trim();
    data = {lat, lon, message};
    commentBox.value="";
    console.log("Sending: "+ data);
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
