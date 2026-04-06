export type RumMetric = {
  name: string;
  value: number;
  id: string;
  url: string;
  userAgent: string;
  createdAt: string;
};

const rumMetrics: RumMetric[] = [];

export class RumRepository {
  save(metric: RumMetric) {
    rumMetrics.push(metric);
    return metric;
  }

  list() {
    return [...rumMetrics];
  }
}
