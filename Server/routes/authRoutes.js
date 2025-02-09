import express from 'express';
import { registro, inicioSesion } from '../controllers/authController.js';

const router = express.Router();

router.post('/registro', registro);
router.post('/inicio-sesion', inicioSesion);

export default router;