import { error } from 'node:console';
import winston from 'winston';
import DailyRotateFile from "winston-daily-rotate-file"

export const logger  = winston.createLogger({
  level :'info',
  format:winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({stack:true}),
    winston.format.json()
  ),
  defaultMeta:{
    service:'task-service'
  },

  transports:[
    new winston.transports.Console(),

    // new winston.transports.File({
    //   filename:"src/logs/app.log"
    // })

    new DailyRotateFile({
      filename:"src/logs/app-%DATE%.log",
      datePattern:"DD-MM-YYYY",
      maxFiles:"10d",
      maxSize:"10m"
    }),

    new DailyRotateFile({
      level:"error",
      filename:"src/logs/app-errors-%DATE%.log",
      datePattern:"DD-MM-YYYY",
      maxFiles:"10d",
      maxSize:"10m"
    })
  ]
})