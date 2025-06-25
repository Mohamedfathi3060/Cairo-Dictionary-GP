const { Client } = require('@elastic/elasticsearch');
let client;
try {
  client = new Client({
    node: process.env.ELASTIC_URL,
    auth: {
      apiKey: process.env.ELASTIC_API_KEY,
    },
  });
} catch (e) {
  console.log(e);
}

module.exports = client;
