# Como Executar o Get Eats

O Get Eats e um projeto estatico desenvolvido com HTML, CSS e JavaScript. Ele usa `localStorage` para simular persistencia de usuarios, produtos, carrinho e pedidos.

## Execucao

Abra `src/index.html` em um navegador moderno ou rode um servidor local:

```bash
npx http-server src
```

Depois acesse `http://localhost:8080`.

## Fluxo do Cliente

1. Acesse `index.html`.
2. Entre ou crie uma conta.
3. Navegue pelo cardapio, filtre produtos e adicione itens ao carrinho.
4. Finalize o pedido no fluxo de pagamento simulado.
5. Acompanhe o status e consulte o historico de pedidos.

## Fluxo do Administrador

1. Acesse `admin.html`.
2. Use as credenciais de demonstracao: `adm` / `adm`.
3. Gerencie produtos em `paginas/admin-cardapio.html`.
4. Adicione, edite ou remova produtos e consulte as telas administrativas.

## Observacao

Este projeto e uma demonstracao academica. Autenticacao, pagamento e persistencia sao simulados localmente no navegador.
