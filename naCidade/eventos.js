// URL da sua MockAPI
const API_URL = "https://6908ed872d902d0651b22b01.mockapi.io/eventos";

// Função para carregar os eventos da MockAPI
async function carregarEventos() {
  const container = document.querySelector(".eventos-proximos .row");
  const carouselInner = document.querySelector(".carousel-inner");

  // 🌀 Mostrar “carregando...”
  if (container) {
    container.innerHTML = `
      <div class="text-center w-100 my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
        <p class="mt-2 text-primary">Carregando eventos...</p>
      </div>
    `;
  }

  if (carouselInner) {
    carouselInner.innerHTML = `
      <div class="text-center w-100 my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>
    `;
  }

  try {
    const response = await fetch(API_URL);
    const eventos = await response.json();

    console.log("Eventos carregados:", eventos);

    // === Próximos Eventos ===
    if (container) {
      container.innerHTML = "";
      eventos.forEach(evento => {
        container.innerHTML += `
          <div class="col-md-4">
            <a href="evento.html?id=${evento.id}" class="card-link text-decoration-none">
              <div class="card h-100 shadow-sm border-primary">
                <img src="${evento.imagem}" class="card-img-top" alt="${evento.nome}">
                <div class="card-body text-start">
                  <p class="card-text mb-1"><strong>${evento.nome}</strong></p>
                  <p class="text-muted small mb-1">${evento.data} • ${evento.horario}</p>
                  <p class="text-muted small">${evento.local}</p>
                </div>
              </div>
            </a>
          </div>
        `;
      });
    }

    // === Carrossel de Destaques ===
    if (carouselInner) {
      carouselInner.innerHTML = "";
      eventos.slice(0, 3).forEach((evento, index) => {
        carouselInner.innerHTML += `
          <div class="carousel-item ${index === 0 ? "active" : ""} position-relative">
            <a href="evento.html?id=${evento.id}" class="stretched-link"></a>
            <img src="${evento.imagem}" class="d-block w-100 rounded-3 shadow-sm" alt="${evento.nome}">
          </div>
        `;
      });
    }

  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
    if (container) {
      container.innerHTML = `
        <div class="text-center text-danger w-100 my-5">
          <i class="bi bi-exclamation-triangle fs-1"></i>
          <p>Erro ao carregar eventos. Tente novamente mais tarde.</p>
        </div>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", carregarEventos);
