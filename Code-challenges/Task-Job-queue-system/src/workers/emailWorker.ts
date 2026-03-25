import {Worker} from "bullmq"
import {connection} from "../connection" 

const emailworker = new Worker(
  'email',
  async (job) =>{
    console.log(`processing job ${job.name}`)

    const {userId,email,template} = job.data

    try{
      await job.updateProgress(10)

      await new Promise((res) => setTimeout(res, 1000));
      await job.updateProgress(50)

      if (Math.random() < 0.3) {
        throw new Error("email failure");
      }

      await new Promise((res) => setTimeout(res, 1000));
      await job.updateProgress(100);

      console.log(`Email sent to ${email}`);

    } catch (error) {
      console.error(`Error in job ${job.id}:`, error);
      throw error; 
    }
  },
  {
    connection,
    concurrency :5
  }
)