import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json("Acceso denegado");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json("Token inválido");
        req.user = decoded;
        next();
    });
};

export default verifyToken;