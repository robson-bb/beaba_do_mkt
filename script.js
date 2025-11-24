// --- Referências DOM ---
const cardContainer = document.querySelector("#card-container");
const campoBusca = document.querySelector("#input-busca");
const botaoLimpar = document.querySelector("#botao-limpar");
const filtroCategoria = document.querySelector("#filtro-categoria");
const filtroNivel = document.querySelector("#filtro-nivel");
const mensagemResultado = document.querySelector("#mensagem-resultado");
const cardTemplate = document.querySelector("#card-template");
const cardDetailModal = document.querySelector("#card-detail-modal"); // New
const modalCardBody = document.querySelector("#modal-card-body");     // New
const modalCloseButton = document.querySelector(".modal-close");      // New
const modalOverlay = document.querySelector(".modal-overlay");        // New
const menuToggle = document.querySelector(".menu-toggle"); // New: Mobile menu toggle button
const headerNavMobileContent = document.querySelector(".header-nav-mobile-content");   // New: Header navigation container

let dadosDicionario = []; // Variável para armazenar os dados carregados do JSON

// --- Event Listeners ---

campoBusca.addEventListener('keypress', (e) => (e.key === 'Enter') && iniciarBusca());
campoBusca.addEventListener('input', () => botaoLimpar.style.display = campoBusca.value ? 'inline-block' : 'none');
botaoLimpar.addEventListener('click', () => {
    campoBusca.value = '';
    botaoLimpar.style.display = 'none';
    iniciarBusca();
});
filtroCategoria.addEventListener('change', iniciarBusca);
filtroNivel.addEventListener('change', iniciarBusca);
modalCloseButton.addEventListener('click', fecharDetalhesDoCard); // Close modal
modalOverlay.addEventListener('click', fecharDetalhesDoCard);     // Close modal by clicking overlay
menuToggle.addEventListener('click', () => { // New: Toggle mobile menu
    menuToggle.classList.toggle('active');
    headerNavMobileContent.classList.toggle('active');
});

/**
 * Popula os filtros de categoria e nível com base nos dados.
 */
function popularFiltros() {
    const categorias = [...new Set(dadosDicionario.map(item => item.categoria))];
    const niveis = [...new Set(dadosDicionario.map(item => item.nivel))];

    categorias.sort().forEach(cat => {
        const option = new Option(cat, cat);
        filtroCategoria.add(option);
    });

    niveis.sort().forEach(nivel => {
        const option = new Option(nivel.charAt(0).toUpperCase() + nivel.slice(1), nivel);
        filtroNivel.add(option);
    });
}

/**
 * Destaca as correspondências de um termo de busca em um texto.
 */
function highlightMatches(text, searchTerm) {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<strong></strong>');
}

/**
 * Popula o container de tags de um card.
 */
function popularTags(tagsContainer, tags) {
    tagsContainer.innerHTML = '';
    if (Array.isArray(tags)) {
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag.toUpperCase();
            tagsContainer.appendChild(tagElement);
        });
    }
}

/**
 * Renderiza os cards na tela.
 */
