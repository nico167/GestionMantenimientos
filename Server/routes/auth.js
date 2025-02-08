import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Registro
router.post('/registro', async (req, res) => {
    const { nombre, apellido, fechaNacimiento, telefono, correo, contraseña, foto, rol } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedContraseña = await bcrypt.hash(contraseña, salt);
    try {
        const nuevoUsuario = new Usuario({ nombre, apellido, fechaNacimiento, telefono, correo, contraseña: hashedContraseña, foto, rol });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario creado con éxito' });
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });

        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, rol: usuario.rol });
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
});

export default router;