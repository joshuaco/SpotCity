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

const showEvents = async () => {
  const events = await fetchData();
  console.log(events);

  events.forEach((event) => {
    const eventList = document.createElement('p');
    const marker = L.marker([
      event._embedded.venues[0].location.latitude,
      event._embedded.venues[0].location.longitude,
    ]).addTo(map);
    eventList.textContent = event.name;
    console.log(eventList);
  });
};

showEvents();
