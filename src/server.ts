import { config } from "dotenv";
import { app } from "./app";
import { connectDB } from "database/connect";

const PORT = process.env.PORT || 5000;
config();

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

startServer();
