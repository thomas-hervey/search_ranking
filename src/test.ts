import fs from 'fs'
import { Client } from '@elastic/elasticsearch'


const config = {
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'example'
  },
  tls: {
    ca: fs.readFileSync('./certs/es01/es01.crt'),
    rejectUnauthorized: false
  }
}

const client = new Client(config)


async function runQuickstart () {
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
    document: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const result= await client.search({
    index: 'game-of-thrones',
    query: {
      match: { quote: 'winter' }
    }
  })

  console.log(result.hits.hits)

  // delete index once we're done
  // client.indices.delete({ index: 'game-of-thrones' })
}


runQuickstart().catch(console.log)
