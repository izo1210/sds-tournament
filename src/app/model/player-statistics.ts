import { Game } from "./game";
import { Player } from "./player";

export class PlayerStatistics {
    gameTotal: number=0;
    winTotal: number=0;
    scoreTotal: number=0;
    diffTotal: number=0;

    constructor(public player: Player)
    {
    }

    updateAsWinner(game: Game): void
    {
        this.gameTotal++;
        this.winTotal++;
        this.scoreTotal+=game.winnerScore;
        this.diffTotal+=game.winnerScore-game.loserScore;
    }

    updateAsLoser(game: Game): void
    {
        this.gameTotal++;
        this.scoreTotal+=game.loserScore;
        this.diffTotal+=game.loserScore-game.winnerScore;
    }

    get winPerGame(): number
    {
        if(this.gameTotal===0) return 0;
        return this.winTotal/this.gameTotal;
    }

    get scorePerGame(): number
    {
        if(this.gameTotal===0) return 0;
        return this.scoreTotal/this.gameTotal;
    }

    get diffPerGame(): number
    {
        if(this.gameTotal===0) return 0;
        return this.diffTotal/this.gameTotal;
    }

}

export type PlayerStatisticsMap={[playerId: string]: PlayerStatistics};

