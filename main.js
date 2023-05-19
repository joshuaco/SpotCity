import { fetchCities, fetchData } from './api.js';

const map = L.map('map').setView([40.71427, -74.00597], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/* L.marker([40.758895, -73.985131])
  .addTo(map)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup(); */

const showCities = (cities) => {
  const selectCities = document.querySelector('#select-cities');

  cities.sort().forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    selectCities.appendChild(option);
  });
};

const showEvents = (events) => {
  const eventsContainer = document.querySelector('#events-container');
  events.forEach((event) => {
    const eventName = document.createElement('p');
    const eventLocation = event._embedded.venues[0].location;
    eventName.textContent = event.name;
    eventsContainer.appendChild(eventName);

    showMarkers(eventLocation);
  });
};

const showMarkers = (coord) => {
  const marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
};

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', async () => {
  /* const searchInput = document.querySelector('#search-input');
  const city = searchInput.value; */
  const selectCities = document.querySelector('#select-cities');
  const selectedCity = selectCities.value;

  const selectedDate = document.querySelector('#date-picker').value;

  const events = await fetchData(selectedCity);

  if (selectedDate !== "") {
    const filteredEvents = events.filter(
      (event) => event.dates.start.localDate === selectedDate
    );
    showEvents(filteredEvents);
  } else {
    showEvents(events);
  }
});

const getData = async () => {
  try {
    const cities = await fetchCities();
    showCities(cities);
  } catch (error) {
    console.log('Error to obtain cities: ', error);
  }
};

getData();
