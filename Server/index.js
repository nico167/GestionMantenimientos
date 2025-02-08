import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

/*app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});*/

app.listen(5000, () => console.log('Servidor corriendo en el puerto 5000'));