import express, {Application, Request, Response} from "express" ;
import dishRoutes from "./routes/dishes";
import {env} from "./config/env";

const PORT = env.port

const app: Application = express();

app.use(express.json());
app.use('/api/v1/dishes', dishRoutes);

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Kaelum" 
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });
