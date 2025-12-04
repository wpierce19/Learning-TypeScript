import "./style.css"


const subBtn = document.getElementById("submit");
const userLoc = document.getElementById("location");
const weather = document.getElementById("Weather");

async function retrieveWeather (location)
{
    try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ location + '?key=8U623V27MN4V62RJ3YYRVTMAG', {mode:'cors'});
        const weatherData = await response.json();
        let address = weatherData.resolvedAddress;
        let desc = weatherData.description;
        console.log("Your Area is: " + address);
        console.log("Todays summary: "+desc);
        weatherData.days.forEach(day => {
            weather.innerHTML += `<p>Date: ${day.datetime}</p>`;
            weather.innerHTML += `<p>Temperature: ${day.temp}°F</p>`;
            weather.innerHTML += `<p>Humidity: ${day.humidity}%</p>`;
            weather.innerHTML += `<p>Wind Speed: ${day.windspeed} mph</p>`;
            weather.innerHTML += `<p>Conditions: ${day.conditions}</p>`;
            weather.innerHTML += '------------------------';
            

          });
    } catch(err){
        alert(err);
    } 
    
}

subBtn.addEventListener("click", (e) =>
{
    e.preventDefault();
    let field = userLoc.value;
    retrieveWeather(field);
})