import { MatchType } from "../types/Match.type";
import { PlayerType } from "../types/Player.type";

export default interface IPlayer {
    joinMatch (id: number): MatchType;
    quitMatch (id: number): MatchType;
    getPlayerStatus (): PlayerType[];
} 