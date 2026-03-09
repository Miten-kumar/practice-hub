module.exports = {
  apps: [
    {
      name: "node-cluster-app",
      script: "src/server.ts",
      interpreter: "ts-node",
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: 3000
      },
      autorestart: true,
      watch: true,
      max_memory_restart: "300M"
    }
  ]
};