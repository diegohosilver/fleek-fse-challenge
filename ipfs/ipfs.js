const ipfsClient = require('ipfs-http-client')
const ipfsConfig = require('../config/ipfs.config');

const host = ipfsConfig.host;
const port = ipfsConfig.port;
const protocol = ipfsConfig.protocol;

const ipfs = ipfsClient({
	host,
	port,
	protocol
})

console.log(`IPFS running on ${protocol}://${host}:${port}`)

export default ipfs