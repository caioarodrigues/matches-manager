import { Router } from "express";
import matchController from "../controllers/match.controller";
import validationsMiddleware from "../middlewares/validations.middleware";

const matchRouter = Router();

matchRouter.get("/match/list", matchController.listMatches);
matchRouter.post("/match/new", validationsMiddleware.generateToken,
    matchController.newMatch);
matchRouter.post("/match/join", validationsMiddleware.existingMatch,
    validationsMiddleware.generateToken, matchController.joinMatch);
matchRouter.post("/match/quit", validationsMiddleware.existingMatch,
    validationsMiddleware.decodeToken, matchController.quitMatch);
matchRouter.delete("/match/drop", validationsMiddleware.decodeToken, 
    validationsMiddleware.existingMatch, validationsMiddleware.isAdmin, 
    matchController.dropMatch);

export default matchRouter;