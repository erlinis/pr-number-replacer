# pr-number-replacer

> A GitHub App built with [Probot](https://github.com/probot/probot) to replace the PR number within the pull request description

# Usage

Add the placeholder `::pr_number::` inside the PR description when creating it. Example:

```md
 PR #::pr_number::

 Adds new registration flow. 
 [Test it here!](https://my-server@p::pr_number::.tlservers.com/) - PR# 7
```

Right after hitting the [Create Pull Request] button the bot will updated the PR description with the proper PR number.

```md
PR #123

 Adds new registration flow. 
 [Test it here!](https://my-server@p123.tlservers.com/) - PR# 7
```

## Setup

```sh
# Install dependencies
yarn install

# Run the bot
yarn start
```

```sh
# Run test
yarn test
```

## Contributing

If you have suggestions for how pr-number-replacer could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Erlinis Quintana <erlinis.quintana@gmail.com>
