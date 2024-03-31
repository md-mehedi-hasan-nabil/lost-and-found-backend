import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan"
import route from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use("/api", route);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

export default app;