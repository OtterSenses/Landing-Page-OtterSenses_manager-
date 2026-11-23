# Landing Page — OtterSenses Manager

Página de apresentação do **OtterSenses Manager**, plataforma B2B de monitoramento
industrial de tanques com sensores ESP32.

Feita com a mesma base de front-end do sistema: **HTML + Bootstrap 5 + JavaScript puro**,
sem etapa de build.

## Estrutura

```
Landing-Page-OtterSenses/
├── index.html            # página completa (todas as seções)
├── docs/
│   ├── documentos.html   # área exclusiva de documentos
│   └── termo-responsabilidade-usuario.md # termo em Markdown
├── assets/
│   ├── css/style.css     # identidade visual e estilos próprios
│   ├── js/main.js        # navbar, animações, mock do painel, formulário
│   └── img/logo.svg      # logo e favicon
└── README.md
```

## Seções

1. **Hero** — proposta de valor e ilustração animada do painel (dados ilustrativos)
2. **Solução** — antes e depois do monitoramento
3. **Recursos** — monitoramento, alertas, manutenções, kanban, documentos, relatórios,
   empresas, permissões e Academy
4. **Como funciona** — sensor → nuvem → painel → ação
5. **Papéis** — Administrador, Gestor, Técnico e Operador (abas)
6. **Planos** — Essencial, Profissional e Empresarial (preço "sob consulta")
7. **Academy** — área de cursos
8. **FAQ** — perguntas frequentes
9. **Contato** — formulário de solicitação de demonstração
10. **Rodapé**

## Documentos

A aba **Documentos**, acessível pelo menu principal e pelo rodapé, abre
[docs/documentos.html](docs/documentos.html), área exclusiva para os documentos institucionais do projeto.
O primeiro documento é o **Termo de Responsabilidade do Usuário**, versão 1.0,
de 23/11/2026, adaptado ao monitoramento industrial, às permissões empresariais,
aos alertas, às manutenções, aos documentos, aos relatórios e à Academy.

A versão em Markdown está em
[docs/termo-responsabilidade-usuario.md](docs/termo-responsabilidade-usuario.md)
e pode ser baixada pela área documental. Ao revisar o termo, mantenha o conteúdo
das versões HTML e Markdown equivalente.

O termo é uma **minuta para revisão técnica e jurídica**, sem coleta de aceite,
assinatura ou consentimento e sem alteração dos fluxos da plataforma.
As referências são os documentos de escopo, requisitos funcionais e requisitos
de segurança do repositório principal `OtterSenses_manager`; funcionalidades
previstas não são apresentadas como comprovação de implementação.
A Política de Privacidade específica e seus canais de atendimento ainda precisam
ser definidos e publicados pelos responsáveis antes do uso com dados pessoais reais.

## Como abrir

Basta abrir o `index.html` no navegador. Para servir localmente:

```bash
python -m http.server 8000
```

e acessar `http://localhost:8000`.

## Pendências

- **Formulário de contato:** ainda não envia os dados para lugar nenhum — só valida e
  mostra a mensagem de sucesso. O ponto de integração está marcado em `assets/js/main.js`
  (pode ser uma view do Django, Firebase ou um serviço de formulários).
- **Planos:** nomes e módulos de cada plano são uma proposta; ajustar conforme o
  catálogo definido no app `plans`.
- **Imagens reais:** trocar a ilustração do hero por capturas de tela do sistema quando
  houver telas prontas.
