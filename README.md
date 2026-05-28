# Get Eats

![Status](https://img.shields.io/badge/status-em%20evolucao-ff2e2e?style=for-the-badge)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JavaScript-222222?style=for-the-badge)
![Deploy](https://img.shields.io/badge/deploy-Netlify-00c7b7?style=for-the-badge)

**Get Eats** e uma experiencia web de delivery criada para simular o fluxo completo de uma hamburgueria digital: cardapio, busca, favoritos, carrinho, pagamento, acompanhamento de pedidos, historico por usuario e painel administrativo.

[Acessar demo](https://luxury-cat-6c9b24.netlify.app/) | [Documentacao do projeto](docs/context-geteats.md) | [Area administrativa](src/admin.html)

<p align="center">
  <img src="docs/demo/get-eats-demo.gif" alt="Demonstracao do Get Eats" width="900" style="border-radius: 14px;" />
</p>

## Visao Geral

O projeto nasceu como um trabalho academico de primeiro semestre em Sistemas de Informacao e evoluiu para uma aplicacao de portfolio. A proposta foi construir uma interface completa, responsiva e navegavel usando apenas tecnologias base da web, sem framework e sem backend real.

O foco esta em demonstrar dominio de fluxo de produto, organizacao de telas, persistencia local, responsividade e refinamento visual em diferentes breakpoints.

## Funcionalidades

- Cardapio com categorias, busca, filtros e produtos com imagens.
- Favoritos persistentes por usuario no navegador.
- Carrinho com quantidade, cupom, endereco e resumo de pedido.
- Cadastro, login e perfil de cliente simulados com `localStorage`.
- Pagamento simulado por PIX ou cartao.
- Acompanhamento de pedido com status progressivo.
- Historico de pedidos isolado por perfil de usuario.
- Modal desktop para carrinho, pagamento, pedidos e perfil.
- Painel administrativo para adicionar, editar e remover produtos.
- Layout responsivo para mobile, tablet e desktop.

## Experiencia

O Get Eats foi pensado como um produto de delivery compacto, com fluxo direto:

1. O usuario acessa o cardapio.
2. Pesquisa ou filtra produtos.
3. Favorita itens de interesse.
4. Adiciona ao carrinho.
5. Finaliza o pedido.
6. Acompanha o status da entrega.
7. Consulta o historico pelo proprio perfil.

## Telas Principais

| Area | Descricao |
| --- | --- |
| Cardapio | Lista de produtos, busca, categorias, destaques e filtros. |
| Produto | Detalhes do item, adicionais, bebidas, acompanhamentos e favorito. |
| Carrinho | Itens selecionados, cupom, endereco e total. |
| Pagamento | Simulacao de pagamento por PIX ou cartao. |
| Pedidos | Pedidos atuais e historico separado por usuario. |
| Perfil | Dados do cliente, edicao de perfil, senha e logout. |
| Admin | Cadastro, edicao e remocao de produtos. |

## Tecnologias

- HTML5
- CSS3
- JavaScript
- `localStorage`
- Netlify
- Git e GitHub

## Como Rodar Localmente

O projeto e estatico. Voce pode abrir diretamente o arquivo [src/index.html](src/index.html), mas a forma mais estavel e rodar com um servidor local.

```bash
cd src
npx http-server .
```

Depois acesse:

```text
http://localhost:8080
```

## Area Administrativa

A area administrativa e uma simulacao local para fins academicos e de demonstracao.

```text
Entrada: src/admin.html
Usuario: adm
Senha: adm
```

## Estrutura

```text
Get Eats/
+-- docs/
|   +-- demo/
|   +-- img/
+-- src/
|   +-- assets/
|   +-- paginas/
|   +-- recursos/
|       +-- css/
|       +-- js/
+-- README.md
```

## Decisoes de Implementacao

- O projeto nao usa backend: sessao, usuarios, favoritos, carrinho e pedidos sao simulados no navegador.
- O historico de pedidos e separado por usuario usando chaves derivadas do email logado.
- O carrinho tambem e persistido localmente para manter o fluxo mesmo ao navegar entre telas.
- A interface desktop usa modais e paineis laterais para reduzir mudancas bruscas de pagina.
- A versao mobile prioriza fluxo linear, botoes grandes e navegacao inferior.

## Limitacoes

Este projeto nao deve ser usado como sistema de producao. Senhas, login e dados de pedido sao exemplos locais em `localStorage`, sem criptografia, banco de dados ou autenticacao real.

## Proximas Melhorias

- Migrar dados para uma API real.
- Adicionar testes automatizados de fluxo.
- Melhorar acessibilidade de todos os modais.
- Criar estados vazios e mensagens de erro mais completas.
- Separar melhor os modulos JavaScript.
- Adicionar dominio customizado ao deploy.

## Autor

Desenvolvido por **Celio Pedro** como projeto academico e peca de portfolio.
