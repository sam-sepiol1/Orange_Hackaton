import express from "express";
import bodyParser from "body-parser";
import { insertData, fetchAllData } from "./db_actions.js";
import database from "./db/db_config.js";
import getOrangeToken from "./orangeAuth.js";

let orangeToken = await getOrangeToken()

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static("public"));
app.use(express.json());

// Handle POST request to insert data
app.post("/submit", (req, res) => {
	const { userInput } = req.body;

	insertData(userInput, (err, results) => {
		if (err) {
			return res.status(500).send("Error inserting data into the database.");
		}
		res.status(200).redirect("/map/map.html");
	});
});

// Optional: Handle GET request to fetch all data
app.get("/data", (req, res) => {
	fetchAllData((err, results) => {
		if (err) {
			return res.status(500).send("Error fetching data from the database.");
		}
		res.json(results);
	});
});

app.post("/sub", (req, res) => {
	const event = req.body;
	const eventType = event.type;
	const phoneNumber = event.data.device.phoneNumber;

	const isInZone = eventType === "org.camaraproject.geofencing-subscriptions.v0.area-entered" ? 1 : 0;
	database.query(`UPDATE numbers SET isInZone = ${isInZone} WHERE number = ${phoneNumber}`, (err, results) => {
		if (err) {
			console.error("Erreur lors de la mise à jour de isInZone:", err);
			return res.status(500).send("Erreur interne du serveur");
		}

		console.log(`isInZone mis à jour pour le numéro ${phoneNumber} : ${isInZone}`);
	});

	res.status(200).send("Notification traitée");
});

app.post("/alert", (req, res) => {
	const phoneNumber = req.body.phoneNumber;
	fetch("https://api.orange.com/camara/location-retrieval/orange-lab/v0/retrieve", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${orangeToken.access_token}`,
			"Cache-Control": "no-cache",
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			device: {
				phoneNumber: `${phoneNumber}` 
			}
		})
	})
	.then(response => response.json()) 
	.then(data => {
		let lat = data.area.center.latitude;
		let lon = data.area.center.longitude;
		console.log(lat, lon);
		return lat, lon; 
	})
	.catch(error => {
		console.error("Erreur lors de la requête:", error);
	});
	
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
