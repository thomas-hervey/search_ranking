'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  const bulkResponse = await client.bulk({
    refresh: true,
    operations: [
      // operation to perform
      { index: { _index: 'game-of-thrones' } },
      // the document to index
      {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    ]
  })

  if (bulkResponse.errors) {
    console.log(bulkResponse)
    process.exit(1)
  }

  // Let's search!
  const result = await client.search({
    index: 'game-of-thrones',
    query: {
      match: {
        quote: 'winter'
      }
    }
  }, {
    asStream: true
  })

  // stream async iteration, available in Node.js ≥ 10
  let payload = ''
  body.setEncoding('utf8')
  for await (const chunk of result) {
    payload += chunk
  }
  console.log(JSON.parse(payload))

  // classic stream callback style
  let payload = ''
  result.setEncoding('utf8')
  result.on('data', chunk => { payload += chunk })
  result.on('error', console.log)
  result.on('end', () => {
    console.log(JSON.parse(payload))
  })
}

run().catch(console.log)
