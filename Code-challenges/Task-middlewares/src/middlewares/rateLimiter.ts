import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../../src/redisClient';

const store = new RedisStore({
  sendCommand: async (...args: string[]) => {
  
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    return redisClient.sendCommand(args);
  },
});

export const apiLimiter = rateLimit({
  store: store, 
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, 
  legacyHeaders: false, 
});


