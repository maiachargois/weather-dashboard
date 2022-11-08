var cityTextEl = $("#where");
  
  
  
  
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