// import express from 'express'
// import cluster from 'cluster'
// import { availableParallelism } from 'os'
// import process from 'process'
// import type { Request, Response} from 'express'

// const availableCpus:number = availableParallelism();

// if(cluster.isPrimary){
//   console.log(`Primaray process ${process.pid} is running`)

//   for(let i=0;i<availableCpus;i++){
//     cluster.fork()
//   }

//   cluster.on('exit',(worker,code,signal) =>{
//     console.log(`worker process ${process.pid} id died..restarating`)
//     cluster.fork()
//   })
// }

// else{
//   const app = express()
//   app.use(express.json())
//   const PORT = 3000

//   app.get('/',(req:Request,res: Response)=> {
//     res.send('helllo')
//   })

//   app.listen(PORT,()=>{
//     console.log(`server is running on ${PORT}`)
//   })

// }

import express from 'express'
import type { Request,Response,NextFunction } from 'express';

const app = express();
app.use(express.json())

const PORT = process.env.port || 3000;

let isShuttingDown = false;

app.use((req:Request, res:Response, next:NextFunction) => {
  if (isShuttingDown) {
    return res.status(503).send("Server shutting down");
  }
  next();
});

app.get("/", (req:Request, res:Response) => {
  res.json({
    message: "Hello from Node.js",
    pid: process.pid
  });
});

app.get("/health", (req:Request, res:Response) => {
  res.status(200).json({
    status: "OK",
    pid: process.pid
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, PID: ${process.pid}`);
});


function shutdown() {
  console.log(`PID ${process.pid} shutting down...`);
  isShuttingDown = true;

  server.close(() => {
    console.log("Closed remaining connections");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

