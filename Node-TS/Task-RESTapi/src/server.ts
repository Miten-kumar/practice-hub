import express from 'express';
import Logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import taskRoutes from './routes/task.route';
import env from './env';
 
const app= express();
app.use(express.json());
 
app.use(Logger);
 
app.use('/tasks', taskRoutes);
 
app.listen(env.PORT, () => {
  console.log(` Server is running on http://localhost:${env.PORT}`);
});
 
app.use(errorHandler);
 
export default app;
 