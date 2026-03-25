import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
import chatRoute from "./routes/chat.js"; 
 
dotenv.config(); 
 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
 
// 👇 ESTA LÍNEA ES CLAVE 
app.use("/api/chat", chatRoute); 
 
// 👇 AÑADE ESTO PARA PROBAR 
app.get("/", (req, res) => { 
  res.send("API funcionando 🚀"); 
}); 
 
const PORT = process.env.PORT || 3000; 
 
app.listen(PORT, () => { 
  console.log(`🚀 Neura backend running on port ${PORT}`); 
});