import express, {Application, Request, Response} from "express" ;
import dishRoutes from "./routes/dishes";
import {logURL} from './middleware/log.middleware';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './config/swagger';
import cors from 'Cors';

export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/dishes', logURL, dishRoutes);
app.use(logURL);
app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);


app.get("/ping", async (_req : Request, res: Response) => {
  res.json({
  message: "hello from Kaelum" 
  });
});


