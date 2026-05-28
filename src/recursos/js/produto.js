// JavaScript para a pÃ¡gina de produto

document.addEventListener('DOMContentLoaded', function() {
    const ingredientButtons = document.querySelectorAll('.ingredient-btn');

    ingredientButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botÃµes
            ingredientButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botÃ£o clicado
            this.classList.add('selected');
        });
    });

    const sauceButtons = document.querySelectorAll('.sauce-btn');

    sauceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botÃµes de molho
            sauceButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botÃ£o clicado
            this.classList.add('selected');
        });
    });

    const drinkButtons = document.querySelectorAll('.drink-btn');

    drinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botÃµes de bebida
            drinkButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botÃ£o clicado
            this.classList.add('selected');
        });
    });

    const accompanimentButtons = document.querySelectorAll('.accompaniment-btn');

    accompanimentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'selected' de todos os botÃµes de acompanhamento
            accompanimentButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botÃ£o clicado
            this.classList.add('selected');
        });
    });

    // Funcionalidade do botÃ£o "Adicionar ao Carrinho"
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            adicionarProdutoAoCarrinho();
        });
    }

    // Carregar carrinho.js se nÃ£o estiver carregado
    if (typeof carrinhoManager === 'undefined') {
        const script = document.createElement('script');
        script.src = '../recursos/js/carrinho.js';
        script.onload = function() {
        };
        document.head.appendChild(script);
    }
});

// FunÃ§Ã£o para coletar informaÃ§Ãµes do produto e adicionar ao carrinho
function adicionarProdutoAoCarrinho() {
    // Coletar informaÃ§Ãµes bÃ¡sicas do produto
    const productTitle = document.querySelector('.product-title');
    const productPrice = document.querySelector('.price');
    const productImage = document.querySelector('.product-image');


    if (!productTitle || !productPrice) {
        console.error('InformaÃ§Ãµes do produto nÃ£o encontradas');
        console.error('productTitle:', productTitle);
        console.error('productPrice:', productPrice);
        return;
    }

    // Extrair nome e preÃ§o
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


    // ValidaÃ§Ã£o do preÃ§o
    if (isNaN(preco) || preco <= 0) {
        console.error('PreÃ§o invÃ¡lido:', preco);
        alert('Erro: PreÃ§o do produto invÃ¡lido. NÃ£o foi possÃ­vel adicionar ao carrinho.');
        return;
    }

    // Gerar ID Ãºnico baseado no nome (simplificado)
    const id = nome.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');

    // Coletar customizaÃ§Ãµes selecionadas
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

        // Feedback visual para o usuÃ¡rio
        mostrarFeedbackAdicao();
    } else {
        console.error('FunÃ§Ã£o adicionarAoCarrinho nÃ£o encontrada. Verifique se carrinho.js foi carregado.');
    }
}

// FunÃ§Ã£o para mostrar feedback visual da adiÃ§Ã£o
function mostrarFeedbackAdicao() {
    const btn = document.querySelector('.add-to-cart-btn');
    if (btn) {
        const textoOriginal = btn.textContent;
        btn.textContent = 'âœ“ Adicionado!';
        btn.style.background = '#28a745';

        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = '';
        }, 1000);
    }
}
