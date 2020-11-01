#!/usr/bin/env node
'use strict'

const mri = require('mri')
const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v',
		'socket',
		'ws',
		'no-cache',
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
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
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`db-hafas-daemon v${pkg.version}\n`)
	process.exit(0)
}

const createHafas = require('db-hafas')
const {createClient: createRedis} = require('redis')
const createRedisStore = require('cached-hafas-client/stores/redis')
const withCache = require('cached-hafas-client')
const exposeViaSocket = require('hafas-client-rpc/socket/server')
const SOCKET_PATH = require('hafas-client-rpc/socket/path')
const {createServer} = require('http')
const exposeViaWebSockets = require('hafas-client-rpc/ws/server')
const {promisify} = require('util')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

;(async () => {
	// db-hafas
	const userAgent = argv._[0]
	if (!userAgent) showError('Missing user-agent parameter.')
	const rawHafas = createHafas(userAgent)

	// caching
	let hafas = rawHafas
	if (!argv['no-cache']) {
		const redis = createRedis(process.env.REDIS_URL)
		const onErr = (err) => {
			console.error('Failed to PING the Redis server. Is Redis running & accessible?')
			showError(err)
		}
		redis.on('error', onErr)
		await promisify(redis.ping.bind(redis))()
		redis.removeListener('error', onErr)
		redis.on('error', console.error)
		hafas = withCache(rawHafas, createRedisStore(redis))
	}

	if (!argv.socket && !argv.ws) {
		showError('You must use one of the options --ws/--socket.')
	}
	if (argv.socket) {
		await promisify(exposeViaSocket)(hafas)
		console.info('listening on socket', SOCKET_PATH)
	}
	if (argv.ws) {
		const server = createServer()
		exposeViaWebSockets(server, hafas)

		await promisify(server.listen.bind(server))(8080)
		console.info('listening for WebSocket connections on port 8080')
	}
})().catch(showError)
