import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
import chatRoute from "./routes/chat.js"; 
 
dotenv.config(); 
 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
 
app.use("/chat", chatRoute); 
 
app.listen(3000, () => { 
  console.log("🚀 Neura backend running on port 3000"); 
});