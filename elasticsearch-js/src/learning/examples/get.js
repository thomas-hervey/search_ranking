// NOTE: Docs https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/get_examples.html

'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  await client.index({
    index: 'game-of-thrones',
    id: '1',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  const document = await client.get({
    index: 'game-of-thrones',
    id: '1'
  })

  console.log(document)
}

run().catch(console.log)
