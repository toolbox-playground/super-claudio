# Checklist de segurança — GitHub Actions

Aplique cada item a cada workflow. A severidade é o ponto de partida; ajuste pelo cenário concreto (gatilho, permissões, secrets acessíveis).

## 1. Gatilhos perigosos

- **`pull_request_target` ou `workflow_run` que fazem checkout do código do PR** (`ref: ${{ github.event.pull_request.head.sha }}`, `head.ref`, ou artefato baixado do run do PR) e depois **executam** esse código (`npm install`, `pip install`, `make`, `docker build`, scripts do repo). — **Crítica.** É o "pwn request": o código de um fork roda com token de escrita e acesso a secrets.
  - Correção: usar `pull_request` (sem secrets, token só leitura) para testar código do PR; deixar `pull_request_target` só para ações que não executam código do PR (comentar, rotular), sem checkout do head.
- `pull_request_target` sem checkout do head — ok, mas confira as permissões (item 3).

## 2. Injeção via expressão (`${{ }}`)

Dados controlados por quem abre o PR/issue **não podem** ser interpolados direto em `run:` nem em `script:` do `actions/github-script`. Os mais comuns:

`github.event.pull_request.title`, `.body`, `github.event.issue.title`, `.body`, `github.event.comment.body`, `github.event.review.body`, `github.head_ref`, `github.event.pull_request.head.ref`, `github.event.pull_request.head.label`, `github.event.commits.*.message`, `github.event.head_commit.message`, `github.event.head_commit.author.*`, outputs de steps que derivam desses valores (ex.: listas de arquivos alterados — nome de arquivo também é entrada do atacante).

- Em `run:` → injeção de shell. **Alta** (Crítica se o job tem token de escrita ou secrets).
- Em `script:` do github-script → injeção de JavaScript com o token do job. **Crítica** se o token tem escrita.
- `github.head_ref` é o caso que mais passa despercebido: o nome da branch é escolhido pelo atacante.
- Correção: passar por variável de ambiente e usar a variável entre aspas.

```yaml
- name: Resumo do PR
  env:
    TITULO: ${{ github.event.pull_request.title }}
    BRANCH: ${{ github.head_ref }}
  run: |
    echo "Testando o PR: $TITULO"
    echo "Branch de origem: $BRANCH"
```

No github-script, ler de `context.payload.pull_request.title` em vez de interpolar.

## 3. Permissões do `GITHUB_TOKEN`

- `permissions: write-all` — **Alta.**
- Workflow sem bloco `permissions` — **Média** (herda o padrão do repositório, que pode ser escrita).
- Correção: `permissions: {}` (ou `contents: read`) no topo e conceder por job só o necessário.

```yaml
permissions:
  contents: read

jobs:
  comentar:
    permissions:
      pull-requests: write
```

## 4. Actions de terceiros e fixação

- Action referenciada por tag ou branch (`@v4`, `@main`) — **Média**; **Alta** para actions de terceiros fora das organizações `actions/`, `github/` e do provedor de nuvem oficial. Tags são mutáveis: quem controla o repositório da action troca o código sem você perceber.
- Fixar no **SHA completo de 40 caracteres** com comentário da versão:

```yaml
- uses: actions/checkout@<SHA de 40 caracteres> # v4.2.2
```

- Nunca invente o SHA (ver SKILL.md).
- Se reconhecer uma action com histórico de comprometimento, diga qual incidente e recomende conferir o advisory oficial.

## 5. Secrets

- Secret passado na linha de comando (`docker login -p ${{ secrets.X }}`, `curl -u user:${{ secrets.X }}`) — **Média.** Fica visível na lista de processos do runner e em logs de debug. Correção: `--password-stdin` ou action oficial de login.
- Secret usado em job disparado por evento de fork — ver item 1.
- `echo` de secret, ou secret gravado em arquivo que vira artefato — **Alta.**

## 6. Credenciais persistidas

- `actions/checkout` sem `persist-credentials: false` em job que não precisa dar `git push` — **Baixa.** O token fica no `.git/config` do runner e pode vazar se o diretório virar artefato.

## 7. Runners self-hosted

- Runner self-hosted em repositório público, ou recebendo jobs de PR de fork — **Crítica.** Código do atacante roda na sua infraestrutura e persiste entre jobs se o runner não for efêmero.
