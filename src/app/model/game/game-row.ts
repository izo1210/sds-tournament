import { Player } from "../player";

export interface GameRow {
    winnerPlayer: Player,
    winnerScore: number;
    winnerDisplayName: string;
    loserPlayer: Player,
    loserScore: number;
    loserDisplayName: string;
    timestamp: string;    
}
