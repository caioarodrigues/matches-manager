import { PlayerType } from "./Player.type";

export type MatchType = {
    id: number;
    players: PlayerType[];
    admin: PlayerType;
}