import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    telefono: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    foto: { type: String, required: true },
    rol: { type: String, enum: ["operario", "supervisor", "administrador"],default: "operario" ,required: true },
}, { timestamps: true });

export default mongoose.model('Usuario', UsuarioSchema);