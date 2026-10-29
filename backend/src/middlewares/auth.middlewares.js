import {verificarToken} from "../libs/jwt.js"

export const requireAuth =(req, res, next)=>{
    const header = req.headers.authorization;

    if(!header || !header.startsWith("Bearer")){
        return res.status(401).json({message:"token no proporcionado"});
    }

    const token=header.split(" ")[1];
    try {
        const payload =verificarToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({message:"token invalido o expirado"})
    }
}