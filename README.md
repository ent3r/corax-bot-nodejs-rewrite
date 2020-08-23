<!--markdownlint-disable first-line-heading ol-prefix -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ent3r/corax-bot-nodejs-rewrite">
    <img src="https://corax.team/static/img/corax_dark.gif" alt="Logo" width="200px">
  </a>

  <h3 align="center">Team Corax discord bot rewrite</h3>

  <p align="center">
    A complete rewrite of the bot used in Team Corax's discord server, this time in discord.js!
    <br />
    <a href="https://github.com/ent3r/corax-bot-nodejs-rewrite/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ent3r/corax-bot-nodejs-rewrite">View Demo</a>
    ·
    <a href="https://github.com/ent3r/corax-bot-nodejs-rewrite/issues">Report Bug</a>
    ·
    <a href="https://github.com/ent3r/corax-bot-nodejs-rewrite/issues">Request Feature</a>
  </p>
  <div align="center">
    <a href="https://corax.team">
      <img src="https://img.shields.io/badge/Team-Corax-purple">
    </a>
    <a href="https://github.com/ent3r/corax-bot-nodejs-rewrite/issues">
      <img src="https://img.shields.io/github/issues/ent3r/corax-bot-nodejs-rewrite.svg">
    </a>
    <a href="https://github.com/ent3r/corax-bot-nodejs-rewrite/pulls">
      <img src="https://img.shields.io/github/issues-pr-raw/ent3r/corax-bot-nodejs-rewrite.svg">
    </a>
  </div>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the project](#running-the-project)
    - [Using docker](#using-docker)
    - [Running directly](#running-directly)
- [Usage (TODO)](#usage-todo)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<!-- Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`ent3r`, `corax-bot-nodejs-rewrite` -->

### Built With

- [node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com)
- [discord.js](https://www.npmjs.com/package/discord.js)
- [mongoose](https://www.npmjs.com/package/mongoose)
<!-- - []() -->

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

As this project uses yarn, make sure you have yarn installed by running `yarn --version`. It should show a verson < 2.X.X.
This is because this project does not yet support yarn 2. If you don't have yarn installed, install it by running

```bash
npm i -g yarn@latest
```

### Installation

1. Clone the repo

```bash
git clone https://github.com/ent3r/corax-bot-nodejs-rewrite.git
```

2. Install NPM packages

```bash
yarn
```

### Running the project

The project can be ran by either using Docker, or by running the project directly.

#### Using docker

The [`docker-compose.yml`](./docker-compose.yml) file contains two services. The bot itself, and a MongoDB service. Please read through the comments in the [`docker-compose.yml`](docker-compose.yml) file, as it explains how to disable the MongoDB service in case you don't want to use it.

Starting the docker container:

```bash
docker compose up --build
```

You can remove --build if you don't want to rebuild the image, and just start it.

#### Running directly

Running the project directly is very simple.

```bash
yarn run dev
```

> **NOTE: This will not work using `yarn start` unless you manually add the required environment variables. Running the bot in production mode without docker is not the intended
> way to run the bot. Running directly is only supposed to be used for development and debugging.**

<!-- USAGE EXAMPLES -->

## Usage (TODO)

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- ROADMAP -->

## Roadmap

See the pinned [issues][issues-link] for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

You are requested to follow the contribution guidelines specified in [CONTRIBUTING.md](./CONTRIBUTING.md) while contributing to the project :smile:.

<!-- LICENSE -->

## License

Distributed under the GNU GPLv3 License. See [`LICENSE`](./LICENSE) for more information.

---

This readme file, along with the contributing and code of conduct files were originally made from [this][original-template] template made by CSIVitu.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[original-template]: https://github.com/csivitu/Template
[issues-link]: https://github.com/ent3r/corax-bot-notejs-rewrite/issues
