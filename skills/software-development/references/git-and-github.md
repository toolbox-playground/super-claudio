# Git & GitHub

## Git Essentials

### Daily workflow
```bash
git status
git diff                          # unstaged changes
git diff --staged                 # staged changes
git add src/specific-file.py      # stage specific file (never git add -A blindly)
git commit -m "feat: add user auth endpoint"
git push origin feature-branch
```

### Branching
```bash
git checkout -b feature/my-feature    # create + switch
git checkout main && git pull         # sync main
git merge feature/my-feature          # merge into current branch
git rebase main                       # rebase onto main (cleaner history)
git branch -d feature/my-feature      # delete after merge
```

### Undoing things
```bash
git restore file.py                   # discard unstaged changes
git reset HEAD file.py                # unstage a file
git revert <commit-sha>               # safe undo (creates new commit)
git log --oneline -10                 # recent commits
```

### Useful aliases
```bash
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.st "status -sb"
git config --global alias.unstage "restore --staged"
```

---

## GitHub CLI (`gh`)

Install: `brew install gh` / `winget install GitHub.cli`
Auth: `gh auth login`

### Pull Requests
```bash
gh pr create --title "feat: add auth" --body "Adds JWT authentication"
gh pr create --draft                        # draft PR
gh pr list                                  # list open PRs
gh pr view 42                               # view PR #42
gh pr checkout 42                           # checkout PR branch locally
gh pr merge 42 --squash                     # merge with squash
gh pr review 42 --approve
gh pr review 42 --request-changes --body "Please fix the auth bug"
```

### Issues
```bash
gh issue create --title "Bug: login fails" --body "Steps to reproduce..."
gh issue list --label bug
gh issue close 15
gh issue comment 15 --body "Fixed in PR #42"
```

### Repos
```bash
gh repo create my-project --public --clone
gh repo clone owner/repo
gh repo fork owner/repo --clone
gh repo view --web                          # open in browser
```

### Actions / CI
```bash
gh run list                                 # list recent workflow runs
gh run view 12345                           # view run details
gh run watch                                # watch current run live
gh workflow list
gh workflow run deploy.yml --ref main
```

### Releases
```bash
gh release create v1.0.0 --title "v1.0.0" --notes "First release"
gh release create v1.0.0 dist/*.zip        # attach binaries
gh release list
```

### Gists
```bash
gh gist create script.py --public --desc "Useful script"
gh gist list
```

---

## GitHub MCP Server

Connect Claude directly to GitHub — read issues, create PRs, search code, without leaving the conversation.

### Install
```bash
claude mcp add github npx -- -y @modelcontextprotocol/server-github
```

Set your token:
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_...
```

### What Claude can do via MCP
- Search issues: "find all open bugs in my repo"
- Create PRs: "open a PR from this branch with a summary"
- Read file contents: "show me the current state of src/auth.py in main"
- List recent commits: "what changed in the last 5 commits?"
- Comment on issues/PRs: "add a comment to issue #42"

### Scopes needed for your token
- `repo` — full repo access
- `read:org` — if working in an org
- Create token at: github.com/settings/tokens

---

## Commit Message Convention

Standard format (Conventional Commits):
```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

Types:
| Type | When to use |
|------|------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change that isn't a fix or feature |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, config |
| `perf` | Performance improvement |

Examples:
```
feat(auth): add JWT token refresh endpoint
fix(api): handle null user in profile route
docs(readme): update installation instructions
chore(deps): bump fastapi from 0.104 to 0.111
```

---

## GitHub Actions — Common Workflows

### Run tests on every PR
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -r requirements.txt
      - run: pytest tests/ --cov=src
```

### Deploy on push to main
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Auto-label PRs
```yaml
name: Label PRs
on: [pull_request]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v5
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

---

## Docs
- GitHub CLI manual: cli.github.com/manual
- GitHub Actions docs: docs.github.com/en/actions
- GitHub MCP server: github.com/modelcontextprotocol/servers/tree/main/src/github
- Conventional Commits: conventionalcommits.org
