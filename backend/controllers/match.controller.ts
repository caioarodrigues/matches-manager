import { Request, Response } from "express";
import MatchFactory from "../classes/MatchFactory";

export async function newMatch (req: Request, res: Response) {
    const { name } = req.body;
    const id = 0;
    const score = 0;
    const match = MatchFactory.newMatch({ id, name, score });
    const { signedCookies: token } = req;

    return res.json({ match, token })
}

export async function listMatches (req: Request, res: Response) {
    const matches = MatchFactory.getAllMatches();

    return res.json(matches);
}

export async function joinMatch (req: Request, res: Response) {
    const { name, id } = req.body;
    const { signedCookies: token } = req;
    
    try {
        const player = MatchFactory.joinMatch(name, id);

        return res.json({ player, token });
    }
    catch (err) {
        return res.status(500);
    }
}

async function quitMatch (req: Request, res: Response) {
    const { cookies: decodedToken } = req;
    const user = JSON.parse(decodedToken);

    
}

export default { newMatch, listMatches, joinMatch }