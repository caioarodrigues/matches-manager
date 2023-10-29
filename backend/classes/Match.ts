import IMatch from "../interfaces/IMatch";
import { MatchType } from "../types/Match.type";
import { PlayerType } from "../types/Player.type";

export default class Match implements IMatch{
    private _params: MatchType;

    constructor(admin: PlayerType, id: number){
        this._params = { id, admin, players: [] };
    }

    public getAllPlayers(): PlayerType[] {
        const { players, admin } = this._params;
        const allPlayers = [...players, admin];

        return allPlayers;
    }
    public getPlayersCount(): number {
        return this._params.players.length;
    }
    public getStatus(): MatchType {
        const match = this._params;

        return match;
    }
    public addPlayer(player: PlayerType): PlayerType {
        this._params.players.push(player);

        return player;
    }
    public removePlayer(playerID: number) {
        const index = this._params.players.findIndex(({ id }) => id === playerID);

        this._params.players.splice(index, 1);
    }
    public getID (): number {
        return this._params.id;
    }
    public getAdmin(): PlayerType {
        return this._params.admin;
    }
}