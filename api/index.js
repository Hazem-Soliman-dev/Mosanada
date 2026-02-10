const { createApp } = require('../dist/src/main');

let app;

module.exports = async (req, res) => {
  try {
    if (!app) {
      const nestApp = await createApp();
      await nestApp.init();
      app = nestApp.getHttpAdapter().getInstance();
    }
    app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
