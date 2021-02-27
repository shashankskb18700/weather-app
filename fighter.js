const temp = document.querySelector(".temperature-degree");
const timezo = document.querySelector(".location-timezone");
const tempDe = document.querySelector(".temperature-description");
const icon = document.getElementById("icon")
const loct= document.getElementById("loct")


window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationTimeZone = document.querySelector('.location-timezone')

})



if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    console.log(lat, long)
    const proxy = "https://cors-anywhere.herokuapp.com";
    
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=d19e598ef4540029d92f3916f88b7237`;

    fetch(api)
      .then(response => { 
        return response.json();
      })
      .then(data => {
        let nw = Math.round(data.current.temp - 273.15);
        temp.innerText = nw;
        timezo.innerText = data.timezone ;
        console.log(data);
        // if (nw < 15) {
        //   tempDe.innerText = "Its cold"
        // } else if (15 <= nw <=25) {
        //   tempDe.innerText = " Moderate"
        // } else if (nw > 25) {
        //   tempDe.innerText = "Hot"
        // } else if (nw < 7) {
        //   tempDe.innerText= 'its very cold'
        // }
        let pressure = Math.abs(data.current.pressure - 1013);
        
        tempDe.innerHTML = `<p>pressure:: ${pressure} atm</p>`
        
        tempDe.innerHTML = tempDe.innerHTML +`<p>Humidity:: ${data.current.humidity} %</p>`;


        tempDe.innerHTML = tempDe.innerHTML + `<p>wind speed :: ${data.current.wind_speed} m/s</p>`;
        let ico = data.current.weather[0].icon;
        let web = `http://openweathermap.org/img/wn/${ico}@2x.png`;
        
        
        loct.innerHTML = loct.innerHTML + `<img src=${web}>`;
        loct.innerHTML =
          loct.innerHTML + `<P>${data.current.weather[0].description}</p>`;
    })
    
  

  });
}
// http://openweathermap.org/img/wn/10d@2x.png



//api key -d19e598ef4540029d92f3916f88b7237