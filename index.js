/* Python Implementation, comment out js implementaion below before running

    const spawn = require("child_process").spawn;
    // you can add arguments with spawn('python',["path/to/script.py", arg1, arg2, ...])
    const pythonProcess = spawn('python',["database_manager.py"]);

*/

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database/data_source.db");

let myString = "[\n";
db.all("SELECT * FROM Personal_data", function (err, rows) {
  let myCounter = 0;
  rows.forEach(function (row) {
    // console.log(row.extID + ": " + row.name + ": " + row.hyperlink + ": " + row.about + ": " + row.image + ": " + row.language);
    myString =
      myString +
      '{\n"ID":' +
      row.ID +
      ',\n"Username":"' +
      row.Username +
      '",\n"Email":"' +
      row.Email +
      '",\n"Avatar":"' +
      row.Avatar;
    myCounter++;
    if (myCounter == rows.length) {
      myString = myString + '"\n}\n';
    } else {
      myString = myString + '"\n},\n';
    }
  });

  // console.log(myString);
  var fs = require("fs");
  fs.writeFile("public/frontEndData.json", myString + "]", function (err) {
    if (err) {
      console.log(err);
    }
  });
});

const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  res.sendFile(path.join(__dirname, "public/friends.html"));
  res.sendFile(path.join(__dirname, "public/leaderboard.html"));
  res.sendFile(path.join(__dirname, "public/mystats.html"));
});

app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.q || "";

  try {
    let query = "SELECT * FROM your_table LIMIT 50";
    let params = [];

    // If a search term IS provided, filter the SQL query
    if (searchTerm && searchTerm.trim() !== "") {
      query =
        "SELECT Personal_Data.Username, Personal_Data.Avatar, Fitness_Data.Steps_total FROM Personal_Data INNER JOIN Fitness_Data ON Personal_Data.ID=Fitness_Data.ID ORDER BY Fitness_Data.Steps_total DESC; ?";
      params = [`%${searchTerm}%`]; // Note: Use $1 instead of ? if using PostgreSQL
    }

    const [rows] = await db.execute(query, params);
    res.json(rows); // Send the SQL results back as JSON
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/add.html", function (req, res) {
  db.serialize(() => {
    db.run(
      "INSERT INTO contact_list(email,name) VALUES(?,?)",
      [req.body.email, req.body.name],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        res.send(
          "Thank you " +
            req.body.name +
            " we have added your email " +
            req.body.email +
            " to our distribution list.",
        );
      },
    );
  });
});

app.listen(8888, () =>
  console.log(
    "Server is running on Port 8888, visit http://localhost:8888/ or http://127.0.0.1:8888 to access your website",
  ),
);
