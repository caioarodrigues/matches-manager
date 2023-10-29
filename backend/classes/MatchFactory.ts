import { MatchType } from "../types/Match.type";
import { PlayerType } from "../types/Player.type";
import Match from "./Match";

export default class MatchFactory {
    private static readonly _matches: Match[] = [];

    public static newMatch (admin: PlayerType) {
        const id = this._matches.length;
        const match = new Match(admin, id);
        
        this._matches.push(match);

        return { admin, id };
    }
    public static existingMatch (id: number) {
        return this._matches.length > id;
    }
    public static joinMatch (name: string, id: number) {
        for(let match of this._matches) {
            const index = match.getID();
    
            if (index === id) {
                const playerIndex = match.getPlayersCount();
                const player: PlayerType = { id: playerIndex, name, score: 0 };
                this._matches[index].addPlayer(player);
            
                return player
            }
        }
    }
    public static quitMatch (playerID: number, idMatch: number) {
        for (let match of this._matches) {
            const id = match.getID();

            if (id === idMatch) {
                match.removePlayer(playerID);

                return;
            }
        }
    }
    public static isAdmin (admin:  PlayerType, idMatch: number) {
        const index = this._matches.findIndex(m => {
            const id = m.getID();

            if (id === idMatch) {
                return m.getAdmin();
            }
        });

        return index !== 1; 
    }

    public static getAllMatches () {
        const matches = this._matches.map((match) => {
            const { admin, id, players } = match.getStatus();

            return { id, admin, players };
        });
        
        return matches;
    }
    public static dropMatch(matchID: number) {
        const match = this._matches.splice(matchID, 1);

        return match;
    }
}