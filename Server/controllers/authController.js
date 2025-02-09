import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Registro de usuario
export const registro = async (req, res) => {
    const { nombre, apellido, fechaNacimiento, telefono, correo, contraseña, foto, rol } = req.body;
    try {
        // Verificar si el correo ya existe
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);
        // Crear usuario
        const nuevoUsuario = new Usuario({ nombre, apellido, fechaNacimiento, telefono, correo, contraseña: contraseñaEncriptada, foto, rol });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.mensaje });
    }
};

// Inicio de sesión
export const inicioSesion = async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });

        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, rol: usuario.rol });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err.mensaje });
    }
};
