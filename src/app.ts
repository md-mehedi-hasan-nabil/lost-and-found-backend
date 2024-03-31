import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan"
import route from "./routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFoundHandler } from "./app/middlewares/notFoundHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use("/api", route);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;