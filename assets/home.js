var cityTextEl = $("#where");
  
var cities = [];

var cityFormEl=document.querySelector("#city-search");
var cityInputEl=document.querySelector("#city-name");
var weatherContainerEl=document.querySelector("#current-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday");
var pastSearchButtonEl = document.querySelector("#past-search");
  
  
  
  if (!citiesArray.includes(city)) {
    citiesArray.push(city);
  } else {
    console.log("its a repeat");
  }

//set to local storage (stringify it)
  localStorage.setItem("city", JSON.stringify(citiesArray));
  renderLocalStorage();

function renderLocalStorage() {
  var savedCities = JSON.parse(localStorage.getItem("city"));

  if (savedCities === null) {
    console.log("nothing in local storage");
  } else {
//****** Auto complete from local storage ******//
    $(function () {
      $("#where").autocomplete({
        source: savedCities,
      });
    });
  }
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
  //  Code to get values
  searchInputVal = document.querySelector('#searchCityID').value;
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return; }
    var queryString = searchInputVal
    location.assign(queryString);
  }
  searchBtn.addEventListener('click', handleSearchFormSubmit);

  var getCityWeather = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });

        var displayWeather = function(weather, searchCity){
          //clear old content
          weatherContainerEl.textContent= "";  
          citySearchInputEl.textContent=searchCity;
       
          //console.log(weather);
       
          //create date element
          var currentDate = document.createElement("span")
          currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
          citySearchInputEl.appendChild(currentDate);
       
          //create an image element
          var weatherIcon = document.createElement("img")
          weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
          citySearchInputEl.appendChild(weatherIcon);
       
          //create a span element to hold temperature data
          var temperatureEl = document.createElement("span");
          temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
          temperatureEl.classList = "list-group-item"
         
          //create a span element to hold Humidity data
          var humidityEl = document.createElement("span");
          humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
          humidityEl.classList = "list-group-item"
       
          //create a span element to hold Wind data
          var windSpeedEl = document.createElement("span");
          windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
          windSpeedEl.classList = "list-group-item"
       
          //append to container
          weatherContainerEl.appendChild(temperatureEl);
       
          //append to container
          weatherContainerEl.appendChild(humidityEl);
       
          //append to container
          weatherContainerEl.appendChild(windSpeedEl);
       
          var lat = weather.coord.lat;
          var lon = weather.coord.lon;
          getUvIndex(lat,lon)
       }
       
       var getUvIndex = function(lat,lon){
           var apiKey = "844421298d794574c100e3409cee0499"
           var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
           fetch(apiURL)
           .then(function(response){
               response.json().then(function(data){
                   displayUvIndex(data)
                  // console.log(data)
               });
           });
           //console.log(lat);
           //console.log(lon);
          }
    })}

    var get5Day = function(city){
      var apiKey = "844421298d794574c100e3409cee0499"
      var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
  
      fetch(apiURL)
      .then(function(response){
          response.json().then(function(data){
             display5Day(data);
          });
      });
  };

  var display5Day = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }
  }