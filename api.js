const API_KEY = 'A3NgJmJTTlUxoGPjq6LfitVrAOA7wShD';

const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

const fetchData = async (city) => {
  try {
    const params = {
      apikey: API_KEY,
      city: city,
      country: 'US',
      size: 50, // API Limit due CORS policy's
    };
    
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${queryString}`);
    const data = await response.json();

    const events = data._embedded.events;
    return events;
  } catch (error) {
    console.log(error);
  }
};

export { fetchData };
