# Modelo de regras da casa

> **Este arquivo é um modelo, não é aplicado.** A skill `revisor-pipeline` só aplica as regras que estiverem no repositório revisado, em `.github/regras-da-casa.md`. Copie este arquivo para lá e troque as regras pelas do seu time. Assim as regras ficam versionadas junto com o código e qualquer mudança passa por pull request.
>
> As regras abaixo são as da TBX Tech, como exemplo de formato.

# Regras da casa

Padrões que o time decidiu. Um modelo de IA não tem como adivinhar estas regras: é por isso que elas estão escritas aqui. **Toda violação é falha**, com a severidade indicada.

| # | Regra | Severidade se violada | Correção |
|---|---|---|---|
| C1 | Autenticação no Azure **só via OIDC** (federated credentials). Proibido `creds: ${{ secrets.AZURE_CREDENTIALS }}` ou qualquer client secret de longa duração. | Alta | Ver exemplo abaixo |
| C2 | Job que faz deploy em produção **sempre** com `environment:` (com revisores obrigatórios configurados) e `concurrency:` sem cancelamento em andamento. | Alta | `environment: producao` + `concurrency: { group: deploy-producao, cancel-in-progress: false }` |
| C3 | Todo job com `timeout-minutes`. | Média | `timeout-minutes: 15` (ajuste ao job) |
| C4 | Imagem publicada e implantada com tag do **SHA do commit** (`${{ github.sha }}`). Proibido `latest` em deploy. | Alta | Tag `:${{ github.sha }}` no build, push e deploy |
| C5 | Runner com versão fixa (`ubuntu-24.04`). Proibido `ubuntu-latest`. | Baixa | `runs-on: ubuntu-24.04` |

## Exemplo — login no Azure via OIDC (C1)

```yaml
permissions:
  id-token: write
  contents: read

steps:
  - uses: azure/login@a641126d1b8aa4d1fa005f4f92df94a3a4c4c906 # v3.1.0
    with:
      client-id: ${{ vars.AZURE_CLIENT_ID }}
      tenant-id: ${{ vars.AZURE_TENANT_ID }}
      subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}
```

## Por que essas regras

- **C1:** client secret vaza e vale por meses; token OIDC vale minutos e só para aquele repositório/branch/environment.
- **C2:** sem environment, qualquer push na `main` vai para produção sem um humano olhar; sem concurrency, dois deploys simultâneos competem pelo mesmo recurso.
- **C3:** job travado consome minutos e segura o runner por até 6 horas (limite padrão).
- **C4:** `latest` torna impossível saber o que está rodando e impossível fazer rollback para uma versão exata.
- **C5:** `ubuntu-latest` muda de versão sem aviso e quebra o pipeline num dia qualquer.
