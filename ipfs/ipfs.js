const ipfsClient = require('ipfs-http-client')
const ipfsConfig = require('./config/ipfs.config');

const host = ipfsConfig.HOST;
const port = ipfsConfig.PORT;
const protocol = ipfsConfig.PROTOCOL;

const ipfs = ipfsClient({
	host,
	port,
	protocol
})

console.log(`IPFS running on ${protocol}://${host}:${port}`)

module.exports = ipfs