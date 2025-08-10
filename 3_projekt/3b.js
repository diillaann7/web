const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const fs = require("fs");
const Sequelize = require("sequelize");

// Sequelize Setup
const seq = new Sequelize("mydb", "root", "#Dilan.othman2005", {
  dialect: "mysql",
  logging: false,
});

class Benutzer extends Sequelize.Model {}

Benutzer.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    password: {
      type: Sequelize.DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    sequelize: seq,
    modelName: "arbeiter",
    tableName: "arbeiter",
    timestamps: false,
  }
);

// Tabelle synchronisieren & Testbenutzer anlegen (nur einmal, bei jedem Start)
seq.sync({ alter: true }).then(async () => {
  const exists = await Benutzer.findOne({ where: { name: "dilan" } });
  if (!exists) {
    await Benutzer.create({ name: "dilan", password: "dilan2005" });
  }
});

// Route: Produkte aus JSON laden
app.get("/daten", (req, res) => {
  try {
    const daten = JSON.parse(fs.readFileSync("produkte.json", "utf-8"));
    res.status(200).json(daten);
  } catch (e) {
    res.status(500).send("Es gab einen Fehler beim Laden der Produkte.");
  }
});

// Route: Login prüfen
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
      res.status(200).json({ succes: true, meldung: "Login erfolgreich" });
    } else {
      res.status(401).json({ succes: false, meldung: "Login fehlgeschlagen" });
    }
  } catch (error) {
    res.status(500).json({ succes: false, meldung: "Serverfehler" });
  }
});

// Route: Produkt kaufen (im Warenkorb speichern)
app.post("/kaufen", (req, res) => {
  try {
    const { id } = req.body;
    const produkte = JSON.parse(fs.readFileSync("produkte.json", "utf-8"));

    // Produkt anhand ID finden
    const produkt = produkte.find((p) => p.id === id);
    if (!produkt) {
      return res.status(404).json({ succes: false, message: "Produkt nicht gefunden" });
    }

    // Warenkorb laden oder neu erstellen
    let warenkorb = [];
    if (fs.existsSync("warenkorb.json")) {
      warenkorb = JSON.parse(fs.readFileSync("warenkorb.json", "utf-8"));
    }
    warenkorb.push(produkt);
    fs.writeFileSync("warenkorb.json", JSON.stringify(warenkorb, null, 2), "utf-8");

    res.status(200).json({ succes: true, message: "Produkt wurde gekauft", produkt });
  } catch (e) {
    res.status(500).json({ succes: false, message: "Fehler beim Kauf" });
  }
});

app.get("/warenkorb", (req, res) => {
  try {
    if (fs.existsSync("warenkorb.json")) {
      const warenkorb = JSON.parse(fs.readFileSync("warenkorb.json", "utf-8"));
      res.status(200).json(warenkorb);
    } else {
      res.status(200).json([]); // Leerer Warenkorb, wenn Datei nicht existiert
    }
  } catch (error) {
    res.status(500).json({ succes: false, message: "Fehler beim Laden des Warenkorbs" });
  }
});


app.listen(8080, () => {
  console.log("Server läuft auf Port 8080");
});
