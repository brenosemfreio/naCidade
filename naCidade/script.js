// Fake DB só pra simulação
const fakeDB = [{ email: "breno@gmail.com", senha: "123456" }];

// LOGIN
function fazerLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const user = fakeDB.find(u => u.email === email && u.senha === senha);

  if (user) {
    localStorage.setItem("logado", "true");
    window.location.href = "index.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
}

// CRIAR CONTA
function criarConta(e) {
  e.preventDefault();
  alert("Conta criada com sucesso! (simulação)");
  localStorage.setItem("logado", "true");
  window.location.href = "index.html";
}

// VERIFICA LOGIN
function verificarLogin() {
  const logado = localStorage.getItem("logado");
  if (logado === "true") {
    document.getElementById("auth-buttons").classList.add("d-none");
    document.getElementById("menu-icon").classList.remove("d-none");
  }
}

// MENU LATERAL
function abrirMenu() {
  const offcanvas = new bootstrap.Offcanvas(document.getElementById('menuLateral'));
  offcanvas.show();
  const nomeUsuario = document.getElementById("nomeUsuario");
  if (localStorage.getItem("logado") === "true" && nomeUsuario) {
    nomeUsuario.textContent = "Olá, Breno.";
  }
}

// EVENTOS SUBMENU
document.addEventListener("DOMContentLoaded", () => {
  const toggleSub = document.getElementById("toggleSub");
  const subEventos = document.getElementById("subEventos");
  const sair = document.getElementById("sair");
  const toggleEventos = document.getElementById("toggleEventos");

  function alternarEventos() {
    subEventos.classList.toggle("d-none");
    toggleSub.textContent = subEventos.classList.contains("d-none") ? "↓" : "↑";
  }

  if (toggleEventos) toggleEventos.addEventListener("click", alternarEventos);
  if (toggleSub) toggleSub.addEventListener("click", alternarEventos);

  if (sair) {
    sair.addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("logado");
      window.location.href = "index.html";
    });
  }
});