function renderizarCards(dados, termoBusca = "") {
    cardContainer.innerHTML = "";
    mensagemResultado.style.display = dados.length === 0 ? 'block' : 'none';

    console.log('--- Starting renderizarCards ---');
    console.log('Number of cards to render:', dados.length);

    for (const dado of dados) {
        const cardClone = cardTemplate.content.cloneNode(true).firstElementChild; // Get the article element directly
        
        // Removed: cardClone.classList.add('card-preview'); as full content should be visible initially.

        // Store the full data of the card for later use when clicked - no longer strictly needed but harmless.
        cardClone.dataset.cardData = JSON.stringify(dado);

        const selectors = {
            termo: '[data-termo]',
            categoria: '[data-categoria]',
            nivel: '[data-nivel]',
            analogia: '[data-analogia]',
            explicacao: '[data-explicacao]',
            exemplo: '[data-exemplo-pratico]',
            erro: '[data-erro-comum]',
            tags: '[data-tags]'
        };

        const elements = Object.fromEntries(
            Object.entries(selectors).map(([key, selector]) => [key, cardClone.querySelector(selector)])
        );

        elements.termo.innerHTML = highlightMatches(`${dado.id}. ${dado.termo}`, termoBusca);
        elements.categoria.classList.add('card-badge');
        elements.categoria.textContent = highlightMatches(dado.categoria, termoBusca);
        elements.nivel.classList.add('card-badge', dado.nivel);
        elements.nivel.textContent = highlightMatches(dado.nivel.charAt(0).toUpperCase() + dado.nivel.slice(1), termoBusca);
        elements.analogia.innerHTML = `Analogia: ${highlightMatches(dado.analogia, termoBusca)}`;
        elements.explicacao.innerHTML = `Explicação: ${highlightMatches(dado.explicacao, termoBusca)}`;
        elements.exemplo.innerHTML = `Exemplo Prático: ${highlightMatches(dado.exemplo_pratico, termoBusca)}`;
        elements.erro.innerHTML = `Erro Comum: ${highlightMatches(dado.erro_comum, termoBusca)}`;
        
        popularTags(elements.tags, dado.tags);
        
        // Add click event listener to the "Aprenda agora" button
        const learnMoreBtn = cardClone.querySelector('.aprende-agora-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent any parent click event from firing
                abrirDetalhesDoCard(dado);
            });
        }
        
        // Removed: cardClone.addEventListener('click', ...)

        cardContainer.appendChild(cardClone);
        console.log('Rendered card for:', dado.termo);
    }
    console.log('--- Finished renderizarCards ---');
}

/**
 * Abre o modal de detalhes do card com os dados fornecidos.
 * @param {Object} dado - O objeto completo do card.
 */
function abrirDetalhesDoCard(dado) {
    // Clear previous content
    modalCardBody.innerHTML = "";

    // Create a temporary card element to populate with full details
    const tempCard = document.createElement('article');
    tempCard.classList.add('card'); // Apply base card styles to the modal content

    // Populate the temporary card with all details
    const selectors = {
        termo: document.createElement('h2'),
        metaInfo: document.createElement('div'),
        categoria: document.createElement('span'),
        nivel: document.createElement('span'),
        analogiaSection: document.createElement('details'),
        analogiaSummary: document.createElement('summary'),
        analogiaParagraph: document.createElement('p'),
        explicacaoSection: document.createElement('details'),
        explicacaoSummary: document.createElement('summary'),
        explicacaoParagraph: document.createElement('p'),
        exemploSection: document.createElement('details'),
        exemploSummary: document.createElement('summary'),
        exemploParagraph: document.createElement('p'),
        erroSection: document.createElement('details'),
        erroSummary: document.createElement('summary'),
        erroParagraph: document.createElement('p'),
        tagsContainer: document.createElement('div'),
        youtubeLink: document.createElement('a')
    };

    // Termo
    selectors.termo.textContent = `${dado.id}. ${dado.termo}`;
    selectors.termo.classList.add('data-termo'); // Add class for styling

    // Meta Info (Category and Level Badges)
    selectors.metaInfo.classList.add('meta-info');
    selectors.categoria.classList.add('card-badge', 'card-badge-categoria');
    selectors.categoria.textContent = dado.categoria;
    selectors.nivel.classList.add('card-badge', 'card-badge-nivel', dado.nivel);
    selectors.nivel.textContent = dado.nivel.charAt(0).toUpperCase() + dado.nivel.slice(1);
    selectors.metaInfo.appendChild(selectors.categoria);
    selectors.metaInfo.appendChild(selectors.nivel);

    // Analogia
    selectors.analogiaSection.classList.add('card-section');
    selectors.analogiaSection.setAttribute('open', ''); // Open by default
    selectors.analogiaSummary.classList.add('card-summary');
    selectors.analogiaSummary.textContent = 'Analogia';
    selectors.analogiaParagraph.textContent = dado.analogia;
    selectors.analogiaParagraph.classList.add('analogia');
    selectors.analogiaSection.appendChild(selectors.analogiaSummary);
    selectors.analogiaSection.appendChild(selectors.analogiaParagraph);

    // Explicação
    selectors.explicacaoSection.classList.add('card-section');
    selectors.explicacaoSummary.classList.add('card-summary');
    selectors.explicacaoSummary.textContent = 'Explicação';
    selectors.explicacaoParagraph.textContent = dado.explicacao;
    selectors.explicacaoParagraph.classList.add('explicacao');
    selectors.explicacaoSection.appendChild(selectors.explicacaoSummary);
    selectors.explicacaoSection.appendChild(selectors.explicacaoParagraph);

    // Exemplo Prático
    selectors.exemploSection.classList.add('card-section');
    selectors.exemploSummary.classList.add('card-summary');
    selectors.exemploSummary.textContent = 'Exemplo Prático';
    selectors.exemploParagraph.textContent = dado.exemplo_pratico;
    selectors.exemploParagraph.classList.add('exemplo-pratico');
    selectors.exemploSection.appendChild(selectors.exemploSummary);
    selectors.exemploSection.appendChild(selectors.exemploParagraph);

    // Erro Comum
    selectors.erroSection.classList.add('card-section');
    selectors.erroSummary.classList.add('card-summary');
    selectors.erroSummary.textContent = 'Erro Comum';
    selectors.erroParagraph.textContent = dado.erro_comum;
    selectors.erroParagraph.classList.add('erro-comum');
    selectors.erroSection.appendChild(selectors.erroSummary);
    selectors.erroSection.appendChild(selectors.erroParagraph);
    
    // Tags
    selectors.tagsContainer.classList.add('tags');
    popularTags(selectors.tagsContainer, dado.tags);

    // YouTube Link (if available)
    if (dado.youtube_link) {
        selectors.youtubeLink.href = dado.youtube_link;
        selectors.youtubeLink.target = '_blank';
        selectors.youtubeLink.textContent = 'Ver no YouTube';
    }

    // Append all elements to the tempCard
    tempCard.appendChild(selectors.termo);
    tempCard.appendChild(selectors.metaInfo);
    tempCard.appendChild(selectors.analogiaSection);
    tempCard.appendChild(selectors.explicacaoSection);
    tempCard.appendChild(selectors.exemploSection);
    tempCard.appendChild(selectors.erroSection);
    tempCard.appendChild(selectors.tagsContainer);
    if (dado.youtube_link) {
        tempCard.appendChild(selectors.youtubeLink);
    }


    modalCardBody.appendChild(tempCard);

    // Display the modal
    cardDetailModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
}

