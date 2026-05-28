// JavaScript para a página de produto

const FAVORITES_STORAGE_KEY = 'getEatsFavoritos';

function normalizarProdutoId(valor) {
    return valor
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
}

function obterProdutoAtualId() {
    const titulo = document.querySelector('.product-title');
    if (titulo && titulo.textContent.trim()) {
        return normalizarProdutoId(titulo.textContent.trim());
    }

    return normalizarProdutoId(window.location.pathname.split('/').pop().replace('.html', ''));
}

function obterFavoritos() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
    } catch (error) {
        return [];
    }
}

function salvarFavoritos(favoritos) {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...new Set(favoritos)]));
}

function produtoEstaFavorito(produtoId) {
    return obterFavoritos().includes(produtoId);
}

function alternarFavorito(produtoId) {
    const favoritos = obterFavoritos();
    const estaFavorito = favoritos.includes(produtoId);
    const novosFavoritos = estaFavorito
        ? favoritos.filter(id => id !== produtoId)
        : [...favoritos, produtoId];

    salvarFavoritos(novosFavoritos);
    return !estaFavorito;
}

function atualizarBotaoFavorito(botao, estaFavorito) {
    botao.classList.toggle('is-favorite', estaFavorito);
    botao.setAttribute('aria-pressed', String(estaFavorito));
    botao.setAttribute('aria-label', estaFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    botao.textContent = estaFavorito ? '♥' : '♡';
}

function inicializarFavoritoProduto() {
    const botaoFavorito = document.querySelector('.floating-icon');
    if (!botaoFavorito) return;

    const produtoId = obterProdutoAtualId();
    botaoFavorito.classList.add('favorite-toggle');
    botaoFavorito.setAttribute('role', 'button');
    botaoFavorito.setAttribute('tabindex', '0');
    atualizarBotaoFavorito(botaoFavorito, produtoEstaFavorito(produtoId));

    function handleToggle(event) {
        event.preventDefault();
        const estaFavorito = alternarFavorito(produtoId);
        atualizarBotaoFavorito(botaoFavorito, estaFavorito);
    }

    botaoFavorito.addEventListener('click', handleToggle);
    botaoFavorito.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            handleToggle(event);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    inicializarFavoritoProduto();

    const ingredientButtons = document.querySelectorAll('.ingredient-btn');

    ingredientButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botões
            ingredientButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botão clicado
            this.classList.add('selected');
        });
    });

    const sauceButtons = document.querySelectorAll('.sauce-btn');

    sauceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botões de molho
            sauceButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botão clicado
            this.classList.add('selected');
        });
    });

    const drinkButtons = document.querySelectorAll('.drink-btn');

    drinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botões de bebida
            drinkButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botão clicado
            this.classList.add('selected');
        });
    });

    const accompanimentButtons = document.querySelectorAll('.accompaniment-btn');

    accompanimentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botões de acompanhamento
            accompanimentButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botão clicado
            this.classList.add('selected');
        });
    });

    // Funcionalidade do botão "Adicionar ao Carrinho"
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            adicionarProdutoAoCarrinho();
        });
    }

    // Carregar carrinho.js se não estiver carregado
    if (typeof carrinhoManager === 'undefined') {
        const script = document.createElement('script');
        script.src = '../recursos/js/carrinho.js';
        script.onload = function() {
        };
        document.head.appendChild(script);
    }
});

// Função para coletar informações do produto e adicionar ao carrinho
function adicionarProdutoAoCarrinho() {
    // Coletar informações básicas do produto
    const productTitle = document.querySelector('.product-title');
    const productPrice = document.querySelector('.price');
    const productImage = document.querySelector('.product-image');


    if (!productTitle || !productPrice) {
        console.error('Informações do produto não encontradas');
        console.error('productTitle:', productTitle);
        console.error('productPrice:', productPrice);
        return;
    }

    // Extrair nome e preço
    const nome = productTitle.textContent.trim();
    // Improved price parsing with regex
    const precoMatch = productPrice.textContent.trim().match(/R\$\s*([\d,]+)/);
    let precoTexto = '';
    if (precoMatch) {
        precoTexto = precoMatch[1].replace(',', '.');
    } else {
        // Fallback to old method
        precoTexto = productPrice.textContent.trim().replace('R$', '').replace(',', '.');
    }
    const preco = parseFloat(precoTexto);


    // Validação do preço
    if (isNaN(preco) || preco <= 0) {
        console.error('Preço inválido:', preco);
        alert('Erro: Preço do produto inválido. Não foi possível adicionar ao carrinho.');
        return;
    }

    // Gerar ID único baseado no nome (simplificado)
    const id = nome.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');

    // Coletar customizações selecionadas
    const customizacoes = {
        ingredientes: [],
        molhos: [],
        bebidas: [],
        acompanhamentos: []
    };

    // Ingredientes extras
    const selectedIngredients = document.querySelectorAll('.ingredient-btn.selected');
    selectedIngredients.forEach(btn => {
        customizacoes.ingredientes.push(btn.textContent.trim());
    });

    // Molhos
    const selectedSauces = document.querySelectorAll('.sauce-btn.selected');
    selectedSauces.forEach(btn => {
        customizacoes.molhos.push(btn.getAttribute('data-value') || btn.textContent.trim());
    });

    // Bebidas
    const selectedDrinks = document.querySelectorAll('.drink-btn.selected');
    selectedDrinks.forEach(btn => {
        customizacoes.bebidas.push(btn.textContent.trim());
    });

    // Acompanhamentos
    const selectedAccompaniments = document.querySelectorAll('.accompaniment-btn.selected');
    selectedAccompaniments.forEach(btn => {
        customizacoes.acompanhamentos.push(btn.textContent.trim());
    });

    // Determinar imagem do produto
    let imagem = '';
    if (productImage) {
        const bgImage = productImage.style.backgroundImage;
        if (bgImage) {
            // Extrair URL da propriedade background-image
            const match = bgImage.match(/url\(["']?([^"']*)["']?\)/);
            if (match) {
                imagem = match[1];
            }
        }
    }

    // Criar objeto do item do carrinho
    const itemCarrinho = {
        id: id,
        nome: nome,
        preco: preco,
        quantidade: 1,
        imagem: imagem,
        customizacoes: customizacoes
    };

    // Adicionar ao carrinho usando o gerenciador
    if (typeof adicionarAoCarrinho === 'function') {
        adicionarAoCarrinho(itemCarrinho);

        // Feedback visual para o usuário
        mostrarFeedbackAdicao();
    } else {
        console.error('Função adicionarAoCarrinho não encontrada. Verifique se carrinho.js foi carregado.');
    }
}

// Função para mostrar feedback visual da adição
function mostrarFeedbackAdicao() {
    const btn = document.querySelector('.add-to-cart-btn');
    if (btn) {
        const textoOriginal = btn.textContent;
        btn.textContent = '✓ Adicionado!';
        btn.style.background = '#28a745';

        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = '';
        }, 1000);
    }
}
