import { fetchData } from './api.js';

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
  const searchInput = document.querySelector('#search-input');
  const city = searchInput.value;

  const events = await fetchData(city);
  console.log(events);
  showEvents(events);
});
