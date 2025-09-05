const FILES = [
  "word_blacklist.txt",
  "categories.txt",
  "client_secret.json",
  "discord_api_creds.json",
  "keepa_keys.txt",
  "marken_blacklist.txt",
  "shop_blacklist.txt",
  "filters.txt",
];

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginMessage = document.getElementById("login-message");

  const loginSection = document.getElementById("login-section");
  const editorSection = document.getElementById("editor-section");
  const logoutBtn = document.getElementById("logout-btn");

  const fileSelect = document.getElementById("file-select");
  const fileContent = document.getElementById("file-content");
  const saveBtn = document.getElementById("save-btn");
  const saveMessage = document.getElementById("save-message");
  const restartBtn = document.getElementById("restart-btn");
  const killBtn = document.getElementById("kill-btn");
  const updateBtn = document.getElementById("update-btn");

  // Init file list
  FILES.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;
    fileSelect.appendChild(opt);
  });

  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = await login(usernameInput.value, passwordInput.value);
    if (ok) {
      loginMessage.textContent = "Login erfolgreich.";
      loginSection.classList.add("hidden");
      editorSection.classList.remove("hidden");
      loadFile(fileSelect.value);
    } else {
      loginMessage.textContent = "Login fehlgeschlagen!";
    }
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    logout();
    editorSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    loginMessage.textContent = "Abgemeldet.";
  });

  // Datei auswählen
  fileSelect.addEventListener("change", () => {
    loadFile(fileSelect.value);
  });

  // Speichern
  saveBtn.addEventListener("click", async () => {
    const currentFile = fileSelect.value;
    try {
      var res = await saveFileContent(currentFile, fileContent.value);
      console.log("Save response:", res);
      saveMessage.textContent = "Datei gespeichert!";
    } catch (err) {
      saveMessage.textContent = "Fehler beim Speichern: " + err;
    }
  });

  // Crawler neustarten
  restartBtn.addEventListener("click", async () => {
    try {
      console.log("Starte neu..");
      var res = await restartCrawler();
      console.log("Restart response:", res);
      alert("Crawler wurde neu gestartet: " + res);
    } catch (err) {
      alert("Fehler beim Neustarten: " + err);
    }
  });

  // Crawler stoppen
  killBtn.addEventListener("click", async () => {
    if (!confirm("Möchten Sie den Crawler wirklich stoppen?")) return;
    try {
      console.log("Stoppe Crawler..");
      var res = await killCrawler();
      console.log("Kill response:", res);
      alert("Crawler wurde gestoppt: " + res);
    } catch (err) {
      alert("Fehler beim Stoppen: " + err);
    }
  });

  // Crawler aktualisieren
  updateBtn.addEventListener("click", async () => {
    if (!confirm("Möchten Sie den Crawler wirklich aktualisieren?")) return;
    try {
      console.log("Aktualisiere Crawler..");
      var res = await updateCrawler();
      console.log("Update response:", res);
      alert("Crawler wurde aktualisiert: " + res);
    } catch (err) {
      alert("Fehler beim Aktualisieren: " + err);
    }
  });

  // Datei laden
  async function loadFile(file) {
    try {
      const content = await getFileContent(file);
      fileContent.value = content.substring(1, content.length); 
      saveMessage.textContent = "";
    } catch (err) {
      fileContent.value = "";
      saveMessage.textContent = "Fehler beim Laden: " + err;
    }
  }
});
