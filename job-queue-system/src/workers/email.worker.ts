import { emailQueue } from "../queues/email.queue";
import { addToDLQ } from "../queues/dlq.queue";

emailQueue.process(3,async (job) => {
  try {
    const { to, subject, body } = job.data;

    job.progress(25);

    console.log("Sending email to:", to);
    job.progress(50);

    // simulate async work
    await new Promise((res) => setTimeout(res, 2000));
    job.progress(75);

    console.log("Email sent:", subject);
    job.progress(100);

    return true;
  } catch (err) {
     if (job.attemptsMade >= 2) {
      await addToDLQ("email", job.data, err);
    }
    throw err;
  }
});
