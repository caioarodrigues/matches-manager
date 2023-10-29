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
    const { cookies: player } = req;
    const { name, id: playerID } = player;
    const { matchID } = req.body;

    try {
        MatchFactory.quitMatch(playerID, matchID);

        return res.status(200).json({ player, matchID });
    }
    catch (err){
        return res.status(500);
    }
}

async function dropMatch (req: Request, res: Response) {
    const { id } = req.body;

    try {
        const match = MatchFactory.dropMatch(id);
    
        return match;
    }
    catch (err) {
        return res.status(500);
    }
}

export default { newMatch, listMatches, joinMatch, quitMatch, dropMatch }