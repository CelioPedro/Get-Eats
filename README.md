<p align="center">
  <img src="docs/img/geteats-readme-logo.png" alt="Get Eats" width="96" />
</p>

<hr />

<h3 align="center">Delivery web responsivo com cardapio digital, carrinho, pagamento simulado e painel administrativo</h3>

<p align="center">
  <img src="docs/img/mockup-responsivo.jpg" alt="Mockups responsivos do Get Eats em dispositivos Apple" width="900" />
</p>

<p align="center">
  O Get Eats simula uma operacao real de delivery: catalogo de produtos, busca, favoritos,
  carrinho, checkout, acompanhamento de pedido, historico por usuario e administracao local do cardapio.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Learning-Projeto%20academico-6b7280?style=flat-square" alt="Learning" />
  <img src="https://img.shields.io/badge/Front-HTML%20%2B%20CSS%20%2B%20JS-2563eb?style=flat-square" alt="Frontend" />
  <img src="https://img.shields.io/badge/Focus-Delivery%20App-ff2e2e?style=flat-square" alt="Focus" />
  <img src="https://img.shields.io/badge/Architecture-localStorage%20flow-7c3aed?style=flat-square" alt="Architecture" />
  <img src="https://img.shields.io/badge/Deploy-Netlify-00c7b7?style=flat-square&logo=netlify&logoColor=white" alt="Deploy Netlify" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Live-22c55e?style=flat-square" alt="Frontend live" />
  <img src="https://img.shields.io/badge/GitHub-Repository-111827?style=flat-square&logo=github&logoColor=white" alt="GitHub repository" />
  <img src="https://img.shields.io/badge/Status-MVP%20em%20validacao-f59e0b?style=flat-square" alt="Status MVP em validacao" />
  <img src="https://img.shields.io/badge/Admin-Simulacao%20local-374151?style=flat-square" alt="Admin local" />
</p>

<p align="center">
  <a href="https://luxury-cat-6c9b24.netlify.app/">Demo em producao</a>
  &middot;
  <a href="docs/context-geteats.md">Documentacao do projeto</a>
  &middot;
  <a href="src/admin.html">Area administrativa</a>
</p>

<p align="center">
  <img src="docs/demo/get-eats-demo.gif" alt="Demonstracao em GIF do Get Eats" width="900" />
</p>

> Status: MVP tecnico funcional em validacao. O projeto demonstra fluxo de compra digital, responsividade, persistencia local e experiencia de produto, mas ainda nao deve ser tratado como sistema real de producao sem backend, autenticacao segura, banco de dados e revisao de seguranca.

---

## Stack em destaque

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="42" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="42" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="42" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" width="42" />
  <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" width="42" />
  <img src="https://cdn.simpleicons.org/netlify/00C7B7" alt="Netlify" width="42" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" alt="Browser APIs" width="42" />
</p>

## Links

- Frontend em producao: https://luxury-cat-6c9b24.netlify.app/
- Repositorio: https://github.com/CelioPedro/Get-Eats
- Documentacao do projeto: [docs/context-geteats.md](docs/context-geteats.md)
- Entrada administrativa: [src/admin.html](src/admin.html)

## Visao do produto

O Get Eats apresenta uma hamburgueria digital com experiencia completa de navegacao. O usuario pode buscar produtos, favoritar itens, adicionar ao carrinho, aplicar cupom, simular pagamento e acompanhar o status do pedido. O historico de pedidos fica isolado por perfil, reforcando uma experiencia mais consistente entre contas diferentes.

O objetivo deste repositorio e apresentar a evolucao de um projeto academico para uma peca de portfolio com fluxo navegavel, responsividade e comportamento proximo de um produto real.

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

## Telas principais

| Area | Descricao |
| --- | --- |
| Cardapio | Lista de produtos, busca, categorias, destaques e filtros. |
| Produto | Detalhes do item, adicionais, bebidas, acompanhamentos e favorito. |
| Carrinho | Itens selecionados, cupom, endereco e total. |
| Pagamento | Simulacao de pagamento por PIX ou cartao. |
| Pedidos | Pedidos atuais e historico separado por usuario. |
| Perfil | Dados do cliente, edicao de perfil, senha e logout. |
| Admin | Cadastro, edicao e remocao de produtos. |

## Como rodar localmente

O projeto e estatico. Voce pode abrir diretamente o arquivo [src/index.html](src/index.html), mas a forma mais estavel e rodar com um servidor local.

```bash
cd src
npx http-server .
```

Depois acesse:

```text
http://localhost:8080
```

## Area administrativa

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

## Decisoes de implementacao

- O projeto nao usa backend: sessao, usuarios, favoritos, carrinho e pedidos sao simulados no navegador.
- O historico de pedidos e separado por usuario usando chaves derivadas do email logado.
- O carrinho tambem e persistido localmente para manter o fluxo mesmo ao navegar entre telas.
- A interface desktop usa modais e paineis laterais para reduzir mudancas bruscas de pagina.
- A versao mobile prioriza fluxo linear, botoes grandes e navegacao inferior.

## Proximas melhorias

- Migrar dados para uma API real.
- Adicionar testes automatizados de fluxo.
- Melhorar acessibilidade de todos os modais.
- Criar estados vazios e mensagens de erro mais completas.
- Separar melhor os modulos JavaScript.
- Adicionar dominio customizado ao deploy.

## Autor

Desenvolvido por **Celio Pedro** como projeto academico e peca de portfolio.
