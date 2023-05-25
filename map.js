const map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const getLocation = (lat, lng) => {
  map.setView([lat, lng], 10);

  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup('You are here').openPopup();
};

if ('geolocation' in navigator) {
  //API del navegador si tiene
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords; //destructuring position.coords.latitude
      getLocation(latitude, longitude);
    },
    (error) => {
      console.log('Error obtaining location: ', error);
    }
  );
} else {
  console.log('Geolocation not supported in your browser');
}

const showMarkers = (coord, eventName, eventPlace) => {
  const marker = L.marker([coord.latitude, coord.longitude])
    .addTo(map)
    .bindPopup(
      `<h5>${eventName}</h5>
       <h6>${eventPlace}</h6>`
    )
    .openPopup();
};

const showLocation = (coord) => {
  map.setView([coord.latitude, coord.longitude], 12, { animation: true });
};

export { showMarkers, showLocation };
