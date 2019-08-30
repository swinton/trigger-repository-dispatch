# `trigger-repository-dispatch` :rocket:

> Trigger a repository dispatch on a GitHub repository via the command-line.

## Usage

```shell
GITHUB_TOKEN=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN npx trigger-repository-dispatch \
  --nwo "octocat/spoon-knife" # 'nwo: Name (of the repository) with owner (required)'
  --event-type "my-event" # event-type: Type of event to trigger (optional, defaults to 'trigger-repository-dispatch')
```
