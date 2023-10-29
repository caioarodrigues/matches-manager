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
    console.log('aqui')
    try {
        const token = req.header("Authorization")!;
        const user = jwt.verify(token, SALT);
    
        req.cookies = user;
        next();
    }
    catch (err) {
        return res.status(500);
    }
}

async function existingMatch (req: Request, res: Response, next: NextFunction) {
    const { id: idMatch } = req.body;

    if (MatchFactory.existingMatch(idMatch)) {
        return next();
    }

    return res.status(500).json({
        msg: "this match doesn't exist!"
    });
}

async function isAdmin (req: Request, res: Response, next: NextFunction) {
    const { id, name, score } = req.cookies;
    const { idMatch } = req.body;

    console.log(id, name, score)
    if (MatchFactory.isAdmin({ id, name, score }, idMatch)){
        return next();
    }

    return res.status(404)
        .json({ msg: "you can't do this because you're not an admin!" });
}

export default { generateToken, existingMatch, decodeToken, isAdmin }