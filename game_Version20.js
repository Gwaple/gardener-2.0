let currentUser = null;

// --- Account Management ---
function hash(str) {
  let h = 0; for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0; return h.toString();
}
function getAccounts() {
  return JSON.parse(localStorage.getItem("garden_accounts") || "{}");
}
function saveAccounts(accounts) {
  localStorage.setItem("garden_accounts", JSON.stringify(accounts));
}
function login() {
  let u = document.getElementById("loginUser").value.trim();
  let p = document.getElementById("loginPass").value;
  let accounts = getAccounts();
  if (accounts[u] && accounts[u].pw === hash(p)) {
    currentUser = u;
    document.getElementById("authArea").style.display = "none";
    document.getElementById("gameArea").style.display = "";
    document.getElementById("welcome").textContent = "Welcome, " + currentUser + "!";
    loadGarden();
    document.getElementById("loginMsg").textContent = "";
  } else {
    document.getElementById("loginMsg").textContent = "Invalid username or password.";
  }
}
function logout() {
  currentUser = null;
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("authArea").style.display = "";
  document.getElementById("loginUser").value = "";
  document.getElementById("loginPass").value = "";
}
function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "";
  document.getElementById("registerMsg").textContent = "";
}
function showLogin() {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "";
  document.getElementById("loginMsg").textContent = "";
}
function register() {
  let u = document.getElementById("regUser").value.trim();
  let p = document.getElementById("regPass").value;
  let accounts = getAccounts();
  if (!u || !p) {
    document.getElementById("registerMsg").textContent = "Username and password required.";
    return;
  }
  if (accounts[u]) {
    document.getElementById("registerMsg").textContent = "Username already taken.";
    return;
  }
  accounts[u] = { pw: hash(p), garden: { plants: 0, plantsList: [] } };
  saveAccounts(accounts);
  document.getElementById("registerMsg").textContent = "Account created! Please login.";
  setTimeout(showLogin, 1200);
}

// --- Gardening Game Example (Replace with your real game logic!) ---
function loadGarden() {
  let accounts = getAccounts();
  let garden = accounts[currentUser].garden || { plants: 0, plantsList: [] };
  document.getElementById("garden").innerHTML =
    `You have grown <b>${garden.plants}</b> plants.<br>` +
    garden.plantsList.map((p,i) => `🌱 Plant #${i+1}`).join(" ");
}
function growPlant() {
  let accounts = getAccounts();
  let garden = accounts[currentUser].garden;
  garden.plants++;
  garden.plantsList.push("Plant #" + garden.plants);
  saveAccounts(accounts);
  loadGarden();
}
function saveGarden() {
  // Already saved on grow, but you could add extra logic here
  alert("Progress saved for " + currentUser + "!");
}

// --- Init ---
window.onload = () => {
  document.getElementById("authArea").style.display = "";
  document.getElementById("gameArea").style.display = "none";
  showLogin();
};