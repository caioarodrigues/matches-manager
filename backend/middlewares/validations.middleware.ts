import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import MatchFactory from "../classes/MatchFactory";

const SALT = process.env.SALT || "SALT";

async function generateToken (req: Request, res: Response, next: NextFunction) {
    const { name, id: idMatch } = req.body;
    const token = jwt.sign({ name, idMatch }, SALT, {
        expiresIn: "1h"
    });

    req.signedCookies = token;

    next();
}

async function decodeToken (req: Request, res: Response, next: NextFunction) {
    const { signedCookies: token} = req;
    const user = jwt.verify(token, SALT);

    console.log(user);
    req.cookies = user;
    next();
}

async function existingMatch (req: Request, res: Response, next: NextFunction) {
    const { id: idMatch } = req.body;

    if (MatchFactory.existingMatch(idMatch)) {
        return next();
    }

    return res.status(500).json({
        msg: "esta partida não existe!"
    });
}

export default { generateToken, existingMatch, decodeToken }