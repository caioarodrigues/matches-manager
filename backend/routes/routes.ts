import { Router } from "express";
import matchRouter from "./match.route";

const routes = Router();

routes.use(matchRouter);

export default routes;