const ipfs = require('../ipfs');
const ipfsService = {};

ipfsService.addFile = async ({ path, content }) => {
    const file = { path: path, content: Buffer.from(content) }
    const addedFile = await ipfs.add(file)
    return addedFile
}

ipfsService.getHash = file => {
    const { cid } = file
    const hash = cid.toString()
    return hash
}

ipfsService.getGatewayUrl = hash => `https://gateway.ipfs.io/ipfs/${hash}`

ipfsService.upload = async (data) => {
    const addedFile = await ipfsService.addFile(data)
    const hash = ipfsService.getHash(addedFile)
    return ipfsService.getGatewayUrl(hash)
}

module.exports = ipfsService;