
import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: '127.0.0.1', 
    port: 6379, 
  }
});

redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.error('Redis Connection Error:', err));

(async () => {
  await redisClient.connect();
})();
export default redisClient;
