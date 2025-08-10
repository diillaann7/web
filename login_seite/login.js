const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");

// Passwort anzeigen/verstecken
togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Live-Validierung Benutzername
usernameInput.addEventListener("input", () => {
    if (usernameInput.value.trim() === "") {
        usernameError.textContent = "Bitte Benutzername eingeben.";
    } else {
        usernameError.textContent = "";
    }
});

// Live-Validierung Passwort
passwordInput.addEventListener("input", () => {
    if (passwordInput.value.trim().length < 6) {
        passwordError.textContent = "Passwort muss mindestens 6 Zeichen haben.";
    } else {
        passwordError.textContent = "";
    }
});

// Formular absenden
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    if (usernameInput.value.trim() === "") {
        usernameError.textContent = "Bitte Benutzername eingeben.";
        valid = false;
    }

    if (passwordInput.value.trim().length < 6) {
        passwordError.textContent = "Passwort muss mindestens 6 Zeichen haben.";
        valid = false;
    }

    if (valid) {
        // Lade-Animation simulieren
        loginBtn.textContent = "Wird überprüft...";
        loginBtn.disabled = true;

        setTimeout(() => {
            alert("Login erfolgreich!");
            loginBtn.textContent = "Anmelden";
            loginBtn.disabled = false;
        }, 1500);
    }
});
