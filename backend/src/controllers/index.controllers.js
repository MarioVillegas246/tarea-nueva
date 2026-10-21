export const index=(req, res) =>{
    res.json({message:"benvenido a la api de tareas"});
};

export const ping=(req, res)=>{
    res.json({message:"pong"});
};

