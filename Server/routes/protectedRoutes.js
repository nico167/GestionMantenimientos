import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    res.json({ message: `Bienvenido, ${req.user.rol}` });
});

export default router;
