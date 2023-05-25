import { fetchCities, fetchData, fetchEventTypes, fetchGeoEvents } from './api.js';
import { showLocation, showMarkers } from './map.js';

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
  eventsContainer.innerHTML = `
    <h2>Events in ${events[0]._embedded.venues[0].city.name}</h2>`;

  events.forEach((event) => {
    const eventContainer = document.createElement('div');
    eventContainer.classList.add('event-container');
    const eventInfo = document.createElement('div');
    eventInfo.classList.add('event-info');

    const eventImage = document.createElement('img');
    eventImage.classList.add('event-img');

    const eventName = document.createElement('p');
    eventName.classList.add('event-name');
    const eventTime = document.createElement('p');
    eventTime.classList.add('event-time');
    const eventDate = document.createElement('p');
    eventDate.classList.add('event-date');
    const eventPlace = document.createElement('p');
    eventPlace.classList.add('event-place');
    const eventLocation = event._embedded.venues[0].location;

    for (const image of event.images) {
      if (image.width >= 300) {
        eventImage.src = image.url;
        eventImage.alt = event.name;
      }
    }

    eventName.textContent = event.name;
    eventDate.textContent = event.dates.start.localDate;
    eventTime.textContent = event.dates.start.localTime;
    eventPlace.textContent = event._embedded.venues[0].name;

    eventInfo.appendChild(eventDate);
    eventInfo.appendChild(eventTime);
    eventInfo.appendChild(eventName);
    eventInfo.appendChild(eventPlace);

    eventContainer.appendChild(eventImage);
    eventContainer.appendChild(eventInfo);
    eventsContainer.appendChild(eventContainer);

    eventContainer.addEventListener("click", () => {
      
      showMarkers(eventLocation, event.name, event._embedded.venues[0].name);
      showLocation(eventLocation);
    })

    showMarkers(
      eventLocation,
      event.name,
      event._embedded.venues[0].name
    );
    showLocation(eventLocation); // Center map on location
  });
};

const showEventTypes = (eventType) => {
  const selectEvent = document.querySelector('#select-type-events');

  eventType.forEach((event) => {
    const option = document.createElement('option');
    option.value = event;
    option.textContent = event;
    selectEvent.appendChild(option);
  });
};

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', async () => {
  const selectCities = document.querySelector('#select-cities');
  const selectedCity = selectCities.value;

  const selectTypeEvents = document.querySelector('#select-type-events');
  const selectedEventType = selectTypeEvents.value;

  console.log(selectedEventType);

  const selectedDate = document.querySelector('#date-picker').value;

  const events = await fetchData(selectedCity, selectedEventType);

  if (selectedDate !== '') {
    const filteredEvents = events.filter(
      (event) => event.dates.start.localDate === selectedDate
    );
    filteredEvents.length <= 0
      ? alert('No events that day')
      : showEvents(filteredEvents);
  } else {
    showEvents(events);
  }
});

const getData = async () => {
  try {
    const cities = await fetchCities();
    showCities(cities);
    const eventType = await fetchEventTypes();
    showEventTypes(eventType);
    const geoEvent = await fetchGeoEvents();
    showEvents(geoEvent);
  } catch (error) {
    console.log('Error to obtain cities: ', error);
  }
};

getData();
