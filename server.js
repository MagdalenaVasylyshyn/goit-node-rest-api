import mongoose from 'mongoose';
import app from './app.js';
import 'dotenv/config';

const uri = process.env.DB_URI;

// run server
(async () => {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Database connection successful');

    app.listen(8000, () => {
      console.log(`Server is running. Use our API on port: 8000`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();