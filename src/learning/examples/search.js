// NOTE: Docs https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/search_examples.html
// .search helper: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-helpers.html#search-helper

'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // here we are forcing an index refresh,
    // otherwise we will not get any result
    // in the consequent search
    refresh: true,
    document: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // Let's search!
  const result = await client.search({
    index: 'game-of-thrones',
    query: {
      match: {
        quote: 'winter'
      }
    }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)
