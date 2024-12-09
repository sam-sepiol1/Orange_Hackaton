import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json()); 


app.listen(3001, () => {
    console.log(`serveur démarré sur localhost:${3001}`);
})

const reponseGeofencingEnter = {
    "type": "org.camaraproject.geofencing-subscriptions.v0.area-entered",
    "id": "07cbff91-0793-4580-88d2-4eea3f7cf4ac",
    "source": "com.orange.camara.geofencing",
    "specversion": "1.0",
    "datacontenttype": "application/json",
    "data": {
      "device": {
        "phoneNumber": "+33699901032"
      },
      "area": {
        "areaType": "CIRCLE",
        "center": {
          "latitude": 48.816,
          "longitude": 2.305
        },
        "radius": 2000
      },
      "subscriptionId": "86eccea4-efe7-4556-872d-3b03e281914f"
    },
    "time": "2024-12-04T13:32:40.030990356Z"
  }

  const reponseGeofencingLeft = {
    "type": "org.camaraproject.geofencing-subscriptions.v0.area-left",
    "id": "07cbff91-0793-4580-88d2-4eea3f7cf4ac",
    "source": "com.orange.camara.geofencing",
    "specversion": "1.0",
    "datacontenttype": "application/json",
    "data": {
      "device": {
        "phoneNumber": "+33699901032"
      },
      "area": {
        "areaType": "CIRCLE",
        "center": {
          "latitude": 48.816,
          "longitude": 2.305
        },
        "radius": 2000
      },
      "subscriptionId": "86eccea4-efe7-4556-872d-3b03e281914f"
    },
    "time": "2024-12-04T13:32:40.030990356Z"
  }


setInterval(() => {
    
    fetch('http://localhost:3000/sub',{
      headers: {
        'Content-Type': 'application/json',
      },
        method: "post",
        body: JSON.stringify(reponseGeofencingEnter),
    }).catch((err) => console.error(err))
    console.log("sent enter")
    setTimeout(() => {
        fetch('http://localhost:3000/sub',{
          headers: {
            'Content-Type': 'application/json',
          },
            method: "post",
            body: JSON.stringify(reponseGeofencingLeft)
        }).catch((err) => console.error(err))
        console.log("sent left")
    }, 5000);


}, 10000);

setInterval(() => {
  console.log("alert");
  
  fetch('http://localhost:3000/alert',{
    headers: {
      'Content-Type': 'application/json',
    },
      method: "post",
    body: JSON.stringify({
      "phoneNumber": "+33699901032"
    })
  })
}, 1000);

