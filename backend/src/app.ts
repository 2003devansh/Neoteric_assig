import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/leads.routes";
import taskRoutes from "./routes/task.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/leads", leadRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);

export default app;
