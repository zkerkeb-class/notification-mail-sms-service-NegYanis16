const app = require('./app');

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`🚀 Service de notification par email démarré sur le port ${PORT}`);

}); 