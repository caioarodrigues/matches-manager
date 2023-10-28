import { MatchType } from "../types/Match.type";
import { PlayerType } from "../types/Player.type";

export default interface IMatch {
    getAllPlayers(): PlayerType[];
    getPlayersCount(): number;
    getStatus(): MatchType;    
    getAdmin(): PlayerType;
    addPlayer(player: PlayerType): PlayerType;
    getID(): number;
}