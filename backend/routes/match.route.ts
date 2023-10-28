import { Router } from "express";
import matchController from "../controllers/match.controller";

const matchRouter = Router();

matchRouter.get("/match/list", matchController.listMatches);
matchRouter.post("/match/new", matchController.newMatch);
matchRouter.post("/match/join", matchController.joinMatch);

export default matchRouter;