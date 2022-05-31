// NOTE: docs https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/update_by_query_examples.html
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    refresh: true,
    document: {
      character: 'Arya Stark',
      quote: 'A girl is Arya Stark of Winterfell. And I\'m going home.'
    }
  })

  await client.updateByQuery({
    index: 'game-of-thrones',
    refresh: true,
    script: {
      lang: 'painless',
      source: 'ctx._source["house"] = "stark"'
    },
    query: {
      match: {
        character: 'stark'
      }
    }
  })

  const result = await client.search({
    index: 'game-of-thrones',
    query: { match_all: {} }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)
