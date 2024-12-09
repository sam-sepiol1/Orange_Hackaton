const map = L.map('map').setView([48.80, 2.29], 12);

// Chargement des tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Liste des points avec coordonnées et rayon
const points = [
    // { name: "Vanves", lat: 48.808, lng: 2.29, radius: 500 },
    { name: "Gardens", lat: 48.816, lng: 2.305, radius: 2000 },
    // { name: "Clamart", lat: 48.80, lng: 2.271, radius: 500 },
    // { name: "Bagneux", lat: 48.793, lng: 2.305, radius: 500 },
    // { name: "Blagnac 1", lat: 43.63541, lng: 1.37472, radius: 1000 },
    // { name: "Blagnac 2", lat: 43.63480, lng: 1.38681, radius: 1000 },
    // { name: "Blagnac 3", lat: 43.63509, lng: 1.39761, radius: 1000 },
    // { name: "Blagnac 4", lat: 43.63853, lng: 1.40052, radius: 1000 },
    // { name: "Toulouse 1", lat: 43.60442, lng: 1.44338, radius: 1000 },
    // { name: "Toulouse 2", lat: 43.58756, lng: 1.49353, radius: 1000 },
    // { name: "Toulouse 3", lat: 43.57815, lng: 1.43142, radius: 1000 },
    // { name: "Toulouse 4", lat: 43.64245, lng: 1.45734, radius: 1000 },
    // { name: "Paris Eiffel", lat: 48.86074, lng: 2.29485, radius: 1000 },
    // { name: "Paris Triomphe", lat: 48.87452, lng: 2.29511, radius: 1000 },
    // { name: "Paris Pantheon", lat: 48.84674, lng: 2.34644, radius: 1000 }
];

// Ajout des points sur la carte
points.forEach(point => {
    // Ajouter un cercle autour de chaque point
    L.circle([point.lat, point.lng], {
        color: '#f28b05',
        fillColor: '#f28b05',
        fillOpacity: 0.4,
        radius: point.radius
    }).addTo(map);

    // Ajouter un marqueur
    L.marker([point.lat, point.lng]).addTo(map)
        .bindPopup(`<b>${point.name}</b><br>Rayon : ${point.radius} mètres`);
});

// Centrer la carte sur Gardens
map.setView([48.80, 2.29], 12);