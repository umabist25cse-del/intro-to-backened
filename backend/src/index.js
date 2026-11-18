import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({ path: "./backend/.env", quiet: true });

const startServer = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in backend/.env");
  }

  await connectDB();

  const port = Number(process.env.PORT || 4000);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error("Server failed to start:", error.message);
  process.exit(1);
});