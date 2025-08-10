const express = require("express");
const app = express();
app.use(express.json()); // Wichtig, damit req.body funktioniert

const fs = require("fs");
const Sequelize = require("sequelize");

const seq = new Sequelize("mydb", "root", "dilan2005", {
    dialect: "mysql", // oder "postgres", je nach DB
    logging: false, // optional
});

class Benutzer extends Sequelize.Model {}

Benutzer.init(
    {
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: false,
            defaultValue: "",
        },
        password: {
            type: Sequelize.DataTypes.CHAR,
            allowNull: false,
            unique: false,
        },
    },
    {
        sequelize: seq,
        modelName: "arbeiter",
        tableName: "arbeiter",
    }, {
  timestamps: false   // <--- deaktiviert createdAt und updatedAt
}
);

// Optional: Synchronisieren der Tabellen (nur einmal ausführen!)
// seq.sync({ force: true }); // ACHTUNG: Löscht Daten bei force:true


 Benutzer.create({
     name: "dilan",
     password: "dilan2005",
 });

app.get("/daten", (req, res) => {
    try {
        const daten = JSON.parse(fs.readFileSync("produkte.json", "utf-8"));
        res.status(200).json(daten); // sendet JSON zurück
    } catch (e) {
        res.status(500).send("Es gab einen Fehler");
    }
});

app.post("/login", async (req, res) => {
    const { name1, password1 } = req.body;

    try {
        const find = await Benutzer.findOne({
            where: {
                name: name1,
                password: password1,
            },
        });

        if (find) {
            res.status(200).json({ succes: true, meldung: "Die Daten sind korrekt" });
        } else {
            res.status(401).json({ succes: false, meldung: "Die Daten sind nicht korrekt" });
        }
    } catch (error) {
        res.status(500).json({ succes: false, meldung: "Serverfehler" });
    }
});

app.listen(8080, () => {
    console.log("Der Server läuft auf Port 8080");
});
