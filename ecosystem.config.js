export default {
  apps: [
    {
      name: 'my-app',
      script: 'nodemon',
      args: ['--es-module', 'index.js'],
      watch: true,
      env: {
        NODE_ENV: 'development',
      }
    }
  ]
}