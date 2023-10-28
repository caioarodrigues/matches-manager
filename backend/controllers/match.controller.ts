import { Request, Response } from "express";
import MatchFactory from "../classes/MatchFactory";

export async function newMatch (req: Request, res: Response) {
    const { name } = req.body;
    const id = 0;
    const score = 0;
    const match = MatchFactory.newMatch({ id, name, score });

    return res.json(match)
}

export async function listMatches (req: Request, res: Response) {
    const matches = MatchFactory.getAllMatches();

    return res.json(matches);
}

export async function joinMatch (req: Request, res: Response) {
    const { name, id } = req.body;

    try {
        const player = MatchFactory.joinMatch(name, id);

        return res.json(player);
    }
    catch (err) {
        return res.status(500);
    }
}

export default { newMatch, listMatches, joinMatch }