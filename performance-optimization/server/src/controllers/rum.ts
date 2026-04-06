import type { Request, Response } from "express";
import { RumRepository, type RumMetric } from "../repositories/rum.repository";

const rumRepository = new RumRepository();

export const createRumMetric = (req: Request, res: Response) => {
  const { name, value, id, url, userAgent } = req.body as Partial<RumMetric>;
  console.log(req.body);

  if (!name || value === undefined || !id || !url || !userAgent) {
    res.status(400).json({ message: "Invalid RUM payload" });
    return;
  }

  const metric = rumRepository.save({
    name,
    value: Number(value),
    id,
    url,
    userAgent,
    createdAt: new Date().toISOString(),
  });

  res.status(201).json(metric);
};

export const getRumMetrics = (req: Request, res: Response) => {
  res.status(200).json(rumRepository.list());
};
