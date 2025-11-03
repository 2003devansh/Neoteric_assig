import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.routes";
import enquiryRoute from "./routes/enquiry.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/", (req, res) => {
//   res.send("App is running");
// });

app.use("/auth", authRoute);
app.use("/enquiry", enquiryRoute);

export default app;
