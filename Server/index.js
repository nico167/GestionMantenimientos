import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);

// Middleware para verificar token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json("Acceso denegado");
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json("Token inválido");
      req.user = decoded;
      next();
    });
  };
  
// Ruta protegida
app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: `Bienvenido, ${req.user.rol}` });
});

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

/*app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});*/

app.listen(5000, () => console.log('Servidor corriendo en el puerto 5000'));