/**
 * Fecha o modal de detalhes do card.
 */
function fecharDetalhesDoCard() {
    cardDetailModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling on the body
}

/**
 * Inicia a busca e a filtragem.
 */
async function iniciarBusca() {
    console.log('--- Starting iniciarBusca ---');
    if (dadosDicionario.length === 0) {
        try {
            const resposta = await fetch("data.json");
            if (!resposta.ok) throw new Error(`Erro ao carregar: ${resposta.statusText}`);
            dadosDicionario = await resposta.json();
            console.log('Dados carregados:', dadosDicionario);
            popularFiltros(); // Popula os filtros na primeira carga
        } catch (error) {
            console.error("Falha ao buscar dados do dicionário:", error);
            // If data fetching fails, ensure no cards are rendered and message is shown
            renderizarCards([], ""); 
            return;
        }
    }

    const termoBusca = campoBusca.value.toLowerCase().trim();
    const categoriaSelecionada = filtroCategoria.value;
    const nivelSelecionado = filtroNivel.value;

    const dadosFiltrados = dadosDicionario.filter(item => {
        const categoriaMatch = !categoriaSelecionada || item.categoria === categoriaSelecionada;
        const nivelMatch = !nivelSelecionado || item.nivel === nivelSelecionado;
        
        if (!termoBusca) {
            return categoriaMatch && nivelMatch;
        }

        const textoMatch = [
            item.termo,
            item.analogia,
            item.explicacao,
            item.categoria,
            item.nivel,
            ...(item.tags || [])
        ].some(field => field?.toLowerCase().includes(termoBusca));

        return categoriaMatch && nivelMatch && textoMatch;
    });

    console.log('Dados filtrados para renderizar:', dadosFiltrados);
    renderizarCards(dadosFiltrados, termoBusca);
    console.log('--- Finished iniciarBusca ---');
}

// Inicializa a página
window.onload = iniciarBusca;