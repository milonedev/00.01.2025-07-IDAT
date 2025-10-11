import 'dotenv/config.js';
import express from 'express';
import router from './router/index.js';
import { sequelize } from './config/db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to the API' });
});

// Autoload routers
app.use('/api', router);


(async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const syncMode = process.env.DB_SYNC;

    if (syncMode && syncMode !== 'none') {
      console.log(`Synchronizing database with mode: ${syncMode}`);
      await sequelize.sync({ force: syncMode === 'force', alter: syncMode === 'alter' });
      console.log('Database synchronized successfully.');
    }

    app.listen(port, () => {
      console.log(`The server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
