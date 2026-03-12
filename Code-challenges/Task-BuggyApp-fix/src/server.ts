import express from 'express';
import type { Request,Response } from 'express';
import { Worker } from 'worker_threads';
 
const app= express();
app.use(express.json());
 
const PORT = 3000
 
//fix event loop blocking
app.get('/', (req:Request, res:Response) => {
  const worker = new Worker('./worker.js');
 
  worker.on('message', (result) => {
    res.send(`Calculation done: ${result}`);
  });
 
  worker.on('error', (err:any) => {
    res.status(500).send(err.message);
  });
});
 
 
//fix memeory leak
function logData(data: string[]) {
  console.log(data[0]);
}
const largeObject = new Array(1000000).fill('data');
logData(largeObject);
 
 
//fix race condition
let balance = 100;
 
const queue: (() => Promise<void>)[] = [];
let processing = false;
 
function processQueue() {
  if (processing || queue.length === 0) return;
 
  processing = true;
  const job = queue.shift();
 
  job?.().finally(() => {
    processing = false;
    processQueue();
  });
}
 
function withdraw(amount: number) {
  return new Promise<void>((resolve) => {
    queue.push(async () => {
      if (balance >= amount) {
        console.log(`Trying to withdraw ${amount}...`);
        await new Promise(r => setTimeout(r, 50));
        balance -= amount;
        console.log("Balance:", balance);
      } else {
        console.log("withdraw failed !!! Insufficient funds");
      }
      resolve();
    });
 
    processQueue();
  });
}
 
withdraw(80);
withdraw(80);
 
 
 
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
 
export default app;
 