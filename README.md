# fleek-fse-challenge
Full Stack Engineer Assignment for Fleek.co

## Prerequisites:
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [IPFS](https://docs.ipfs.io/install/ipfs-desktop/)

## Setup
This repository contains 3 projects:
- `./app`
- `./api`
- `./ipfs`
You will need to open a terminal on each root and install dependencies with `npm install` command.

## Running
Every project has the same startup command: `npm run start`.

## Miscellaneous
- Projects summary
	- App -> Allows you to create, update and delete simple API keys. Also it displays any request made against the proxy and it status.
	- API -> Setups the mongodb database using mongoose. It's the backend for the app and also acts as proxy for the ipfs API. Any request with a disabled or deleted key will be rejected.
	- IPFS -> IPFS API to get access to local IPFS node.
- Project ports:
	- App -> 9000
	- API -> 3000
	- IPFS API -> 3001
	- IPFS Node -> 5000
- App credentials:
	- mail: `key-creator@fleek-challenge.com"`
	- password: `9r@QS!2u`

## Request example
Proxy request:
```
url: http://localhost:3000/proxy/upload
header: 'Authorization 19191796af7c4df4affc8737ed33c6a5'
body: {
    "path": "path here",
    "content": "content here"
}
```

# Written questions
Q: How would you improve this assignment for a production ready solution (e.g., security,
deployment)?

A: I would use typescript for code maintainability, unit and integration tests and a solid documentation. Also I would add a better error handling solution with an efficient logging (like splunk). For ci/cd I would use bamboo.

Q: Describe IPFS and compare it to other protocols e.g., HTTP?

A: Basically it is a distributed system for storing and accessing different kinds of contents and data.
A few key differences between IPFS and HTTP are:
- Server: In the case of HTTP it is a centralized server, while the IPFS protocol aims precisely to make the servers decentralized by using P2P networks.
- Data: There are also differences in how data is requested. IPFS requests this data through a cryptographic hash, while HTTP requests it using the address where the data is hosted.
- Bandwidth and usage: While in the HTTP protocol the bandwidth provided is low, in the case of IPFS it is high, since the data is requested from the closest peer that has the copy of that data.
- Support:  HTTP is included in virtually every computer. To run IPFS, however, we will need to access it via the HTTP to IPFS portal or manually configure an IPFS node on a computer. The latter means that there is also a big difference in the use of the two protocols. Virtually everyone uses HTTP, while IPFS has a very low market share at the moment.