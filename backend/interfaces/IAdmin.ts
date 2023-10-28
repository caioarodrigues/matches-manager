import { Score } from "../enum/score.enum";
import { MatchType } from "../types/Match.type";
import { PlayerType } from "../types/Player.type";

export default interface IAdmin extends PlayerType {
    removePlayer(id: number): Promise <PlayerType>;
    endMatch(): Promise <MatchType>;
    editScore(player: PlayerType, scoreAction: Score): Promise <PlayerType>;
}