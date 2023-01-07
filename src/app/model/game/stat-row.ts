import { Player } from "../player";

export interface StatRow {
    player: Player,
    scores: number,
    diffs: number,
    wins: number,
    games: number,
}
