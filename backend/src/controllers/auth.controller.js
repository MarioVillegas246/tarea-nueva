import bcrypt from "bcryptjs";
import {pool} from "../db.js";
import {crearToken} from "../libs/jwt.js";

export const register =async(req,res)=>{
    const {username,email,password}= req.body ?? {};

if(!username || !email || !password){
    return res
    .status(400)
    .json({message: "username, email, password son obligatorios"});
}

if(password.length <  6){
    return res
    .status(400)
    .json({message :"la contraseña tiene que tener al menos 6 caracteres "});
}

try {
    const existing=await pool.query("SELECT id FROM users Where email=$1",[email,]);

    if(existing.rows.length > 0 ){
        return res.status(400).json({message:"el correo ya esta registrado"});
    }

    const passwordHash =await bcrypt.hash(password,10);
    const result=await pool.query("INSERT INTO users(username, email,password) VALUES ($1, $2, $3) RETURNING id, username,email,created_at",
        [username, email, passwordHash]
    );
    return res.status(201).json(result.rows[0]);
    
} catch (error) {
    console.error(error);
    return res.status(500).json({message:"error al resgistrar el usuario"});
}

};

export const login =async (req,res)=>{
    const {email, password} = req.body ?? {};
    if(!email || !password){
        return res
        .status(400)
        .json({message:"email. password son obligatorios"});
    }

    try {
       const result =await pool.query (
        "SELECT id, username, email, password FROM users WHERE email=$1",
        [email]
       );

       const user = result.rows[0];
       if(!user){
        return res.status(401).json({message:"credenciales invalidos"});
       }

       const coincide =await bcrypt.compare(password, user.password);

       if(!coincide){
        return res.status(401).json({message:"creendenciales invalidas"});
       }

       const token = crearToken ({id: user.id});
       return res.json({
        user: {id:user.id, username: user.username, email: user.email},
        token,
       });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"error al iniciar sesion"});
    }
}


export const profile = async(req, res )=>{
try {
    const result = await pool.query(
    "SELECT id, username, email, created_at FROM users WHERE id=$1",
    [req.user.id]
    );
    if(result.rows.length===0){
        return res.status(401).json({message:"usuario no encontrado"});
    }
    return res.json(result.rows[0]);
} catch (error) {
    console.error(error);
    return res.status(500).json({message:"error al obtener el perfil"});
}
}