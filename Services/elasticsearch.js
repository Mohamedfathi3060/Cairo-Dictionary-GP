const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY, // base64 encoded or raw key depending on ES config
  },
});

module.exports = client;
