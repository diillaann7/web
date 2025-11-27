# Warenkorb-Projekt mit Node.js, Express & MySQL

Dieses Projekt implementiert einen einfachen **Warenkorb** mit **Backend** (Node.js, Express, MySQL) und **Frontend** (HTML, CSS). Nutzer können sich einloggen, Produkte ansehen, Produkte kaufen und ihren Warenkorb verwalten.

---

## 🛠 Technologien

- **Backend:** Node.js, Express.js, Sequelize ORM, MySQL  
- **Frontend:** HTML, CSS, JavaScript  
- **Datenpersistenz:** MySQL für Nutzer, JSON-Dateien für Produkte & Warenkorb  
- **CORS:** Ermöglicht Anfragen vom Frontend  

---

## 🚀 Features

### Backend-Funktionalität

- **Login prüfen:** POST `/login`  
  - Prüft Nutzername & Passwort
- **Produkte anzeigen:** GET `/daten`  
  - Liest Produkte aus `produkte.json`
- **Produkt kaufen:** POST `/kaufen`  
  - Fügt Produkt zum Warenkorb (`warenkorb.json`) hinzu
- **Warenkorb abrufen:** GET `/warenkorb`  
  - Gibt alle gekauften Produkte zurück

---

### Frontend-Funktionalität

- Anzeige aller Produkte  
- Kauf von Produkten per Button  
- Warenkorbübersicht  
- Login-Funktion für Benutzer  
- Responsives Layout mit flexiblen Bereichen  

---
