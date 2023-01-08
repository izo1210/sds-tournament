import { Game } from "../game";
import { Player } from "../player";

export class PlayerStatistics {
    gameTotal: number=0;
    winTotal: number=0;
    scoreTotal: number=0;
    diffTotal: number=0;

    constructor(public player: Player)
    {
    }

    update(game: Game): void
    {
        this.gameTotal++;
        const myScore=(this.player.id===game.leftPlayer ? game.leftScore : game.rightScore);
        const opponentScore=(this.player.id===game.leftPlayer ? game.rightScore: game.leftScore);
        if(myScore>opponentScore) this.winTotal++;
        this.scoreTotal+=myScore;
        this.diffTotal+=myScore-opponentScore;
    }

    private round(n: number): number
    {
        return Math.round(n*10)/10;
    }

    get winPerGame(): number
    {
        if(this.gameTotal===0) return 0;
        return this.round(this.winTotal/this.gameTotal);
    }

    get scorePerGame(): number
    {
        if(this.gameTotal===0) return 0;
        return this.round(this.scoreTotal/this.gameTotal);
    }

    get diffPerGame(): number
    {
        if(this.gameTotal===0) return 0;
        return this.round(this.diffTotal/this.gameTotal);
    }

}
