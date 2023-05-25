const API_KEY = 'A3NgJmJTTlUxoGPjq6LfitVrAOA7wShD';

const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

const fetchData = async (city, eventType) => {
  try {
    const params = { //Object JSON
      apikey: API_KEY,
      country: 'US',
      city: city,
      classificationName: eventType,
      size: 15, // API Limit 200 due CORS policy's
    };

    //JSON ==> text(url)
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${queryString}`);
    const data = await response.json();

    const events = data._embedded.events;

    console.log(events);

    return events;
  } catch (error) {
    alert("No events found with this requirements");
  }
};

const fetchCities = async () => {
  try {
    const params = {
      apikey: API_KEY,
      country: 'US',
      size: 100, // API Limit 200 due CORS policy's
    };

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${queryString}`);
    const data = await response.json();

    const events = data._embedded.events;
    const cities = events.map(event => event._embedded.venues[0].city.name); 
    // Elimina ciudades duplicadas
    const uniqueCities = [...new Set(cities)];

    return uniqueCities;
  } catch (error) {
    console.log(error);
  }
};

const fetchEventTypes = async () => {
  const params = {
    apikey: API_KEY,
    country: 'US',
    size: 100,
  };

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}?${queryString}`);
  const data = await response.json();
  const eventTypes = data._embedded.events.map(
    (evento) => evento.classifications[0].genre.name
  );
  const uniqueEventTypes = [...new Set(eventTypes)]; // Eliminar tipos de eventos duplicados

  return uniqueEventTypes;
};

export { fetchData, fetchCities, fetchEventTypes };
