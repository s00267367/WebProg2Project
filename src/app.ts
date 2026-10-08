import express, {Application, Request, Response} from "express" ;
import dishRoutes from "./routes/dishes";

const PORT = process.env.PORT || 3000;

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
