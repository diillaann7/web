function datenholen() {
  const container = document.getElementById("produkteListe");
  container.innerHTML = "";

  fetch("http://localhost:8080/daten")
    .then((res) => res.json())
    .then((daten) => {
      daten.forEach((produkt) => {
        const ul = document.createElement("ul");

        const liName = document.createElement("li");
        liName.textContent = produkt.name;

        const liPreis = document.createElement("li");
        liPreis.textContent = produkt.preis + " €";

        const liBeschreibung = document.createElement("li");
        liBeschreibung.textContent = produkt.beschreibung;

        const kaufenBtn = document.createElement("button");
        kaufenBtn.textContent = "Kaufen";
        kaufenBtn.addEventListener("click", () => kaufen(produkt.id));

        ul.appendChild(liName);
        ul.appendChild(liPreis);
        ul.appendChild(liBeschreibung);
        ul.appendChild(kaufenBtn);

        container.appendChild(ul);
      });
    })
    .catch((err) => console.error("Fehler beim Laden der Produkte:", err));
}

// Login-Formular Submit Event Listener mit preventDefault
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Verhindert das Neuladen der Seite

  const name = document.getElementById("nameInput").value;
  const password = document.getElementById("passwordInput").value;

  loginabfrage(name, password);
});

function loginabfrage(name, password) {
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name1: name, password1: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.succes) {
        document.getElementById("bereich").classList.remove("deaktiviert");
        ladeWarenkorb(); // Warenkorb nach erfolgreichem Login laden
      } else {
        alert("Login fehlgeschlagen!");
      }
    })
    .catch((err) => console.error(err));
}

// Produkt kaufen Funktion
function kaufen(id) {
  fetch("http://localhost:8080/kaufen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.succes) {
        ladeWarenkorb(); // Warenkorb nach Kauf aktualisieren
      } else {
        alert(data.message || "Fehler beim Kauf");
      }
    })
    .catch((err) => console.error("Fehler beim Kauf:", err));
}

// Warenkorb laden (aus Backend holen und anzeigen)
function ladeWarenkorb() {
  fetch("http://localhost:8080/warenkorb")
    .then((res) => res.json())
    .then((warenkorb) => {
      const container = document.getElementById("warenkorbListe");
      container.innerHTML = "";

      if (warenkorb.length === 0) {
        container.innerHTML = "<li>Warenkorb ist leer</li>";
        return;
      }

      warenkorb.forEach((produkt) => {
        const li = document.createElement("li");
        li.textContent = produkt.name + " - " + produkt.preis + " €";
        container.appendChild(li);
      });
    })
    .catch(() => {
      document.getElementById("warenkorbListe").innerHTML = "<li>Warenkorb leer</li>";
    });
}
