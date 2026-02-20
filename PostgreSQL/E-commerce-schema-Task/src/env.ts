// import { z } from 'zod';

// const postgresCredentialsSchema = z.object({
//     PORT: z.coerce.number().int().positive().default(3000),
//     DB_HOST: z.string().min(1, "Host is required").default("localhost"),
//     DB_PORT: z.number().int().min(1).max(65535).default(5432),
//     DB_NAME: z.string().min(1, "Database name is required"),
//     DB_USER: z.string().min(1, "Username is required"),
//     DB_PASSWORD: z.string().min(1, "Password is required"),
// });
// console.log(process.env.DB_NAME) 
// const env = postgresCredentialsSchema.parse(process.env);


// export default env
