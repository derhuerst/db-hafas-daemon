# db-hafas-daemon

**Run a [daemon](https://en.wikipedia.org/wiki/Daemon_%28computing%29) that can query the [Deutsche Bahn HAFAS endpoint](https://github.com/public-transport/db-hafas).**

[![npm version](https://img.shields.io/npm/v/db-hafas-daemon.svg)](https://www.npmjs.com/package/db-hafas-daemon)
[![build status](https://img.shields.io/github/workflow/status/derhuerst/db-hafas-daemon/build/main)](https://github.com/derhuerst/db-hafas-daemon/actions)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/db-hafas-daemon.svg)
![minimum Node.js version](https://img.shields.io/node/v/db-hafas-daemon.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)

*Note:* This tool is intended to be a low-level tool that allows *locally running* programs to query as if they ran the `hafas-client` instance. **If you want to expose a HAFAS endpoint to remote or third-party clients as an API, use [`hafas-rest-api`](https://github.com/public-transport/hafas-rest-api) instead.**


## Installation

```shell
npm install db-hafas-daemon -g
```


## Usage

```
Usage:
    db-hafas-daemon
      [--socket]
      [--ws]
      [--no-cache]
      <user-agent>
Options:
    --socket           Listen on a local socket.
    --ws               Listen for WebSocket connections on port 8080.
    --no-cache         Don't cache data in Redis using cached-hafas-client.
Examples:
    db-hafas-daemon --ws 8080 --no-cache my-awesome-program
```


## Related

- [`hafas-rest-api`](https://github.com/public-transport/hafas-rest-api) – Expose a HAFAS client via an HTTP REST API.
- [`db-hafas`](https://github.com/public-transport/db-hafas) – JavaScript client for the Deutsche Bahn HAFAS API.


## Contributing

If you have a question or need support using `db-hafas-daemon`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, use [the issues page](https://github.com/derhuerst/db-hafas-daemon/issues).
