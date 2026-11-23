# Landing Page — OtterSenses Manager

Página de apresentação do **OtterSenses Manager**, plataforma B2B de monitoramento
industrial de tanques com sensores ESP32.

Feita com a mesma base de front-end do sistema: **HTML + Bootstrap 5 + JavaScript puro**,
sem etapa de build.

## Estrutura

```
Landing-Page-OtterSenses/
├── index.html            # página completa (todas as seções)
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
