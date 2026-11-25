# Política de Segurança

Este repositório contém a landing page estática do **OtterSenses Manager** (HTML, CSS e
JavaScript, sem back-end). Ainda assim, levamos a segurança a sério.

## Versões com suporte

Apenas a versão publicada a partir da branch `main` recebe correções de segurança.

## Como reportar uma vulnerabilidade

**Não abra uma issue pública** para vulnerabilidades.

1. Use o relato privado do GitHub: aba **Security** → **Report a vulnerability**.
   Se a opção não estiver disponível, entre em contato diretamente com os mantenedores da
   organização [OtterSenses](https://github.com/OtterSenses), sem expor detalhes publicamente.
2. Descreva o problema, os passos para reproduzi-lo, o impacto estimado e, se possível,
   uma sugestão de correção.

Você receberá uma confirmação de recebimento e, após a análise, uma resposta sobre a
correção. Pedimos que a divulgação pública aguarde a publicação da correção.

## Escopo

Dentro do escopo: scripts do site, formulário de contato, links e recursos externos,
configuração do workflow de deploy.

Fora do escopo: vulnerabilidades em serviços de terceiros (GitHub Pages, jsDelivr,
Google Fonts), engenharia social e testes de negação de serviço.

## Práticas adotadas neste repositório

- **Sem segredos no código.** Nunca versione senhas, tokens, chaves de API ou arquivos
  `.env` (já ignorados pelo `.gitignore`).
- **Dependências externas com integridade.** Bootstrap e Bootstrap Icons são carregados
  via CDN com `integrity` (SRI) e `crossorigin`. Ao atualizar a versão, recalcule os hashes.
- **Links externos** usam `rel="noopener noreferrer"`.
- **Sem `innerHTML` com dados do usuário.** Mensagens da interface usam `textContent`.
- **Formulário de contato.** Atualmente apenas valida os dados no navegador e **não os envia**.
  Ao integrar um endpoint, use HTTPS, valide e sanitize os dados no servidor, aplique
  limitação de taxa e proteção contra spam, e trate o consentimento conforme a LGPD.
- **Deploy com permissões mínimas.** O workflow usa `contents: read` e eleva
  `pages: write` e `id-token: write` apenas no job de publicação.

## Recomendações para quem contribui

- Revise o diff em busca de credenciais antes de abrir um Pull Request.
- Não adicione scripts de origens não verificadas.
- Mantenha os documentos em `docs/` sem dados pessoais reais.
