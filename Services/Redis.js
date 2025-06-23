const { createClient } = require('redis');

const client = createClient({
  username: 'default',
  password: 'Augw4KkwFI5HROXpSEfpxSe2gDevHB4J',
  socket: {
    host: 'redis-13832.crce202.eu-west-3-1.ec2.redns.redis-cloud.com',
    port: 13832,
  },
});

client.on('error', (err) => console.error('❌ Redis error:', err));

(async () => {
  await client.connect();
})();

module.exports = client;
