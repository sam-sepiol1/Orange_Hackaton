import dotenv from 'dotenv';

dotenv.config();
// Fonction asynchrone pour envoyer une requête de souscription à l'API Orange
async function fetchOrangeToken() {
    try {
        // Requête POST à l'API avec en-têtes et corps de requête
        const response = await fetch("https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/simulated", {
            method: 'POST',
            headers: {
                "Authorization": process.env.TOKEN,                
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // Données de configuration de la souscription
                "protocol": "HTTP",
                "sink": "https://webhook.site/2fb8e4e2-1786-499b-81a7-c7138f596829", // URL pour recevoir les notifications
                "types": ["org.camaraproject.geofencing-subscriptions.v0.area-left"],
                "config": {
                    "subscriptionDetail": {
                        "device": { "phoneNumber": "+33699901032" },
                        "area": { 
                            "areaType": "CIRCLE", 
                            "center": { "latitude": "48.816", "longitude": "2.305" },
                            "radius": 2000 
                        }
                    },
                    "initialEvent": true,
                    "subscriptionMaxEvents": 10,
                    "subscriptionExpireTime": "2025-01-11T19:08:47.612Z"
                }
            })
        });
  
        // Vérifie si la requête a échoué
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
        return await response.json(); // Retourne les données JSON
    } catch (error) {
        console.error('Error fetching token:', error.message); // Affiche l'erreur
    }
  }
  
  // Fonction pour définir un délai avant le prochain rafraîchissement
  function refreshIn() {
    if (timerID) clearTimeout(timerID); // Supprime le précédent timer
    timerID = setTimeout(() => { toRefresh = true; }, 3500 * 1000); // Déclenche après 3500 secondes
    return timerID;
  }
  
  // Fonction principale pour récupérer et afficher le token
  async function getOrangeToken() {
    const data = await fetchOrangeToken(); // Récupère les données via fetchOrangeToken
    console.log(JSON.stringify(data, null, 2)); // Affiche les données dans la console
    return data;
  }
  
  // Appel initial pour démarrer le processus
  getOrangeToken();
  