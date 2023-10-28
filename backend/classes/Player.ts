import IPlayer from "../interfaces/IPlayer";
import { MatchType } from "../types/Match.type";
import { PlayerType } from "../types/Player.type";

export default class Player implements IPlayer {
    private _params: PlayerType;

    constructor(id: number, name: string) {
        const score = 0;

        this._params = { id, name, score };
    }
    public joinMatch(id: number): MatchType {
        throw new Error("Method not implemented.");
    }
    public quitMatch(id: number): MatchType {
        throw new Error("Method not implemented.");
    }
    public getPlayerStatus(): PlayerType[] {
        throw new Error("Method not implemented.");
    }
}