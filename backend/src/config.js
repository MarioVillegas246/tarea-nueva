import {config} from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET=process.env.JWT_SECRET;
console.log("Host de la base de datos:", DATABASE_URL ? new URL(DATABASE_URL).host: "no definida");