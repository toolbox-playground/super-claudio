# Super Cláudio

<div align="center">

**Um plugin curado do Claude Code com skills para tudo que o Claude pode fazer.**

*Chega de cursos pagos. Chega de vídeos espalhados. Tudo em um lugar, de graça.*

[![Instalar](https://img.shields.io/badge/Instalar-Plugin_Claude_Code-6B46C1?style=for-the-badge&logo=claude&logoColor=white)](https://github.com/toolbox-playground/super-claudio)
[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-8_categorias-blue?style=for-the-badge)](#skills)

[🇺🇸 Read in English](README.md)

---

> *Se Claude tivesse nascido no Brasil, chamaria Cláudio.*

</div>

---

## Instalação

Dois comandos. Funciona imediatamente depois.

```bash
claude plugin marketplace add github.com/toolbox-playground/super-claudio
claude plugin install super-claudio
```

> **Requisito:** Claude Code CLI instalado. Baixe em [claude.ai/code](https://claude.ai/code).

---

## Como funciona

É só falar com o Claude normalmente. A skill certa ativa automaticamente.

```
"Cria um vídeo para o TikTok do meu produto"   → media-content-creation
"Monta uma API REST com autenticação"           → software-development
"Escreve uma legenda pro Instagram"             → writing
"Faz um pitch deck para investidores"           → productivity
"Cria uma skill do Claude Code para X"          → ai-and-agents
```

Não precisa de slash commands (mas também funcionam: `/super-claudio:writing`).

---

## Skills

| Categoria | O que cobre | Exemplos de ativação |
|-----------|-------------|---------------------|
| [media-content-creation](#media-content-creation) | Vídeo, áudio, geração de imagens | "faz um vídeo", "texto para áudio", "gera uma imagem" |
| [software-development](#software-development) | APIs, bancos de dados, automação, deploy, APIs gratuitas | "cria uma API", "automatiza com n8n", "API de clima grátis" |
| [marketing](#marketing) | Criativos de anúncios, TikTok/Instagram Shop, e-commerce | "cria um anúncio no TikTok", "conteúdo pro Instagram Shop" |
| [writing](#writing) | Blog, SEO, legendas, copywriting, newsletters | "escreve um post", "hook pro TikTok", "newsletter por email" |
| [design](#design) | Inspiração UI/UX, Figma, v0.dev, prototipagem | "design de site", "inspiração de UI", "wireframe" |
| [productivity](#productivity) | Documentos, apresentações, dashboards, planejamento | "cria um pitch deck", "plano de projeto", "monta um dashboard" |
| [ai-and-agents](#ai-and-agents) | API do Claude, engenharia de prompt, servidores MCP, criação de skills | "usa a API do Claude", "cria um servidor MCP", "cria uma skill" |
| [discover](#discover) | Encontra skills que não estão neste plugin | "acha uma skill para X" |

---

## Arquitetura

Cada skill usa um **padrão de roteamento em três níveis** que mantém o contexto do Claude leve:

```
Prompt do usuário
    │
    ▼
Descrição da skill   ← sempre carregada (~100 palavras), identifica a categoria
    │
    ▼
Corpo do SKILL.md    ← carregado quando ativado, roteia para a sub-skill certa
    │
    ▼
Arquivo de referência ← carregado sob demanda, contém ferramentas + fluxos + código
```

Uma descrição → um corpo → uma referência. Nunca carrega tudo de uma vez.

---

## Contribuindo

O cenário de ferramentas de IA muda toda semana. Se você encontrar uma ferramenta melhor,
um fluxo atualizado ou uma categoria faltando:

1. Faça um fork do repositório
2. Atualize o arquivo relevante em `skills/<categoria>/references/*.md`
3. Abra um PR — título: `feat(<categoria>): <o que mudou e por quê>`

---

## Licença

MIT — livre para usar, fazer fork e remixar.

---

<div align="center">

*O Super Cláudio existe para que o conhecimento espalhado em cursos pagos e vídeos do Instagram*
*seja gratuito, organizado e sempre atualizado.*

</div>
