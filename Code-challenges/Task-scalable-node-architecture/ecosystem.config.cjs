module.exports = {
  apps: [
    {
      name: "my-app",
      script: "src/server.ts",
      interpreter: "./node_modules/.bin/ts-node",
      instances:"max",
      exec_mode: "cluster",
      watch: true
    },
  ],
};
