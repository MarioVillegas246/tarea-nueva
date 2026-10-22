import authRouters from "./routes/auth.routes.js";
import express from "express";
import morgan from "morgan";

import indexroutes from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//rutas
app.use(indexroutes);
app.use("/api/auth", authRouters);

//ruta no encontrada
app.use((req, res)=>{
    res.status(404).json({message:"not found"});
});

export default app;