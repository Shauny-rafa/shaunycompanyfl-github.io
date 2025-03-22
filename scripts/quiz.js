const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const resultadoDiv = document.getElementById('resultado');

let respostas = {};

// Função para carregar os dados dos países
async function carregarPaises() {
  const response = await fetch('paises.json');
  const paises = await response.json();
  return paises;
}

// Função para exibir as perguntas do quiz
function exibirPerguntas() {
  quizData.forEach((pergunta, index) => {
    const perguntaDiv = document.createElement('div');
    perguntaDiv.classList.add('pergunta');
    perguntaDiv.innerHTML = `
      <p>${pergunta.text}</p>
      ${pergunta.options.map(opcao => `
        <div class="opcao" data-id="${pergunta.id}" data-value="${opcao.value}">
          <i class="${opcao.icon}"></i>
          <span>${opcao.text}</span>
        </div>
      `).join('')}
    `;
    quizContainer.appendChild(perguntaDiv);
  });

  // Adiciona evento de clique às opções
  document.querySelectorAll('.opcao').forEach(opcao => {
    opcao.addEventListener('click', () => {
      const perguntaId = opcao.getAttribute('data-id');
      const valor = opcao.getAttribute('data-value');
      respostas[perguntaId] = valor;

      // Remove a seleção anterior
      document.querySelectorAll(`[data-id="${perguntaId}"]`).forEach(o => {
        o.classList.remove('selecionada');
      });

      // Marca a opção selecionada
      opcao.classList.add('selecionada');
    });
  });
}

// Função para calcular o resultado do quiz
async function calcularResultado() {
  const paises = await carregarPaises();

  // Mapeia as respostas do quiz para os critérios dos países
  const criterios = {
    climate: respostas[1], // Resposta da pergunta 1 (clima)
    budget: respostas[2],  // Resposta da pergunta 2 (orçamento)
    language: respostas[3], // Resposta da pergunta 3 (idioma)
    academic: respostas[4], // Resposta da pergunta 4 (área acadêmica)
    housing: respostas[5],  // Resposta da pergunta 5 (hospedagem)
    transport: respostas[6], // Resposta da pergunta 6 (transporte)
    food: respostas[7],     // Resposta da pergunta 7 (alimentação)
    social: respostas[8],   // Resposta da pergunta 8 (perfil social)
    duration: respostas[9], // Resposta da pergunta 9 (duração)
    nature: respostas[10],  // Resposta da pergunta 10 (natureza)
    sports: respostas[11],  // Resposta da pergunta 11 (esportes)
    history: respostas[12], // Resposta da pergunta 12 (história)
    tech: respostas[13],    // Resposta da pergunta 13 (tecnologia)
    health: respostas[14],  // Resposta da pergunta 14 (saúde)
    visa: respostas[15],    // Resposta da pergunta 15 (visto)
    work: respostas[16],    // Resposta da pergunta 16 (trabalho)
    safety: respostas[17],  // Resposta da pergunta 17 (segurança)
    community: respostas[18], // Resposta da pergunta 18 (comunidade)
    travel: respostas[19],  // Resposta da pergunta 19 (viagens)
    internet: respostas[20], // Resposta da pergunta 20 (internet)
    art: respostas[21],     // Resposta da pergunta 21 (artes)
    climate_adapt: respostas[22], // Resposta da pergunta 22 (adaptação climática)
    courses: respostas[23], // Resposta da pergunta 23 (cursos)
    housing_time: respostas[24], // Resposta da pergunta 24 (tempo para hospedagem)
    emergency: respostas[25] // Resposta da pergunta 25 (suporte emergencial)
  };

  // Filtra os países com base nas respostas
  const paisesFiltrados = paises.filter(pais => {
    return (
      pais.tags.climate.includes(criterios.climate) &&
      pais.tags.budget.includes(criterios.budget) &&
      pais.tags.language.includes(criterios.language) &&
      pais.tags.academic.includes(criterios.academic) &&
      pais.tags.housing.includes(criterios.housing) &&
      pais.tags.transport.includes(criterios.transport) &&
      pais.tags.food.includes(criterios.food) &&
      pais.tags.social.includes(criterios.social) &&
      pais.tags.duration.includes(criterios.duration) &&
      pais.tags.nature.includes(criterios.nature) &&
      pais.tags.sports.includes(criterios.sports) &&
      pais.tags.history.includes(criterios.history) &&
      pais.tags.tech.includes(criterios.tech) &&
      pais.tags.health.includes(criterios.health) &&
      pais.tags.visa.includes(criterios.visa) &&
      pais.tags.work.includes(criterios.work) &&
      pais.tags.safety.includes(criterios.safety) &&
      pais.tags.community.includes(criterios.community) &&
      pais.tags.travel.includes(criterios.travel) &&
      pais.tags.internet.includes(criterios.internet) &&
      pais.tags.art.includes(criterios.art) &&
      pais.tags.climate_adapt.includes(criterios.climate_adapt) &&
      pais.tags.courses.includes(criterios.courses) &&
      pais.tags.housing_time.includes(criterios.housing_time) &&
      pais.tags.emergency.includes(criterios.emergency)
    );
  });

  // Exibe o país recomendado
  if (paisesFiltrados.length > 0) {
    const paisRecomendado = paisesFiltrados[0];
    resultadoDiv.innerHTML = `
      <h2>Seu destino recomendado é: ${paisRecomendado.name} ${paisRecomendado.flag}</h2>
      <p><strong>Clima:</strong> ${paisRecomendado.climate}</p>
      <p><strong>Custo de vida:</strong> ${paisRecomendado.costLevel}</p>
      <p><strong>Idioma:</strong> ${paisRecomendado.tags.language.join(', ')}</p>
     
