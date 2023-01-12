export class Game {
    static readonly empty=new Game();
    
    winnerPlayerId: string;
    winnerScore: number;
    loserPlayerId: string;
    loserScore: number;
    timestamp: string;

    constructor(source: any = {
        winnerPlayerId: "", 
        winnerScore: 0, 
        loserPlayerId: "", 
        loserScore: -1,
        timestamp: new Date().toISOString()},
    )
    {
        this.winnerPlayerId=source.winnerPlayerId;
        this.winnerScore=source.winnerScore;
        this.loserPlayerId=source.loserPlayerId;
        this.loserScore=source.loserScore;
        this.timestamp=source.timestamp;
    }

    valueOf()
    {
        return this.timestamp;
    }

}
