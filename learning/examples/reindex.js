// NOTE: Docs https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/reindex_examples.html
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
      quote: 'Winter is coming.',
      house: 'stark'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Arya Stark',
      quote: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
      house: 'stark'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    refresh: true,
    document: {
      character: 'Tyrion Lannister',
      quote: 'A Lannister always pays his debts.',
      house: 'lannister'
    }
  })

  await client.reindex({
    wait_for_completion: true,
    refresh: true,
    source: {
      index: 'game-of-thrones',
      query: {
        match: { character: 'stark' }
      }
    },
    dest: {
      index: 'stark-index'
     },
    script: {
      lang: 'painless',
      source: 'ctx._source.remove("house")'
    }
  })

  const result = await client.search({
    index: 'stark-index',
    query: { match_all: {} }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)
