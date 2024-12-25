// filepath: /myapp/index.js
const express = require("express");
const session = require("express-session");

const app = express();
const port = 4000;

app.use(express.json());

app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.post("/submit", (req, res) => {
	const data = req.body;

	if (data && data.name && data.email) {
		req.session.validatedData = data;
		res.status(200).send("Data validated and stored in session.");
	} else {
		res.status(400).send("Invalid data.");
	}
});

app.get("/data", (req, res) => {
	if (req.session.validatedData) {
		res.status(200).json(req.session.validatedData);
	} else {
		res.status(404).send("No data found.");
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
