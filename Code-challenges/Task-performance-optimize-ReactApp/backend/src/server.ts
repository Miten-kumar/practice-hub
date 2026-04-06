import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.text());

const metricsStore: any[] = [];

app.post('/analytics', (req, res) => {
  const metric = JSON.parse(req.body);

  metricsStore.push(metric);

  console.log('📊 Metric received:', metric);

  res.status(200).json({sucess :true});
});


// Basic aggregation (p75 example)
app.get('/metrics/p75', (req, res) => {
  const grouped: Record<string, number[]> = {};

  metricsStore.forEach((m) => {
    const name = m.name as string;
    const value = m.value as number;

    if (!grouped[name]) {
      grouped[name] = [];
    }

    grouped[name]!.push(value);
  });

  const result: Record<string, number> = {};

  for (const key in grouped) {
    const values = grouped[key];

    if (!values || values.length === 0) {
      continue;
    }

    values.sort((a, b) => a - b);
    const index = Math.floor(values.length * 0.75);

    result[key] = values[index] ?? values[values.length - 1]!;
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(` server running on http://localhost:${PORT}`);
});
