import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// Do not change code below this line
// 1. Route for empty date parameter (e.g., /api or /api/)
app.get("/api", function (req, res) {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// 2. Route for provided date parameter (e.g., /api/2015-12-25)
app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // Check if dateParam is a purely numeric Unix timestamp string
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // Try to parse it as a standard date string
    date = new Date(dateParam);
  }

  // Handle Invalid Dates
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid unix and utc keys
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
