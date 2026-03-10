import express from 'express';
import type { Request,Response } from 'express';
 
const app= express();
app.use(express.json());

const PORT = 3000


app.get('/',(req:Request,res:Response)=>{

   console.log('Starting heavy computation...');
    let result = 0;
    for (let i = 0; i < 1e10; i++) {
      result += i;
    }
    res.end(`Calculation done: ${result}`);
    //stuck
    console.log('Hello World');
})
  

function createLeak() {
  const largeObject = new Array(1000000).fill('leaky data'); 
 
  return function leakyFunction() {
    console.log(largeObject[0]); 
  };
}
const leakyClosure = createLeak(); 


let balance = 100;

async function withdraw(amount: number) {
    if (balance >= amount) {
        console.log(`Trying to withdraw ${amount}...`);
        await new Promise(resolve => setTimeout(resolve, 50)); 
        balance -= amount;
        console.log(`Balance: ${balance}`);
    } else {
        console.log(`Insufficient funds for ${amount}`);
    }
}

withdraw(80);
withdraw(80);



app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
 
export default app;