# OtterSenses Manager — Landing Page

[![Verificar e publicar](https://github.com/OtterSenses/Landing-Page-OtterSenses_manager-/actions/workflows/pages.yml/badge.svg)](https://github.com/OtterSenses/Landing-Page-OtterSenses_manager-/actions/workflows/pages.yml)
[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-14B8A6.svg)](LICENSE)

Landing page do **OtterSenses Manager**, plataforma de monitoramento industrial de tanques.
Site estático em **HTML + Bootstrap 5 + JavaScript puro (módulos ES)**, sem framework e sem
dependências de execução.

> **Estado atual:** a estrutura visual está pronta, mas os textos são **provisórios**
> (placeholders). O conteúdo definitivo será definido posteriormente.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Executando localmente](#executando-localmente)
- [Scripts](#scripts)
- [Deploy (GitHub Pages)](#deploy-github-pages)
- [Acessibilidade e boas práticas](#acessibilidade-e-boas-práticas)
- [Pendências](#pendências)
- [Documentos](#documentos)
- [Segurança](#segurança)
- [Licença](#licença)

## Funcionalidades

| Recurso | Descrição | Módulo |
| --- | --- | --- |
| Navbar adaptativa | Fundo ao rolar; menu mobile fecha ao clicar, com `Esc` ou clicando fora | `navbar.js` |
| Scrollspy | Destaca no menu a seção visível (`aria-current`) | `scrollspy.js` |
| Voltar ao topo | Botão flutuante após rolar a página | `back-to-top.js` |
| Revelação animada | Entrada escalonada dos blocos; respeita `prefers-reduced-motion` | `reveal.js` |
| Painel ilustrativo | Tanques com variação simulada; pausa fora da tela e em aba inativa | `tanks.js` |
| Lightbox | Ampliação da imagem do dispositivo com `<dialog>` nativo | `lightbox.js` |
| Formulário de contato | Validação por campo, máscara de telefone, contador e estado de envio | `contact-form.js` |
| Seleção de plano | Botões dos planos pré-selecionam o campo do formulário | `contact-form.js` |
| Página de documentos | Índice automático e barra de progresso de leitura | `docs-toc.js` |

## Estrutura do projeto

```
.
├── index.html                  # landing page
├── 404.html                    # página de erro do GitHub Pages
├── pages/
│   └── documentos.html         # área de documentos
├── docs/
│   └── termo-responsabilidade-usuario.md
├── assets/
│   ├── css/
│   │   ├── base.css            # tokens, tipografia, botões, acessibilidade, animações
│   │   ├── layout.css          # navbar, hero, seções, rodapé, responsivo
│   │   └── components.css      # cards, painel, formulário, lightbox, etc.
│   ├── js/
│   │   ├── main.js             # entrada da landing page
│   │   ├── docs.js             # entrada da página de documentos
│   │   └── modules/            # um módulo por funcionalidade
│   └── img/                    # logo, favicon e imagens
├── scripts/
│   ├── build.mjs               # gera dist/
│   ├── check.mjs               # valida JS, links e âncoras
│   └── serve.mjs               # servidor local
├── .github/workflows/pages.yml # CI e deploy
├── LICENSE
├── SECURITY.md
└── package.json
```

## Executando localmente

Os scripts usam módulos ES, que **não carregam via `file://`**. Sirva a pasta por HTTP.
Requer [Node.js](https://nodejs.org/) 20 ou superior (nenhum `npm install` é necessário).

```bash
npm start
```

Acesse `http://localhost:8000` (altere a porta com a variável `PORT`).

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm start` | Servidor local em `http://localhost:8000` |
| `npm run check` | Valida sintaxe dos JS, imports, links locais, âncoras e ids duplicados |
| `npm run build` | Copia os arquivos publicáveis para `dist/` |
| `npm test` | Executa `check` e `build` |

## Deploy (GitHub Pages)

O workflow [`pages.yml`](.github/workflows/pages.yml) roda em cada Pull Request (verificação
e build) e, a cada push na `main`, publica o conteúdo de `dist/` no GitHub Pages.

Configuração única no repositório: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

> O GitHub Pages em repositórios privados exige um plano compatível (Pro, Team ou Enterprise).

## Acessibilidade e boas práticas

- Link "Pular para o conteúdo", landmarks semânticos e `aria-labelledby` nas seções.
- Foco visível e navegação por teclado em abas, acordeão, menu e lightbox.
- Ícones decorativos com `aria-hidden`; formulário com rótulos, `aria-invalid` e região `aria-live`.
- Animações desativadas com `prefers-reduced-motion`.
- Conteúdo visível mesmo sem JavaScript.
- CDN com SRI; imagens com `width`/`height` e `loading="lazy"`.

## Pendências

- **Conteúdo definitivo:** substituir todos os textos provisórios.
- **Formulário de contato:** não envia os dados. O ponto de integração é `submitContact()`
  em `assets/js/modules/contact-form.js`.
- **Imagem do dispositivo:** mostra LoRaWAN e sensores de qualidade da água; alinhar com a
  descrição final do produto.
- **Política de Privacidade:** ainda não publicada (ver `pages/documentos.html`).

## Documentos

A página [`pages/documentos.html`](pages/documentos.html) reúne os documentos institucionais.
O **Termo de Responsabilidade do Usuário** é uma minuta para revisão técnica e jurídica, sem
coleta de aceite. Mantenha as versões HTML e Markdown (`docs/`) equivalentes.

## Segurança

Veja [SECURITY.md](SECURITY.md) para reportar vulnerabilidades.

## Licença

Código distribuído sob a licença [MIT](LICENSE). O nome, a logo e as imagens do
OtterSenses são de uso reservado e não estão cobertos pela licença do código.
